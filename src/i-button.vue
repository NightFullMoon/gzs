<template>
    <a href="###" class="button round flat">
        <slot></slot>
    </a>
</template>

<script>
export default {
    name: "i-button"
}
</script>

<style lang="less" >
@import (reference) "common.less";
.Button(@height) {
    .regular-text(); // height: @height;
    line-height: @height;
    display: inline-block; // font-size: @height * 0.5;
    padding: 0px @height/2;
    margin: @height/4;
    text-decoration: none;
    vertical-align: middle; //    border:1px solid #333;
    // color:#333;
    box-sizing: border-box;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    background-color: white;
    text-align: center;

    // 圆形按钮
    &.round {
        border-radius: @height/2;
    }

    &.flat{
        .regular-border();
         line-height: @height - 2 ;
         box-shadow: none;
        //  border:1px solid 
    }


    &.radius {
        // border-radius: @height/2;
        .radius-container();
    }
}

.button {
    .Button(32px);
    &.primary {
        background-color: @theme-color;
        color: white;
        border: none;
    }
    &.warning {
        background-color: red;
        color: white;
        border: none;
    }

    &.xl {
        // width: 80%;
        // text-align: center;
        // margin: 8px 8;
        display: block;
    }
}
</style>
