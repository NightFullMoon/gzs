<template>
  <div v-show="show">
      <slot></slot>
  </div>
</template>

<script>
export default {
    name:"i-tab-pane",
    props:["title"],
    data:function(){
        return{
            // 这两个只能存储在面板内部
            show:true,
            key:"",
        }
    }

}
</script>

<style>

</style>
