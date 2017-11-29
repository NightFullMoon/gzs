<template>
  <div>
    <h5 class="list-title" v-if="label">{{label}}</h5>

    <ul class="list">
      <slot>
        <li v-for="(item ,index) in list" :key="index" @mousedown="onItemClick($event,item,index)">
          <!-- ,clickable:(item.href || item.action) -->
          <slot name="item" :item="item" :index="index">
            <a :href="item.href" class="list-item clickable" @click="onLinkClick($event,item.disabled)" :class="{disabled:item.disabled}">
              <i v-if="item.icon" class="fa" :class="item.icon" aria-hidden="true"></i>{{item.label || item}}</a>
          </slot>
        </li>
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
  components: {
    iListItem
  },
  methods: {
    onItemClick: function(event, item, index) {
      if (item.disabled) {
        // event.preventDefault();
        return;
      }
      if (item.action) {
        item.action(item, index);
        // return;
      }

      this.$emit("click-item", item, index);
    },
    onLinkClick: function(event, isDisabled) {
      if (isDisabled) {
        event.preventDefault();
      }
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
  .radius-container();
  margin: 8px;
  list-style: none;
  padding: 0px;
  background-color: white;
  box-sizing: border-box;

  li {
    width: 100%;
    margin: 0px;
    padding: 0px;
    border-bottom: 1px solid @regular-border-color;
    box-sizing: border-box;
    &:last-child {
      border-bottom: none;
    }

    > .list-item {
      width: 100%;
      padding: 8px;
    }

    > a {
      .regular-text();

      text-decoration: none;

      display: inline-block;
      box-sizing: border-box;
      &.clickable:hover {
        background-color: #f8f8f8;
      }
      &.disabled,
      &[disabled] {
        color: #ccc;
        .All-state( {
            background-color: #eee;
            cursor: not-allowed;
          }
          );
      }
    }
  }
}
</style>
