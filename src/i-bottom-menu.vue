<template>
    <div :class="{open:value}">
        <transition name="fade">
            <div class="mask mask-gray" @click="cancel" v-show="value"> </div>
        </transition>

        <transition>
            <div class="menu-container">
                <i-list :list="list"></i-list>
                <i-button class="xl radius cancel-button" @click.native="cancel">取消</i-button>
            </div>
        </transition>
    </div>
</template>

<script>
import iButton from './i-button.vue'
import iList from './i-list/i-list.vue'
import iListItem from './i-list/i-list-item.vue'

// 从屏幕底部弹出的菜单，类似ios的效果

export default {
    name: "i-bottom-menu",
    components: { iButton, iList, iListItem },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    mixins: [iList],
    data: function() {
        return {}
    },
    methods: {
        cancel: function() {
            console.log("请求关闭菜单");
            this.$emit('input', false);
        }
    }
}
</script>

<style lang="less">
@import (reference) "common.less";

.mask-gray {
    // .mask;
    background-color: rgba(0, 0, 0, .3); // opacity: 0;
    // transition: opacity .3s;
    // opacity: 0;
}

.open {
    .mask-gray {
        // opacity: 1;
    }
}

.open {

    .menu-container {
        transform: translate(0, 0%);
    }
}

.menu-container {
    width: 100%;
    position: fixed;
    bottom: 0px;
    left: 0px;
     z-index: 999;
    transform: translate(0, 100%);
    transition: transform .3s;
    transition-timing-function: ease-in-out;
   

    .list,
    .cancel-button {
        // border-color: transparent;
        border: none;
    }
    .list {
        text-align: center;
        background-color: rgba(255,255,255,.96);
    }
     .cancel-button{
         padding-top: 5px;
         padding-bottom: 5px;
         color: @theme-color;
         font-weight: bold;
        //  border-radius: 20px;
     }
}






/* .fade-enter-active,
.fade-leave-active {
    transition: opacity .3s
}

.fade-enter,
.fade-leave-to
{
    opacity: 0
}
 */

// TODO:对于过渡状态这块不是很明白，貌似不使用指定的类名也可以？
// 官网复制下来测试用的
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}
</style>

