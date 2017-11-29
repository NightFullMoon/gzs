<template>
  <div class="i-auto-complete">
    <input type="text" v-model="mValue" @focus="isFocus=true" @blur="isFocus=false">

    <div v-show="mShowList" class="complete-panel">

      <div v-show="mIsLoading">
        <slot name="loading">
          <div class="loading-wrap">
            <i class="fa fa-spinner loading" aria-hidden="true"></i>
          </div>
        </slot>
      </div>

      <div v-show="renderSuggests.length<1 && !mIsLoading">
        <slot name="noResult">
          没结果
        </slot>
      </div>

      <slot :list="renderSuggests" v-show="0<renderSuggests.length">
        <i-list :list="renderSuggests" @click-item="mValue= arguments[0];"></i-list>
      </slot>
    </div>

  </div>
</template>

<script>
// 这个组件是一个高阶的组件，顺带演示了如何组合两个已有的组件
/* 
            √ 1，先开发出匹配本地数据的
            √ 2、然后是匹配function的
            最后是匹配远程数据（异步）的
          */

// 这样的话，再检查一下本地数据的调用是否正常，
// 还有一个就是能否正常处理自定义列表
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
    }
    // 给出的建议
    // suggest: {
    //   // todo: Function
    //   type: [Array],
    //   default: function() {
    //     return [];
    //   }
    // }
  },
  data: function() {
    return {
      mValue: "",
      // mShowList: false,
      isFocus: false,
      mRemoteSuggest: null,
      mIsLoading: false,
      // todo:先不管因为返回顺序造成的显示结果问题
      // 远程请求的id
      mRemoteUid: null
      // mRemoteSuggest
      // 实际进行渲染的建议
      // _suggest: []
    };
  },
  computed: {
    // 返回，提供建议的列表
    mSuggest: function() {
      console.log("生成建议");
      var keyword = this.mValue;
      var that = this;

      if (utils.isFunction(this.data)) {
        var result = this.data(keyword);
        console.log("拿到结果");
        if (utils.isPromise(result)) {
          console.log("确实是promise");

          this.handlePromise(result);
          return [];
        } else {
          this.mIsLoading = false;
          return result;
        }
      }

      this.mIsLoading = false;
      if (!keyword) {
        return [];
      }

      return this.data.filter(function(element) {
        // console.log(element);
        return -1 < String(element).indexOf(keyword);
      });
    },

    renderSuggests: function() {
      return this.mRemoteSuggest || this.mSuggest || [];
    },
    mShowList: function() {
      return this.isFocus && 0 < this.mValue.length;
    }
  },
  methods: {
    handlePromise: function(promise) {
      var that = this;
      that.mIsLoading = true;
      this.mRemoteUid = new Date().valueOf();
      const UID = Number(this.mRemoteUid);
      promise.then(function(data) {
        console.log("then");
        // console.log(UID + "----" + that.mRemoteUid);
        if (UID !== that.mRemoteUid) {
          // debugger;
          return;
        }
        // debugger;
        that.mRemoteSuggest = data;
        that.mIsLoading = false;
      });
    }
  },
  watch: {
    value: function() {
      this.mValue = this.value;
      this.mRemoteSuggest = null;
      this.mIsLoading = true;
    },
    mValue: function() {
      // this.mShowList = false;
      this.$emit("input", this.mValue);

      // if (this.isFocus && 0 < this.mValue.length) {
      //   this.mShowList = true;
      // }
      // console.log("mValue 改变");
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
  /* todo:这里暴露了css类名不统一的问题 */ .list {
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

    li > a {
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