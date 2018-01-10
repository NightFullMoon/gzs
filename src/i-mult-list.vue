<template>
    <i-list :label="label">
        <!-- {{actives}} -->
        <i-list-item v-for="(item ,index) in list" :key="index" class="full-container" @click.native="change(index)">
            <p class="auto">{{item.label || item}} </p>
            <div class="const">
                <!-- <div class="icon-yes" v-show="activeIndex === index"></div> -->
                <input type="checkbox" class="yes" :checked="actives[index]"/>
            </div>
        </i-list-item>
    </i-list>
</template>

<script>
import Vue from 'vue'
import iList from './i-list/i-list.vue'
import iListItem from './i-list/i-list-item.vue'

// 多选列表

export default {
    name: "i-mult-list",
    components: { iList, iListItem },
    mixins: [iList],
    data:function(){
        return{
            actives:[],
        }
    },
    methods:{
        change:function(index){
            Vue.set(this.actives,index,!this.actives[index]);
        }
    },
    mounted:function(){
        // var actives=[];
        this.actives =  this.list.map(function(){
            return false
        });

    }
}
</script>

<style>

</style>
