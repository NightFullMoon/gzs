<template>
    <div v-show="value">
        <ul class="menu">
            <li class="menu-item" v-for="(item ,index) in list" :key="index" @click="select(item)">{{item}}</li>
        </ul>
        <div class="mask" @click="$emit('input', false);"></div>
    </div>
</template>

<script>
export default {
    name: "i-menu",
    props: {
        list: {
            type: Array,
            default: function() { return []; }
        },
        // show:
        value: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        select: function(item) {
            this.$emit('input', false);
            this.$emit('change', item);
        }
    }
}
</script>
<style lang="less">
@import (reference) "common.less";
.menu {
    .regular-border();
    .radius-container();
    width: 100%;
    // margin: 8px;
    margin-top: 8px;
    background-color: white;
    list-style: none;
    padding: 0px;
    box-sizing: border-box;
    position: absolute;
    z-index: 999;
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
    .menu-item {
        .regular-text();
        .clickable();
        padding: 8px;
        border-bottom: 1px solid @regular-border-color;
        &:last-child {
            border-bottom: none;
        }
    }
}

.mask {
    // display: none;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    // background-color: rgba(0, 0, 0, .5);
    z-index: 998;
}
</style>
