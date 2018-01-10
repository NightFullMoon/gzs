<template>

  <div>
    <h5 class="list-title" v-if="label">{{label}}</h5>
    <ul class="list">
      <li v-for="(item ,index) in list" :key="index" class="full-container list-item" @click="change(index)">
        <slot name="item" :item="item" :index="index" :active-index="activeIndex">

          <p class="auto">{{item.label || item}} </p>
          <div class="const">
            <div class="icon-yes" v-show="activeIndex === index"></div>
          </div>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
import iList from "./i-list/i-list.vue";
import iListItem from "./i-list/i-list-item.vue";
// 这是一个单选的列表
// 如果直接传入数组，那么直接渲染，获取的值也是为其文本
// 如果传入{label:"",value:""}，那么渲染的文字将为label，获取的值将为value;
export default {
  name: "i-radio-list",
  // props: ["list"],
  components: { iList, iListItem },
  mixins: [iList],
  data: function() {
    return {
      activeIndex: 0
    };
  },
  methods: {
    change: function(index) {
      //   console.log("change!" +index);
      this.activeIndex = index;
    }
  }
};
</script>

<style lang="less">
@import (reference) "common.less";
</style>
