<template>
  <input class="gzs-input" :disabled="mDisabled" type="text"  v-model="mValue" />
</template>

<script>
/**
如果仅仅只是想要获得css的样式，可以在原生input上使用`gzs-input`来获得其样式

todo:
要添加的属性：
disabled √
label: 

updateValue : 允许用户自定义处理value的过程 好像不需要啊，只要简单的watch就行了

input-group √

额。。。这里需要i-button渲染为a标签才能正常使用input-group
*/

export default {
  name: "i-input",
  props: {
    value: { default: "" },
    // placeholder: { default: "" },
    disabled: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    mDisabled: function() {
      if ("boolean" === typeof this.disabled) {
        return this.disabled;
      } else if ("string" === typeof this.disabled) {
        return "disabled" === this.disabled || "true" === this.disabled;
      }
    }
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
  padding: 0px @regular-size/4;
  box-shadow: none;
  transition: box-shadow 0.3s;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: @theme-color !important;
    box-shadow: 0px 0px 8px fade(@theme-color, 50%);
  }
  &.xl {
    width: 100%;
  }

  &.disabled {
    background-color: #ccc;
  }
}

/*按钮组的样式*/
.input-group {
  .full-container;
  .radius-container;

  input[type="text"].gzs-input,
  input[type="password"].gzs-input,
  .button,
  .gzs-button {
    margin: 0px;
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

  > input[type="text"].gzs-input,
  input[type="password"].gzs-input {
    .auto;
  }

  .gzs-button {
    .const;
  }
}
</style>

