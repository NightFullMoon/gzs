<template>
<div class="i-auto-complete">
  <input type="text" v-model="mValue">
<i-list :list="mSuggest" v-show=" 0<mValue.length" @click-item="mValue= arguments[0];mShowList=false"></i-list>
</div>
</template>

<script>
// 这个组件是一个高阶的组件，顺带演示了如何组合两个已有的组件
/* 
    1，先开发出匹配本地数据的，
    // 2、然后是匹配function的，
    // 最后是匹配远程数据（异步）的
 */
import iList from "./i-list/i-list.vue";

export default {
  name: "i-auto-complete",
  props: {
    //  整个组件的值，此prop提供给v-model使用
    value: [String, Number],
    // 本地匹配的值，
    data: {
      type: Array,
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
      mShowList: false
      // 实际进行渲染的建议
      // _suggest: []
    };
  },
  computed: {
    // 返回，提供建议的列表
    mSuggest: function() {
      var keyword = this.mValue;

      if (!keyword) {
        return [];
      }
      return this.data.filter(function(element) {
        // console.log(element);
        return -1 < String(element).indexOf(keyword);
      });
    }
  },
  watch: {
    value: function() {
      this.mValue = this.value;
    },
    mValue: function() {
      this.mShowList = false;
      this.$emit("input", this.mValue);
    }
  },
  components: { iList }
};
</script>

<style>

</style>
<style lang="less">
.i-auto-complete {
  input,
  /* todo:这里暴露了css类名不统一的问题 */ .list {
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
}
</style>

