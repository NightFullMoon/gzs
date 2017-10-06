<template>
    <div class="select" :class="{open:isShowMenu}">
        <i-button class="" @click.native="isShowMenu = true">{{selectText || "请选择" }}
            <i class="fa fa-angle-down indicator" aria-hidden="true"></i>
        </i-button>
        <i-menu class="fade" :list="list" v-model="isShowMenu" @change="selectText = (arguments[0])"></i-menu>
    </div>
</template>

<script>
import iButton from './i-button.vue'
import iMenu from './i-menu.vue'

// TODO:列表中匹配的项要进行active的渲染

export default {
    name: "i-select",
    props: {
        list: {
            type: Array,
            default: function() { return []; }
            // 
            // TODO:unselect属性：未选中时候的文本，注意下面这个不能简单的判定字符串为空，否则如果用户真的想为空时，无法判断其真实目的
            // TODO:default属性：默认激活的active
        }
    },
    components: { iButton, iMenu },
    data: function() {
        return {
            isShowMenu: false,
            selectText: "",
        };
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
        font-size: 14px;
         // 因为多加了边框所以减少行号以让外面刚好32px
        line-height: 15px;
        /* ↓这个圆角没有那么大，所以把左右边距跟input的统一了 */
        padding: 8px;
        margin: 0px;
       
        // line-height: 30px;

    }
    .menu {
        box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.2);
    }

    // TODO:过渡动画好像不生效
    /*     .fade {
        opacity: 0;
        transition: opacity .3s;
    }
    &.open {
        .fade {
            opacity: 1;
        }
    } */
    .indicator {
        float: right;
        transform: rotateZ(0deg);
        transition: transform .3s;
    }

    &.open {
        .indicator {
            transform: rotateZ(180deg);
        }
    }
}
</style>
