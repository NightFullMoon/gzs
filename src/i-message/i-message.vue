<template>
    <transition name="fade">
        <p class="gzs-message top-right" v-if="show">
            <slot></slot>
        </p>
    </transition>
</template>

<script>
    // todo:目前过渡动画先暂时写成淡入淡出，以后再考虑其他的()
    // todo:可以加关闭按钮
    // todo:可以考虑加出现的位置

    export default {
        name: "i-message",
        props: {
            // 自动关闭的时间(单位毫秒)，如果设置为0，则不会自动关闭
            timeout: {
                type: Number,
                default: 3000
            }
        },
        data: function () {
            return {
                show: false
            }
        },
        mounted: function () {
            let that = this;
            this.show=true;
            if (0 < this.timeout) {
                setTimeout(() => {
                    that.show = false;
                }, that.timeout);
            }

        }
    }
</script>

<style lang="less">
    @import (reference) "../common.less";
    @import "../screen.less";

    .gzs-message {
        .regular-text;
        .radius-container;
        /* 手机端下的，在屏幕中间的地步（仿照安卓） */
        // fixme：这里不知道为什么less运算无法正常生效，先这么写
        @media (max-width: 639px) {
            max-width: 80%;
            position: fixed;
            padding: 0.2em 0.8em;
            bottom: 33%;
            left: 50%;
            transform: translate(-50%, 50%);

            background-color: rgba(0, 0, 0, .8);
            color: white;
        }

        @media (min-width: 640px) {

            .float-shadow;
            max-width: 320px;
            padding: 0.8em 1em;
            position: fixed;
            background-color: white;

            /* 边距 */
            @distance: 8px;
            /* 右上 */
            &.top-right {
                top: @distance;
                right: @distance;
            }

            /* 左上 */
            &.top-left {
                top: @distance;
                left: @distance;
            }

            /* 右下 */
            &.bottom-right {
                bottom: @distance;
                right: @distance;
            }

            /* 左下 */
            &.bottom-left {
                bottom: @distance;
                right: @distance;
            }
        }

        .fade-enter-active,
        .fade-leave-active {
            transition: opacity .5s;
        }
        .fade-enter,
        .fade-leave-to/* .fade-leave-active below version 2.1.8 */
            {
            opacity: 0;
        }
    }
</style>