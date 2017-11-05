<template>
 <transition name="slide">
  <div class="notice full-container" v-show="show">
    <!-- todo：这个图标先不显示，还没想好怎么处理 -->
    <div class="const hidden">
       <img src="" alt="" class="icon">
    </div>
    <!-- todo:↓下面这个父元素一定要指定宽度为px才能生效，
    指定为100%或者100vw都无效，但是它又不是真的限制在100px上。。。
    是chrome的bug？
     -->
   <div class="auto" style="max-width: 99px;">
     <p class="title">{{title}}</p>
     <p class="content">{{content}}</p>
   </div>
    
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
    },
    // 关闭的秒数，设置为0表示禁用
    closeSecond: {
      type: Number,
      default: 5
    },

    // 标题
    title:{
      type:String,
      default:"通知"
    },

    // 内容
    content:{
      type:String,
      default:""
    }
  },
  data: function() {
    return {
      timer: null
    };
  },
  watch: {
    show: function() {
      if (this.closeSecond < 1) {
        return;
      }

      // 关闭的话就清理计时器
      if (!this.show) {
        clearInterval(this.timer);
        this.timer = null;
        return;
      }

      // autoClose();
      if (this.timer) {
        // 有其他的计时器会关闭
        return;
      }

      // 秒数到了之后关闭
      var that = this;
      this.timer = setInterval(
        function() {
          that.$emit("update:show", false);
        },this.closeSecond * 1000
      );
    }
  },
  methods: { }
};
</script>
<style lang="less">
@import (reference) "../common.less";
.notice {
  .radius-container;
  width: ~"calc(100% - 16px)";
  height: 64px;
  margin: 8px;
  padding: 8px;
  position: fixed;
  left: 0px;
  z-index: 998;
  background-color: rgba(255, 255, 255, 0.98);
  box-sizing: border-box;
  box-shadow: 1px 3px 9px 0px rgba(0, 0, 0, 0.22);
  transition: top 0.3s;
  top: 0px;
  .icon {
    .Round(48px);
    background-color: red;
    display: block;
  }

  .title {
    .one-line;
    font-size: 20px;
    line-height: 32px;
    color: #333;
    font-weight: bold;
    // font-weight: 500;
  }

  .content {
    .one-line;
    font-size: 8px;
    line-height: 16px;
    color: #666;
  }
}

.slide-enter,
.slide-leave-to {
  top: -80px;
}
</style>


