<template>
  <transition :name="transitionName">
    <div class="notice full-container top-right" :class="{draging:isDraging}" @touchstart="onTouchStart" @touchmove="onMove"
      @touchend="onTouchEnd" :style="style" v-show="show">
      <!-- 注：透明渐变的效果：;opacity: '+(1-leavePercent)*1.2 +';  -->
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

      <span class="close" @click="remove">×</span>

    </div>
  </transition>
</template>

<script>
  /** 组件TODO: 2、当鼠标hover到通知上时，不隐藏 
   */

  import screen from "../screen.js";

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
        default: 3
      },

      // 标题
      title: {
        type: String,
        default: "通知"
      },

      // 内容
      content: {
        type: String,
        default: ""
      },
      // 弹窗出现的位置，（仅在pc上有效果）可选值有"top-right","bottom-right","bottom-left","top-left"
      position: {
        type: String,
        default: "top-right"
      }
    },
    data: function () {
      return {
        timer: null,
        // 触摸开始时，触摸点所在的位置
        startX: 0,

        offsetX: 0,

        // 表示通知当前是否正在拖拽中
        isDraging: false
      };
    },
    computed: {
      // 计算出组件被拖动时候，x轴的值
      leavePercent: function () {
        // console.log("计算了leavePercent" + this.offsetX);
        if ("string" == typeof this.offsetX) {
          // 这里证明是以百分比的形式传递进来的，直接换算成相应的两位小数
          // console.log(this.offsetX);
          return parseFloat(this.offsetX) / 100;
        }

        return this.offsetX / window.screen.width;
      },

      // 根据拖拽，计算出left属性应该偏移多少
      style: function () {
        if (this.leavePercent < 0.01) {
          return "";
        } else {
          return 'left:' + this.leavePercent * 100 + '%'
        }
      },

      // 计算出应该执行何种动画效果
      transitionName: function () {
        if (screen.isOnM()) {
          return "slide"
        }

        switch (this.position) {
          case "top-left":
          case "bottom-left":
            return "left";

          case "top-right":
          case "bottom-right":
            return "right";

          default:
            return "";

        }
      }

    },
    watch: {
      show: function () {
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
        this.timer = setInterval(function () {
          that.$emit("update:show", false);
        }, this.closeSecond * 1000);
      },


      /*   leavePercent:function(){
          if(  0.99 <this.leavePercent){
            this.$emit("update:show",false);
          }
        } */

    },
    methods: {
      remove: function () {
        this.$emit("update:show", false);
      },

      onTouchStart: function (event) {
        console.log(event.touches[0]);
        this.startX = event.touches[0].clientX;
        this.isDraging = true;
      },

      onTouchEnd: function (event) {
        //  this.startX = event.touches[0].clientX;
        // console.log(this.leavePercent);

        if (0.5 < this.leavePercent) {
          this.offsetX = "100%";
          // todo:如果从左边的话要附加一个从左边消失的动画
        } else if (this.leavePercent < -0.5) {
          this.offsetX = "-100%";
        } else {
          this.offsetX = 0;
        }
        this.isDraging = false;
      },

      onMove: function (event) {
        // console.log("onMove");
        var currentX = event.touches[0].clientX;
        this.offsetX = currentX - this.startX;
      }
    }
  };
</script>
<style lang="less">
  
  @import (reference) "../common.less";

  @pc-width: 320px;

  .notice {
    .radius-container;
    height: 64px;

    padding: 8px;
    position: fixed;
    left: auto;
    top: auto;
    z-index: 998;
    background-color: rgba(255, 255, 255, 0.98);
    box-sizing: border-box;
    box-shadow: 1px 3px 9px 0px rgba(0, 0, 0, 0.22); // transition: top 0.3s, left 0.3s;
    // right: 0px;;
    &.draging {
      // transition: top 0.3s;
    }

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
      font-weight: bold; // font-weight: 500;
    }

    .content {
      .one-line;
      font-size: 8px;
      line-height: 16px;
      color: #666;
    }

    .close {
      cursor: pointer;
    }

    @media (max-width: 639px) {
      width: ~"calc(100% - 16px)";
      top: 0px;
      left: 0px;
      margin: 8px;
    }

    @media (min-width: 640px) {
      width: @pc-width;
      .float-shadow;
      margin: 0px; // padding: 0.8em 1em;
      position: fixed; // 边距 
    }

  }

  .slide-enter,
  .slide-leave-to {
    top: -80px;
  }

  @media (min-width: 640px) {
    @distance: 8px; // 右上 
    &.top-right {
      top: @distance;
      right: @distance;
    } // 左上 
    &.top-left {
      top: @distance;
      left: @distance;
    } // 右下 
    &.bottom-right {
      bottom: @distance;
      right: @distance;
    } // 左下 
    &.bottom-left {
      bottom: @distance;
      left: @distance;
    } // 从右侧移入移出的动画
    .right-enter,
    .right-leave-to {
      right: -@pc-width;
    }

    .right-leave-active,
    .right-enter-active {
      transition: right .3s;
    }

    .right-enter-to,
    .right-leave {
      right: @distance;
    } // 从左侧移入移出的动画
    .left-enter,
    .left-leave-to {
      left: -@pc-width;
    }

    .left-leave-active,
    .left-enter-active {
      transition: left .3s;
    }

    .left-enter-to,
    .left-leave {
      left: @distance;
    }

  }
</style>