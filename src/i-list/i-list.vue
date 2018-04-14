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
  // * 

  /**
   * 渲染列表的对象
   * @typedef {Object} ListItem
   * @property {String} ListItem.label-显示在列表中的文本
   * @property {String} href - 链接
   * @property {String} icon - 图标的类名，请在此处搜索[Font Awesome](http://fontawesome.io/icons/)
   * @property {Boolean} disabled - 是否禁用，设置为true时，回调函数action和链接href都**不会被触发**
   * @property {Function} action - 点击item时候触发的回调函数
   * @param {ListItem} item - 对象本身
   * @param {Number} index - 对象在列表中所处的下标
   */

  export default {
    name: "i-list",
    props: {
      /**
       * @type { (Array<String> | Array<ListItem> )}  list
       * */
      list: {
        type: Array,
        default: function () {
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
      onItemClick: function (event, item, index) {
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
      onLinkClick: function (event, isDisabled) {
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

      >.list-item {
        width: 100%;
        padding: 8px;
      }

      >a {
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