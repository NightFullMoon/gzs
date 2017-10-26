<template>
    <div>
       <ul>
  <slot name="item"
    v-for="item in list"
    :text="item">
    <!-- 这里写入备用内容 -->
    
  </slot>
</ul>
    </div>
</template>

<script>
export default {
    name:"test-c",
    data:function(){
        return {list:[1,2]}
    }

}
</script>

<style>

</style>
