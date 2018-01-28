<template>
  <a href="###" class="gzs-button button" :class="{disabled:mDisabled}" @click="!mDisabled && $emit('click')">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "i-button",
  //   这块其实应该让生成器来生成才对，注释应该只写上说明

  /**@type {Object} props
   * @property {Boolean|String} [disabled=false] - 是否要禁用此按钮，如果设置为`true` 或者`"disabled"`,或者`"true"`，则该按钮会被禁用。禁用状态下，`click`事件不会被触发。但是`click.native`事件不受此属性影响
   **/

  props: {
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
  }
};
</script>

<style lang="less" >
@import (reference) "common.less";
//todo:将按钮的disabled颜色，改为不是灰色而是浅一点的主色调

.Button-size(@height) {
  @inner-height :@height - 2px;

  min-height: @height;
  font-size: @regular-text-size;
  line-height: @inner-height/2;
  padding: @inner-height/4 @height/2;
  margin: @height/4;
  border-radius: @height/2;

  // 圆形按钮
  &.round {
    border-radius: @height/2;
  }
}

/** 
* 颜色
* 创建一个，实体风格的按钮
* @function 
* @param {Color} normal - 默认情况下按钮的颜色
* 
*/
.Button-color-solid(@normal, @hover:darken(@normal, 10%),@active:darken(@normal, 20%), @disabled:fade(@normal, 30%)) {
  color: white;
  background-color: @normal;
  border: none;
  &:hover,
  &.hover {
    background-color: @hover;
  }
  &:active,
  &.active {
    background-color: @active;
  }

  &:disabled,
  &.disabled {
    background-color: @disabled;
  }
}

/** 
* 颜色
* 创建一个线框风格的button
*/
.Button-color-line(@normal, @hover:darken(@normal, 10%), @active:darken(@normal, 20%),@disabled:#ccc) {
  color: #333;

  border: 1px solid transparent;
  border-color: @normal;
  // z-index: 1;

  &:hover,
  &.hover {
    color: @hover;
    border-color: @hover !important;
  }
  
  &:active,
  &.active {
    color: @active;
    border-color: @active !important;
  }

  &:disabled,
  &.disabled {
    color: @disabled;    
    border-color: @disabled !important;
  }
}

.button {
  //   .Button(32px);
  .Button-size(@regular-size);
  //  .regular-text();
  display: inline-block;
  text-decoration: none;
  vertical-align: middle;
  box-sizing: border-box;
  background-color: white;
  text-align: center;
  cursor: pointer;
  outline: none;
  position: relative;
  &:hover,
  &.hover{
    z-index: 2;
  }

  &.radius {
    .radius-container();
  }

  &.disabled:hover {
    cursor: not-allowed;
  }

  .Button-color-line(#ccc,#333);
  //   .round;

  &.primary {
    .Button-color-solid(@theme-color);
  }

  &.warning {
    .Button-color-solid(red);
  }

  &.xl {
    width: 100%;
    display: block;
  }
}

.button.test {
  .Button-color-line(rgb(249, 38, 114));
}

/*按钮组*/
.btn-group{
  .radius-container;
  display: table;
  >.gzs-button{
    margin: 0px;
    margin-left:-1px;
    float: left;
    border-radius: 0px;
    &:first-child{
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
    }
    &:last-child{
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
    }

  }
}
</style>
