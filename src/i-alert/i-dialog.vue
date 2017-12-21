<template>
  <div class=" i-dialog">
    <transition name="fade">
      <div class="mask mask-gray" @click="close" v-show="value"> </div>
    </transition>

    <div class="dialog-body-container" v-show="value">
      <div class="dialog-body">
        <slot>
          <h3 v-if="title">{{title}}</h3>
          <p v-if="content">{{content}}</p>
        </slot>
        <div class="buttons">
          <slot name="buttons">
            <i-button class="radius" :class="secondary.class" v-if="secondary" @click.native="secondaryAction">{{secondary.label || "取消"}}</i-button>
            <i-button class="radius primary" :class="primary.class" @click.native="primaryAction">{{primary.label}}</i-button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import iButton from "../i-button.vue";

  /* 
      primary={
          // 显示出来的文本
          label:"主操作",
          // 点击之后的回调函数
          callback:function(){},
          // 
          class:""
      }
       */

  export default {
    name: "i-dialog",
    props: {
      value: {
        type: Boolean,
        default: true
      },
      primary: {
        type: [String, Object],
        default: function () {
          return {
            label: "确定",
            class: ["primary"],
            callback: function () {}
          };
        }
      },
      secondary: {
        // type:[String,Object],
        default: false
      },
      title: {
        type: String,
        default: ""
      },
      content: {
        type: String,
        default: ""
      }
    },
    components: {
      iButton
    },
    methods: {
      close: function () {
        this.$emit("input", false);
      },
      primaryAction: function () {
        console.log("primaryAction");
        this.primary.callback();
        this.close();
      },
      secondaryAction: function () {
        if (this.secondary && this.secondary.callback) {
          this.secondary.callback();
        }
        this.close();
      }
    }
  };
</script>

<style lang="less">
  @import (reference) "../common.less";

  .dialog-body-container {
    width: 80%;
    height: 50%; // 全屏居中（先这么处理）
    position: fixed;
    top: 50vh;
    left: 50vw;
    z-index: 999;
  }

  .dialog-body {
    .radius-container();
    text-align: center;
    background-color: rgba(255, 255, 255, 0.96);
    padding: 8px;
    position: relative;
    top: -25%;
    left: -50%;

    .buttons {
      display: flex;
      margin-top: 16px;
      >.button {
        flex: 1;
        margin: 0px;

        +.button {
          margin-left: 8px;
        }
      }
    }
  }
</style>