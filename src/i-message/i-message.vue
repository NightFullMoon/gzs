<template>
    <transition name="fade">
        <p class="gzs-message" v-if="show">
            <slot></slot>
        </p>
    </transition>
</template>

<script>
    export default {
        name: "i-message",
        props: {
            // 自动关闭的时间(单位毫秒)，最小值为1
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
            this.show = true;
            let timeout = 1 < Number(this.timeout) ? this.timeout : 1;

            console.log(this.timeout);
            setTimeout(() => {
                that.show = false;
            }, timeout);

        }
    }
</script>

<style lang="less">
    @import (reference) "../common.less";
    @import "../screen.less";

    .gzs-message {
        .regular-text;
        .radius-container;
        .float-shadow;

        background-color: rgba(0, 0, 0, .8);
        color: white;
        transform: translate(-50%, 50%);
        position: fixed;
        padding: 0.2em 0.8em;

        /* 手机端下的，在屏幕中间的地步（仿照安卓） */
        // fixme：这里不知道为什么less运算无法正常生效，先这么写
        @media (max-width: 639px) {
            max-width: 80%;
            bottom: 33%;
            left: 50%;
        }

        @media(min-width: 640px) {
            position: fixed;
            bottom: 50%;
            left: 50%;
        }
        
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity .5s;
        }

        .fade-enter,
        .fade-leave-to
        /* .fade-leave-active below version 2.1.8 */
            {
            opacity: 0;
        }

    }
</style>