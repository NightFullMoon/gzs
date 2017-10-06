<template>
    <input type="text">
    </input>
</template>

<script>
export default {
    name: "i-input"
}
</script>

<style lang="less">
@import (reference) "common.less";
input[type="text"] {
    height: @regular-size;
    .radius-container();
    border: 1px solid @theme-color;
    padding: 0px @regular-size/4;
    box-shadow: none;
    transition: box-shadow .3s;
    box-sizing: border-box;
    &:focus {
        outline: none;
        box-shadow: 0px 0px 8px fade(@theme-color, 50%);
    }
}
</style>

