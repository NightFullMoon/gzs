<template>
    <div>
        <h5 class="list-title" v-if="label">{{label}}</h5>
        <ul class="list">
            <!-- <li>
                    <slot name="item" :element="item" :index="index">{{item}}</slot>
                </li> -->
            <slot>
                <i-list-item v-for="(item ,index) in list" :key="index">{{item}}</i-list-item>
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

    自定义渲染item方式
    item.element是原对象，item.index是下标
        <i-list :list="list">
            <template slot="item" scope="item">
              {{ item.element }}
            </template>
        </i-list>

*/
import iListItem from './i-list-item.vue'
export default {
    name: "i-list",
    props: {
        list: {
            type: Array,
            default:function(){return[];}
        },
        label: {
            type: String,
            default: ""
        }
    },
    components: { iListItem }
}
</script>

<style lang="less">
// @import (reference) "common.less";
//TODO:先把全局的导进来，以后再做处理
@import (reference) "../common.less";
.list-title{
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
        .regular-text();
        .clickable();
        padding: 8px;

        border-bottom: 1px solid @regular-border-color; // box-sizing: border-box;
        &:last-child {
            border-bottom: none;
        }
    }
}
</style>

