<template>
    <input type="text" v-model="mValue">
    </input>
</template>

<script>
export default {
    name: "i-input",
    prop: ["value"],
    data: function() {
        return {
            mValue: this.value || "",
        }
    },
    watch: {
        value:function(){
            this.mValue = this.value;
        },

        mValue: function() {
            this.$emit("input", this.mValue);
        }
    }
}
</script>

<style lang="less">
@import (reference) "common.less";
input[type="text"],
input[type="password"]{
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
    &.xl {
        width: 100%;
    }
}
</style>

