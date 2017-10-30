<template>
 <transition name="slide">
  <div class="notice" v-show="show">

  </div>
  </transition>
</template>

<script>
export default {
  name: "i-notice",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="less">
@import (reference) "./common.less";
.notice {
  .radius-container;
  width: ~"calc(100% - 16px)";
  height: 64px;
  margin: 8px;
  position: fixed;
  left: 0px;
  z-index: 998;
  background-color: rgba(255, 255, 255, 0.98);
  box-sizing: border-box;
  box-shadow: 1px 3px 9px 0px rgba(0, 0, 0, 0.22);
  transition: top 0.3s;
  top: 0px;
}

.slide-enter,
.slide-leave-to {
  top: -80px;
}
</style>


