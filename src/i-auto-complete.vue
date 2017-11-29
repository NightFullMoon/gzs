<template>
  <div class="i-auto-complete">
    <input type="text" v-model="mValue" @focus="isFocus=true" @blur="isFocus=false">
<slot :list="mSuggest">
      <i-list :list="mSuggest" v-show="mShowList" @click-item="mValue= arguments[0];"></i-list>
</slot>
  </div>
</template>

<script>
// 这个组件是一个高阶的组件，顺带演示了如何组合两个已有的组件
/* 
    √ 1，先开发出匹配本地数据的
    √ 2、然后是匹配function的
    最后是匹配远程数据（异步）的
  */
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
      isFocus: false
      // mRemoteSuggest
      // 实际进行渲染的建议
      // _suggest: []
    };
  },
  computed: {
    // 返回，提供建议的列表
    mSuggest: function() {
      // console.log("生成建议");
      var keyword = this.mValue;

      if (utils.isFunction(this.data)) {
        return this.data(keyword);
      }

      if (!keyword) {
        return [];
      }
      return this.data.filter(function(element) {
        // console.log(element);
        return -1 < String(element).indexOf(keyword);
      });
    },
    mShowList: function() {
      return this.isFocus && 0 < this.mValue.length;
    }
  },
  watch: {
    value: function() {
      this.mValue = this.value;
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

  .list {
    .float-shadow;
    position: absolute;
    top: 100%;
    left: 0px;
    z-index: 999;
  }

  .transparent-mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 998;
  }
}
</style>
