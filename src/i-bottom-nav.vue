<template>
    <div>
        <!-- <div class="bottom-nav-container"> -->
        <ul class="tabs-nav bottom-nav" :class="{show:show}">
            <li v-for="(title,index) in titles" class="tab" :class="{active:(activeIndex == index)}" :key="index" @click="activeIndex = index">
                <a href="###">{{title}}</a>
            </li>
        </ul>
        <!-- </div> -->
        <div class="tab-panes">
            <slot></slot>
        </div>

    </div>
</template>

<script>
import $ from 'jquery'
import _ from 'underscore'
import iTabs from './i-tabs/i-tabs.vue'
import iTabPane from './i-tabs/i-tab-pane.vue'

export default {
    name: "i-bottom-nav",
    mixins: [iTabs],
    components: { iTabPane },
    props: {
        //当滚动的时候，是否显示/隐藏导航栏
        hideWhenScroll: {
            type: Boolean,
            default: false
        },
        // TODO:点击active时，滚动到最顶部
/*         topActiveToTop: {
            type: Boolean,
            default: true
        } */
    },
    data: function() {
        return {
            show: true
        };
    },
    methods: {
        _initDisplayWhenScroll: function() {
            var that = this;
            //  如果需要使用监听滚动的话，那么便使用jquery来实现
            var lastScrollTop = 0;
            $(document).scroll(
                _.throttle(function(event) {
                    // console.log($.Version)
                    // console.log(event);
                    // console.log(event.originalEvent.detail )

                    var newScrollTop = $(document).scrollTop();

                    if (newScrollTop < lastScrollTop) {
                        // console.log("上");
                        that.show = true;
                    } else {
                        // console.log("下");
                        that.show = false;
                    }

                    lastScrollTop = $(document).scrollTop();
                }, 300
                )
            );
        }
    },
    mounted: function() {
        if (this.hideWhenScroll) {
            this._initDisplayWhenScroll();
        }
    
    }
}
</script>

<style lang="less">
@import (reference) "./common.less";

.tab-panes {
    padding-bottom: 48 + 8px;
}

.bottom-nav {
    width: 100%; // height: 100%
    /* 这个如果不写死48，任由内部撑起高度的话，会导致容器padding-bottom的数值无法计算
    可能导致内容被遮住的情况
    还有一个原因是，如果高度是固定的，那么便可使用line-height+    vertical-align: middle;的方式来解决文本上下居中的问题
    修改时注意以上两点
     */
    height: 48px;


    position: fixed;
    left: 0px;
    bottom: 0px;
    margin: 0px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, .2);
    display: flex;
    transform: translate(0%, 100%);
    transition: transform .3s;
    &.show {
        //   bottom: 0px;
        transform: translate(0%, 0%);
    } //  flex-direction: column;
    >li.tab {
        flex: 1;
        text-align: center; // display: flex;
        // align-items: center;
        padding: 0px;
        line-height: 48px;
        a {
            // flex: 1;
            width: 100%;
            height: 100%;
            color: inherit;
            text-decoration: none;
            display: inline-block;
        }

        &.active {
            border: none;
            background-color: @theme-color;
            color: white;
        }
    }
}
</style>

