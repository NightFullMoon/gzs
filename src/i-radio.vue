<template>
    <input type="radio" name="" id="">
</template>

<script>
export default {
    name: "i-radio"
}
</script>

<style lang="less">
@import (reference) "common.less";

.Radio(@size) {
    @padding: (@size - 13px) / 2;

    vertical-align: middle;
    margin: @padding;
    position: relative;

    &:before {
        .Round(@size);
        content: "";
        box-sizing: border-box;
        display: block;
        border: 1px solid @theme-color;
        position: absolute;
        top: -@padding ;
        left: -@padding ;
        background-color: white;
    }

    &:checked {
        &:after {
            @inner-size : @size*0.6666;
            @inner-padding: (@inner-size - 13px) / 2;
            .Round(@inner-size);
            content: "";
            color: white;
            text-align: center;
            display: block;
            background-color: @theme-color;
            position: absolute;
            top: -@inner-padding;
            left: -@inner-padding ;
        }
    }
}

input[type="radio"] {
    .Radio(24px);
}

input[type="radio"].yes {
    // .Radio(24px);
    &:checked {
        &:before {
            background-color: @theme-color;
        }
        &:after {
            .icon-yes();
            content: "";

            border-color: white;
            border-radius: 0px;

            margin: 0px 5px;
            width: 4px;
            height: 12px;
        }
    }
}

input[type="checkbox"] {
    .Radio(24px);
    &:before {
        // .radius-container();
        border-radius: 8px;
    }
    &:checked {
        &:after {
            .radius-container(); //  border-radius: 8px;
        }
    }
}

input[type="checkbox"].yes {
    // .Radio(24px);
    &:before {
        // .radius-container();
        border-radius: 8px;
    }
    &:checked {
        &:before {
            background-color: @theme-color;
        }
        &:after {
            .icon-yes(); // .radius-container(); //  border-radius: 8px;
            border-radius: 0px;

            border-color: white;
            margin: 0px 5px;
            width: 4px;
            height: 12px;
        }
    }
}
</style>

