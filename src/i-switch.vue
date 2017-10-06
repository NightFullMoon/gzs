<template>
    <div class="switch-wrap " :class="{active:value}" @click="toggle">
        <div class="switch-inner"></div>
    </div>
</template>

<script>

export default {
    name: "i-switch",
    props: ['value'],
    mounted: function() {
        console.log(this.value);
    },
    methods: {
        toggle: function() {
            this.$emit('input', !this.value);
        }
    }
}
</script>

<style lang="less">
@import (reference) "common.less";
.Switch(@size, @color) {
    @trans-time : .3s;

    height: @size - 2px;
    width: (@size*1.5-2px);
    border: 1px solid #ccc;
    background-color: white;
    border-radius: (@size/2)+1;
    position: relative;
    transition: background @trans-time, border @trans-time;

    .switch-inner {
        width: @size - 2px;
        height: @size - 2px;
        border-radius: 50%;
        background-color: white;
        position: absolute;
        right: 16px;

        transition: right @trans-time;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }

    &.active {
        background-color: @color;
        border-color: @color;
        .switch-inner {
            right: 0px;
        }
    }
}

.switch-wrap {
    .Switch(32px, @theme-color)
}
</style>

