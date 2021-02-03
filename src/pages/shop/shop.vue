<template>
  <div>
    <ShopHeader />
    <div class="content_container">
      <div class="nav_wrap">
        <router-link class="item_nav" :class="$route.path==='/shop/goods'?'current':''" to="/shop/goods">点餐</router-link>
        <router-link class="item_nav" :class="$route.path==='/shop/evaluate'?'current':''" to="/shop/evaluate">评价</router-link>
        <router-link class="item_nav" :class="$route.path==='/shop/business'?'current':''" to="/shop/business">商家</router-link>
      </div>
      <div class="content_main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader'
export default {
  components: {
    ShopHeader
  },
  mounted() {
    this.$store.dispatch('getShopInfo')
  }
}
</script>

<style lang="less" scoped>
.content_container {
  margin-top: 20px;
  font-size: 16px;
  .nav_wrap {
    display: flex;
    line-height: 70px;
    border-bottom: 1px solid #f9f9f9;
    .item_nav {
      position: relative;
      flex: 1;
      text-align: center;
      font-size: 30px;
      color: #999;
      &.current {
        color: var(--themeColor);
      }
      &.current:after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 80px;
        height: 5px;
        background-color: var(--themeColor);
        transform: scaleY(0.5);
        transform: translateX(-50%);
      }
    }
  }
}
</style>
