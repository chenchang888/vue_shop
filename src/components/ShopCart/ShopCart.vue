<template>
  <div>
    <div class="shop_cart_wrap" v-if="info">
      <!-- 图标 -->
      <div class="shop_cart_icon" @click="handleShowCart">
        <div class="shop_icon_out">
          <div class="shop_cart_num" v-show="getAllCartNum">{{getAllCartNum}}</div>
          <div :class="{shop_icon_inner:true,shop_cart:getAllCartNum }">
            <i class="iconfont icon-gouwuche-copy" :class="{'icon-gouwuche-show':getAllCartNum}"></i>
          </div>
        </div>
      </div>
      <!-- 费用 -->
      <div class="shop_cart_cost">
        <div class="shop_cart_pay">
          <span>￥{{getAllCartCost}}</span>
        </div>
        <div class="shop_cart_distribution">
          <span>另需配送费￥{{info.deliveryPrice}}元</span>
        </div>
      </div>
      <!-- 起送 -->
      <div class="shop_start_send" :class="{shop_jiesuan: getAllCartCost&&getAllCartCost-info.minPrice>=0}">
        <span v-show="!getAllCartCost">￥{{info.minPrice}}元起送</span>
        <span v-show="getAllCartCost&&getAllCartCost-info.minPrice<0">还差￥{{Math.abs(getAllCartCost-info.minPrice)}}元起送</span>
        <span v-show="getAllCartCost&&getAllCartCost-info.minPrice>=0">结算</span>
      </div>
    </div>
    <transition name="cart">
      <div class="shop_all_cart" v-show="showBg">
        <div class="shop_cart_header">
          <span>购物车</span>
          <span @click="handleCleanAll">清空</span>
        </div>
        <div class="shop_cart_content">
          <ul class="shop_cart_list">
            <li class="shop_cart_item" v-for="(foodShop,index) in cartShop" :key="index">
              <span>{{foodShop.name}}</span>
              <div class="cart_item_price">
                <span>¥{{foodShop.price}}</span>
              </div>
              <div class="cart_item_contorl">
                <CartContorl :foodShop="foodShop" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- 背景 -->
    <div class="shop_cart_bg" v-show="showBg" @click="handleCloseBg"></div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import CartContorl from '../../components/CartContorl/CartContorl'
import { Dialog } from 'vant';
export default {
  data() {
    return {
      showBg: false
    }
  },
  mounted() {
  },
  methods: {
    handleShowCart() {
      if (!this.getAllCartNum) return
      this.showBg = !this.showBg
    },
    handleCloseBg() {
      this.showBg = false
    },
    // 清空
    handleCleanAll() {
      Dialog.confirm({
        title: '确认清空购物车吗',
        message: '弹窗内容'
      })
        .then(() => {
          this.$store.commit("del_allshopfood")
          this.showBg = false
        })
        .catch(() => {
          console.log(1);
        });
    }
  },
  computed: {
    ...mapState({
      cartShop: state => state.shopModules.cartShop,
      info: state => state.shopModules.shopData.info
    }),
    ...mapGetters(['getAllCartNum', 'getAllCartCost', 'getMinPrice'])
  },
  components: {
    CartContorl
  }
}
</script>

<style lang="less" scoped>
.shop_all_cart {
  position: absolute;
  bottom: 100px;
  left: 0;
  z-index: 25;
  width: 100%;
  transform: translateY(0);
  background: #fff;

  &.cart-enter-active,
  &.cart-leave-active {
    transition: transform 1s;
  }
  &.cart-enter,
  &.cart-leave-to {
    transform: translateY(100%);
  }
  .shop_cart_header {
    display: flex;
    justify-content: space-between;
    line-height: 90px;
    padding: 0 30px;
    background: #f3f5f7;
    font-size: 28px;
    & :nth-child(2) {
      color: var(--themeColor);
    }
  }
  .shop_cart_content {
    padding: 20px;
    .shop_cart_list {
      max-height: 550px;
      overflow: auto;
      .shop_cart_item {
        position: relative;
        padding: 40px;
        font-size: 28px;
        .cart_item_price {
          position: absolute;
          right: 200px;
          bottom: 39px;
        }
        .cart_item_contorl {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
.shop_cart_wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #141d27;
  .shop_cart_icon {
    position: relative;
    z-index: 25;
    .shop_icon_out {
      position: absolute;
      left: 50px;
      top: -20px;
      z-index: 25;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background-color: #141d27;

      .shop_cart_num {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 25;
        width: 50px;
        line-height: 36px;
        text-align: center;
        border-radius: 20px;
        background-color: #f01414;
        color: #fff;
      }
      .shop_icon_inner {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background-color: #2b343c;
        &.shop_cart {
          background-color: var(--themeColor);
        }
        .icon-gouwuche-copy {
          color: #80858a;
          font-size: 50px;
          &.icon-gouwuche-show {
            color: #fff;
          }
        }
      }
    }
  }
  .shop_cart_cost {
    position: relative;
    z-index: 25;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    margin-left: 180px;
    padding: 10px 0;
    .shop_cart_pay {
      font-size: 36px;
      font-weight: 700;
      color: #fff;
    }
    .shop_cart_distribution {
      color: #80858a;
    }
  }
  .shop_start_send {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 25;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 100%;
    background-color: #2b333b;
    color: #fff;
    font-size: 28px;
    font-weight: 700;
    &.shop_jiesuan {
      background-color: var(--themeColor);
    }
  }
}
.shop_cart_bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(20px);
  // background-color: #141d27;
  // opacity: 0.2;
}
</style>
