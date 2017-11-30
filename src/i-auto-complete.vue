<template>
  <div class="i-auto-complete">
    <input type="text" v-model="mValue" @focus="isFocus=true" @blur="isFocus=false" :placeholder="placeholder" ref="input">

    <div v-show="mShowPanel" class="complete-panel">
      <!-- loading槽 -->
      <div v-show="mIsLoading">
        <slot name="loading">
          <div class="loading-wrap">
            <i class="fa fa-spinner loading" aria-hidden="true"></i>
          </div>
        </slot>
      </div>

      <!-- noResult槽 -->
      <div v-show="renderSuggests.length<1 && !mIsLoading">
        <slot name="noResult">
          没结果
        </slot>
      </div>

      <!-- 默认槽，用来放渲染结果 -->
      <div v-show="0<renderSuggests.length">
        <slot :list="renderSuggests">
          <i-list :list="renderSuggests" @click-item="mValue= arguments[0];"></i-list>
        </slot>
      </div>
    </div>

  </div>
</template>

<script>
  // 这个组件是一个高阶的组件，顺带演示了如何组合两个已有的组件


  // fixme:如果外部没有使用v-model，好像会不正常？
  import iList from "./i-list/i-list.vue";
  import utils from "./utils.js";

  export default {
    name: "i-auto-complete",
    props: {
      //  整个组件的值，此prop提供给v-model使用
      value: [String, Number],
      // 本地匹配的值，
      data: {
        type: [Array, Function],
        default: () => []
      },
      placeholder: String

    },
    data: function () {
      return {
        mValue: "",

        isFocus: false,
        // 本地的建议，同步
        mLocalSuggest: null,
        // 远程的建议，异步
        mRemoteSuggest: null,
        // 当前是否处于加载状态
        mIsLoading: false,

        // 远程请求的id
        mRemoteUid: null

      };
    },
    computed: {

      // 实际进行渲染的列表
      renderSuggests: function () {
        return this.mRemoteSuggest || this.mLocalSuggest || [];
      },
      // 
      mShowPanel: function () {
        return this.isFocus && 0 < this.mValue.length;
      }
    },
    methods: {

      // 用来从外部触发补全的
      triggerComplete: function () {

        var keyword = this.mValue;
        this.$refs.input.focus();
        // 如果是回调
        if (utils.isFunction(this.data)) {

          var result = this.data(keyword);
          if (utils.isPromise(result)) {
            // this.mIsLoading = true;
            this.handlePromise(result);
          } else {
            this.mLocalSuggest = result;
          }

        } else if (!keyword) {
          this.mLocalSuggest = [];
        } else {
          this.mLocalSuggest = this.data.filter(function (element) {
            return -1 < String(element).indexOf(keyword);
          });
        }

      },

      // 处理异步的请求
      handlePromise: function (promise) {
        var that = this;
        that.mIsLoading = true;
        this.mRemoteUid = new Date().valueOf();
        const UID = Number(this.mRemoteUid);
        promise.then(function (data) {
          console.log("then");

          if (UID !== that.mRemoteUid) {

            return;
          }

          that.mRemoteSuggest = data;
          that.mIsLoading = false;
        });
      }
    },
    watch: {
      value: function () {
        this.mValue = this.value;
      },
      mValue: function () {
        this.$emit("input", this.mValue);
        this.mLocalSuggest = null;
        this.mRemoteSuggest = null;
        this.triggerComplete();
      }
    },
    components: {
      iList
    }
  };
</script>

<style lang="less">
  @import (reference) "common.less";
  .i-auto-complete {
    position: relative;

    input,
    /* todo:这里暴露了css类名不统一的问题 */
    .list {
      width: 100%;
      margin-left: 0px;
      margin-right: 0px;
    }
    input[type="text"] {
      // line-height: 24px;
      height: 40px;
      font-size: 16px; // padding: 12px 8px;
    }
    .list {
      margin-top: 0px;
      border-color: transparent;

      li>a {
        color: #888;
      }
    }

    .complete-panel {
      .float-shadow;
      .radius-container;
      width: 100%;
      position: absolute;
      top: 100%;
      left: 0px;
      z-index: 999;
      background-color: white;
    } // .transparent-mask {
    //   width: 100vw;
    //   height: 100vh;
    //   position: fixed;
    //   top: 0px;
    //   left: 0px;
    //   z-index: 998;
    // }
    .loading-wrap {
      width: 100%;
      text-align: center;
      color: #333;
    }
  }

  .loading {
    animation-timing-function: linear;
    animation: rotate 1.6s infinite;
    font-size: 32px;
    padding: 8px;
  }

  @keyframes rotate {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }
</style>