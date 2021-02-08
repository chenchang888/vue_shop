<template>
  <!-- 添加数量 -->
  <div>
    <div class="food_num_wrap">
      <transition name="addNum">
        <div class="food_reduce" v-show="foodShop.count" @click="handleChooseNum(false)">
          <div class="reduce_line"></div>
        </div>
      </transition>
      <transition name="num">
        <div class="food_num" v-show="foodShop.count">
          <span>{{foodShop.count}}</span>
        </div>
        
      </transition>
      <div class="food_add" @click="handleChooseNum(true)">
        <div class="add_line_left"></div>
        <div class="add_line_right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    foodShop: {
      type: Object,
      requirde: true
    }
  },
  methods: {
    handleChooseNum(flag) {
      this.$store.dispatch('getCollectNum', { flag, foodShop: this.foodShop })
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
.food_num_wrap {
  position: absolute;
  right: 30px;
  bottom: 20px;
  z-index: 9;
  display: flex;
  .food_reduce,
  .food_add {
    position: relative;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 5px solid var(--themeColor);
    &.food_add {
      background-color: var(--themeColor);
    }
    .reduce_line,
    .add_line_left,
    .add_line_right {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 3px;
      border-radius: 20px;
      background-color: var(--themeColor);
    }
    .add_line_left {
      top: 45%;
      left: 10%;
      height: 1px;
      background-color: #fff;
      transform: rotate(90deg);
    }
    .add_line_right {
      height: 2px;
      background-color: #fff;
    }
  }
  .food_num {
    display: flex;
    align-items: center;
    margin: 0 20px;
  }
  .addNum-enter-active {
    transition: all 0.5s;
  }
  .addNum-leave-active {
    transition: all 0.5s;
  }
  .addNum-enter,
  .addNum-leave-to {
    transform: translateX(70px) rotate(360deg);
    opacity: 0;
  }
  .num-enter-active {
    transition: all 0.5s;
  }
  .num-leave-active {
    transition: all 0.5s;
  }
  .num-enter,
  .num-leave-to {
    opacity: 0;
  }
}
</style>
