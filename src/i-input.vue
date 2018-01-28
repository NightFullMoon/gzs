<template>
  <input class="gzs-input" type="text" :placeholder="placeholder" v-model="mValue" />
</template>

<script>
/**
如果仅仅只是想要获得css的样式，可以在原生input上使用`gzs-input`来获得其样式

todo:
要添加的属性：
disabled
type "text" "password"
placeholder
label:

updateValue : 允许用户自定义处理value的过程

input-group

额。。。这里需要i-button渲染为a标签才能正常使用input-group
*/

export default {
  name: "i-input",
  props: {
    value: { default: "" },
    placeholder: { default: "" }
  },
  data: function() {
    return {
      mValue: this.value || ""
    };
  },
  watch: {
    value: function() {
      this.mValue = this.value;
    },

    mValue: function() {
      this.$emit("input", this.mValue);
    }
  }
};
</script>

<style lang="less">
@import (reference) "common.less";


input[type="text"].gzs-input,
input[type="password"].gzs-input {
  height: @regular-size;
  .radius-container();
  .regular-text;
  border: 1px solid #ccc;
  // color: #333;
  padding: 0px @regular-size/4;
  box-shadow: none;
  transition: box-shadow 0.3s;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: @theme-color;
    box-shadow: 0px 0px 8px fade(@theme-color, 50%);
  }
  &.xl {
    width: 100%;
  }
}

/*1.先搞定圆角继承的问题 */
/*2.再统一边框的颜色*/

/*按钮组的样式*/
.input-group {
  .full-container;
  .radius-container;

   input[type="text"].gzs-input,
   input[type="password"].gzs-input,
   .button,
   .gzs-button {
    margin: 0px;
    // border-radius: inherit;
    // 写在这里，不然权重不够
    border-radius: 0px;
    margin-left: -1px;

    &:first-child {
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
      margin-left: 0px;
    }

    &:last-child {
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
    }

    & + input[type="text"].gzs-input,
    & + input[type="password"].gzs-input,
    & + .gzs-button {
      border-left-color: transparent;
    }
  }

  // >input[type="text"].gzs-input + .gzs-button,
  // input[type="password"].gzs-input + .gzs-button{
  //   border-left-color: transparent;
  // }

  > input[type="text"].gzs-input,
  input[type="password"].gzs-input {
    .auto;
    // border-top-right-radius: 0px;
    // border-bottom-right-radius: 0px;
  }

  .gzs-button {
    .const;
    //这里先这样继承自const的padding0，如果那边不用了这边也不用了
    &:last-child{
      padding-right: 8px;
    }
    &:first-child{
      padding-left: 8px;
    }

    // border-top-left-radius: 0px;
    // border-bottom-left-radius: 0px;
  }
}
</style>

