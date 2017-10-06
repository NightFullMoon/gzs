<template>
    <div>
        <ul class="tabs-nav">
            <li v-for="(title,index) in titles" class="tab" :class="{active:(activeIndex == index)}" :key="index" @click="activeIndex = index">{{title}}</li>
        </ul>
        <slot class="sss"></slot>
    </div>
</template>

<script>
// 面板的名字
const paneName = "i-tab-pane";

export default {
    name: "i-tabs",
    data: function() {
        return {
            titles: [],
            // panes: [],
            activeIndex: -1
        }
    },
    mounted: function() {
        console.log(this.$slots.default);
        // console.log(this.titles);
        // console.log(this.getTabs());
        this.titles = this.getTitles();

        var panes = this.getPanes();

        panes.forEach(function(pane, index) {
            console.log(index);
            pane.key = index;
        });
        this.activeIndex = 0;
        // this.panes = this.getPanes();
    },
    methods: {
        /* 
            因为$children 并不保证顺序，也不是响应式的(详见https://cn.vuejs.org/v2/api/#vm-children)
            所以只能用这种方式来进行更新
         */
        getTitles: function() {
            return this.getPanes()
                .map(function(pane) {
                    return pane.$options.propsData.title;
                });
        },

        getPanes: function() {
            return this.$children
                .filter(function(pane) {
                    // 目前是必须有标题才渲染
                    return pane.$options.name === paneName && pane.$options.propsData.title;
                });
        }
    },
    computed: {

    },
    watch: {
        activeIndex() {
            var panes = this.getPanes();
            // if (panes.length < this.activeIndex) {
            //     this.activeIndex = 0;
            //     // 这里直接return掉会在下一轮重新计算？
            //     return;
            // }
            const KEY = this.activeIndex;
            let isFindKey = false;
            panes.forEach(function(pane) {
                // console.log(KEY + "----" + pane.key);
                if (KEY === pane.key) {
                    isFindKey = true;
                    pane.show = true;
                } else {
                    pane.show = false;
                }
            });

            if (!isFindKey) {
                console.warn("没发现相应的key")
            }
        }
    }
}
</script>

<style lang="less">
@import (reference) "../common.less";

.tabs-nav {
    list-style: none;
    display: block; // overflow: hidden;
    border-bottom: 1px solid @regular-border-color;
    padding: 0px;
        background: white;
    // 闭合浮动用
    &:after {
        content: "";
        clear: both;
        display: block;
    }
    .tab {
        float: left;
        .regular-text();
        padding: 2px @regular-size/2;
        margin-bottom: -1px;
        cursor: pointer;

        &.active {
            color: @theme-color;
            border-bottom: 4px solid @theme-color;
        }
    }
}
</style>
