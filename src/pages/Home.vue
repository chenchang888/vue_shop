<template>
  <div class="container">
    <Header class="header_wrap" :titles="address||'定位中...'">
      <span class="header_icon" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right" @click="goLogin">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!-- 轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" loop indicator-color="#02a774">
      <van-swipe-item v-for="(shopsItem, index) in swiperShops02" :key="index">
        <div class="swiper_list">
          <div class="swiper_item" v-for="(item, index) in shopsItem" :key="index">
            <div class="swiper_img">
              <img :src="'https://fuss10.elemecdn.com/'+item.image_url+''" alt="">
            </div>
            <div>
              <span>{{item.title}}</span>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <Shops />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import chunk from 'lodash/chunk'
import Shops from '../components/shops/Shops'
export default {
  components: {
    Shops
  },
  mounted() {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getSwiperShops')
    this.$store.dispatch('getBusinessList')
  },
  computed: {
    ...mapState(['address', 'swiperShops', 'businessList']),
    swiperShops02() {
      return chunk(this.swiperShops, 8)
    }
  },
  methods: {
    goLogin() {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  font-size: 16px;
}
.header_wrap {
  display: flex;
  justify-content: space-between !important;
  .header_login {
    font-size: 30px;
  }
  .header_icon {
    display: flex;
    align-items: center;
    .iconfont {
      font-size: 36px;
    }
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 24px;
  height: 400px;
  text-align: center;
}
.swiper_list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: 40px 20px;
  .swiper_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 100px;
    padding: 30px;
    color: #333;
    .swiper_img {
      padding: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
