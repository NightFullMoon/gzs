<template>
    <div class="select" :class="{open:isShowMenu}">
        <i-button class="" @click.native="isShowMenu = true">{{selectText || "请选择" }}
            <i class="fa fa-angle-down indicator" aria-hidden="true"></i>
        </i-button>
        <i-list class="menu fade" :list="list" @click-item="change" v-show="isShowMenu"></i-list>
        <div class="screen-mask" @click="isShowMenu = false" v-show="isShowMenu"></div>
    </div>
</template>

<script>
    import iButton from './i-button.vue'
    import iList from "./i-list/i-list.vue";

    // TODO:列表中匹配的项要进行active的渲染

    export default {
        name: "i-select",
        props: {

            /**
             *@type {Array<String> | Array<iListItem>} 
             */
            list: {
                type: Array
                // TODO:unselect属性：未选中时候的文本，注意下面这个不能简单的判定字符串为空，否则如果用户真的想为空时，无法判断其真实目的
                // TODO:default属性：默认激活的active
            }
        },
        components: {
            iButton,
            iList
        },
        data: function () {
            return {
                isShowMenu: false,
                selectText: ""
            };
        },
        methods: {
            change: function (item, index) {

                if (item && item.label) {
                    this.selectText = item.label;
                } else {
                    this.selectText = item;
                }

                this.isShowMenu = false;

            }
        }
    }
</script>

<style lang="less">
    @import (reference) "common.less";
    .select {
        position: relative;
        margin: 8px;
        .button {
            .regular-border();
            .radius-container();
            width: 100%;
            box-shadow: none;
            font-size: 14px; // 因为多加了边框所以减少行号以让外面刚好32px
            line-height: 15px;
            /* ↓这个圆角没有那么大，所以把左右边距跟input的统一了 */
            padding: 8px;
            margin: 0px; // line-height: 30px;
        }

        .indicator {
            float: right;
            transform: rotateZ(0deg);
            transition: transform .3s;
        }

        &.open {
            .indicator {
                transform: rotateZ(180deg);
            }
        } // 弹出的菜单
        .menu {
            .float-shadow;
            position: absolute;
            width: 100%;
            margin-top: 8px;
            background-color: transparent;
            z-index: 999;

            >.list {
                margin: 0px;
                overflow: hidden;
            }

            &:before {
                .Triangle(8px);
                content: "";
                display: block;
                margin: 0px;
                position: absolute;
                right: 8px;
                top: -5px;
                box-sizing: border-box;
                background-color: white;
            }
        }
    }
</style>