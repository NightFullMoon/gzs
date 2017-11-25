<template>
  <div>
    <h5 class="list-title" v-if="label">{{label}}</h5>
    <ul class="list">
      <!-- <li>
                    <slot name="item" :element="item" :index="index">{{item}}</slot>
                </li> -->
      <slot>
        <i-list-item v-for="(item ,index) in list" :key="index" class="no-padding-item">
          <!-- ,clickable:(item.href || item.action) -->
          <a :href="item.href" @click="onItemClick($event,item,index)" class="clickable" :class="{disabled:item.disabled}">
            <i v-if="item.icon" class="fa" :class="item.icon" aria-hidden="true"></i> {{item.label || item}}</a>
        </i-list-item>
      </slot>
    </ul>
  </div>
</template>

<script>
// TODO:这个组件，如果想要单独实现每个item的控制，需要实现tab组件那样的功能，既将slot内特殊的子组件渲染出来
/* 
// 两种用法：
    常规用法：
        <i-list :list="list"></i-list>

    list数组中，item的定义：
    item本身是字符串：


    自定义渲染item方式
    item.element是原对象，item.index是下标
        <i-list :list="list">
            <template slot="item" scope="item">
              {{ item.element }}
            </template>
        </i-list>

*/

// todo:如果这个item不包含callback和href，则不添加可点击类
import iListItem from "./i-list-item.vue";
export default {
  name: "i-list",
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    label: {
      type: String,
      default: ""
    }
  },
  components: { iListItem },
  methods: {
    onItemClick: function(event, item, index) {
      if (item.disabled) {
        event.preventDefault();
        // event.stopPropagation();
        return;
      }
      if (item.action) {
        item.action(item, index);
        // return;
      }

      this.$emit("click-item", item, index);
    }
  }
};
</script>

<style lang="less">
@import (reference) "../common.less";
.list-title {
  margin: 8px;
  font-size: 14px;
  line-height: 16px;
}
.list {
  .regular-border();
  .radius-container(); // width: 100%;
  margin: 8px;
  list-style: none;
  padding: 0px;
  background-color: white;
  box-sizing: border-box;

  li {
    &.no-padding-item {
      padding: 0px;
    }

    // .clickable();
    width: 100%;
    margin: 0px;
    padding: 0px;
    border-bottom: 1px solid @regular-border-color;
    &:last-child {
      border-bottom: none;
    }

    > a {
      .regular-text();
      width: 100%;
      text-decoration: none;
      padding: 8px;
      display: inline-block;
      box-sizing: border-box;
      &.clickable:hover {
        background-color: #f8f8f8;
      }
      &.disabled,
      &[disabled] {
        color: #ccc;
        .All-state({
          background-color: #eee;
          cursor: not-allowed;
        });
      }
    }
  }
}
</style>

