<template>
    <input class="gzs-input" type="text" :placeholder="placeholder" v-model="mValue"/>
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
  border: 1px solid @theme-color;
  padding: 0px @regular-size/4;
  box-shadow: none;
  transition: box-shadow 0.3s;
  box-sizing: border-box;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 8px fade(@theme-color, 50%);
  }
  &.xl {
    width: 100%;
  }
}

/*按钮组的样式*/
.input-group {
  .full-container;
  .radius-container;

  > input[type="text"].gzs-input,
  input[type="password"].gzs-input,
  .button,
  .gzs-button {
    margin: 0px;
    border-radius: inherit;
  }

  > input[type="text"].gzs-input,
  input[type="password"].gzs-input {
    .auto;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .button,
  .gzs-button {
    .const;

    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
}
</style>

