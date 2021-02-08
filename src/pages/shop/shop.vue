<template>
  <div>
    <ShopHeader />
    <div class="content_container">
      <div class="nav_wrap">
        <keep-alive>
          <router-link class="item_nav" :class="$route.path==='/shop/goods'?'current':''" to="/shop/goods" replace>点餐</router-link>
        </keep-alive>
        <keep-alive>
          <router-link class="item_nav" :class="$route.path==='/shop/evaluate'?'current':''" to="/shop/evaluate" replace>评价</router-link>
        </keep-alive>
        <keep-alive>
          <router-link class="item_nav" :class="$route.path==='/shop/business'?'current':''" to="/shop/business" replace>商家</router-link>
        </keep-alive>
      </div>
      <div class="content_main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader'
import { mapState } from 'vuex'
import { GET_SHOPDATA, SAVE_CARTSHOP } from '../../store/mutations_types'
export default {
  data() {
    return {

    }
  },
  components: {
    ShopHeader
  },
  mounted() {
    this.$store.dispatch('getShopData')
    if (sessionStorage.getItem('shopData')) {
      let shopData = JSON.parse(sessionStorage.getItem('shopData'))
      this.$store.commit(GET_SHOPDATA, shopData)

      const cartShop = shopData.goods.reduce((accumulator, currentValue) => {
        accumulator.push(...currentValue.foods.filter(food => food.count))
        return accumulator
      },[])
      console.log(cartShop);
      this.$store.commit(SAVE_CARTSHOP, cartShop)
    }
    window.addEventListener('unload', () => {
      sessionStorage.setItem('shopData', JSON.stringify(this.shopData))
    })
  },
  computed: {
    ...mapState({
      shopData: state => state.shopModules.shopData
    })
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
