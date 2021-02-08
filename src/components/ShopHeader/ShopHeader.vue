<template>
  <div class="shop_container" v-if="shopInfo">
    <!-- 头部 -->
    <div class="header_wrap">
      <div class="bg_img" :style="{backgroundImage:`url(${shopInfo.bgImg===undefined?'':shopInfo.bgImg})`}">
        <div class="header_avatar" @click="handleShowInfo">
          <img :src="shopInfo.avatar" alt="">
        </div>
      </div>
      <div class="shop_info">
        <div class="shop_title" @click="handleShowInfo">
          <div class="shop_brand">
            <span>品牌</span>
          </div>
          <div class="shop_name">
            <span>{{shopInfo.name}}</span>
          </div>
          <div class="shop_icon">
            <i class="iconfont icon-xiangyou"></i>
          </div>
        </div>
        <div class="shop_mes" @click="handleShowInfo">
          <span>{{shopInfo.score}}</span>
          <span>月售{{shopInfo.sellCount}}单</span>
          <span>{{shopInfo.description}}</span>
          <span>约{{shopInfo.deliveryTime}}分钟</span>
          <span>距离{{shopInfo.distance}}</span>
        </div>
        <div class="shop_discount" @click="handleShowDiscount">
          <span>{{shopInfo.supports[0].name}}</span>
          <span>{{shopInfo.supports[0].content}}</span>
          <span>{{shopInfo.supports.length}}个优惠</span>
          <span>
            <i class="iconfont icon-xiangxia1"></i>
          </span>
        </div>
      </div>
    </div>
    <transition name="info">
      <div class="info_wrap" v-show="showInfo">
        <div class="info">
          <!-- 标题 -->
          <div class="info_title">
            <div class="info_pinpai">
              <span>品牌</span>
            </div>
            <div class="info_name">
              <span>{{shopInfo.name}}</span>
            </div>
          </div>
          <!--  -->
          <div class="shop_mes_wrap">
            <div class="shop_mes_item">
              <span class="shop_item_top">{{shopInfo.score}}</span>
              <span class="shop_item_bottom">评分</span>
            </div>
            <div class="shop_mes_item">
              <span class="shop_item_top">{{shopInfo.sellCount}}</span>
              <span class="shop_item_bottom">月售</span>
            </div>
            <div class="shop_mes_item">
              <span class="shop_item_top">{{shopInfo.description}}</span>
              <span class="shop_item_bottom">约{{shopInfo.deliveryTime}}分钟</span>
            </div>
            <div class="shop_mes_item">
              <span class="shop_item_top">{{shopInfo.deliveryPrice}}元</span>
              <span class="shop_item_bottom">配送费用</span>
            </div>
            <div class="shop_mes_item">
              <span class="shop_item_top">{{shopInfo.distance}}</span>
              <span class="shop_item_bottom">距离</span>
            </div>
          </div>
          <!--  -->
          <div class="shop_topic">
            <div class="shop_line_left"></div>
            <div class="shop_topic_text">
              <span>公告</span>
            </div>
            <div class="shop_line_right"></div>
          </div>
          <!--  -->
          <div class="shop_content">
            <span>{{shopInfo.bulletin}}</span>
          </div>
          <div class="info_close" @click="handleInfoClose">
            <div class="info_close_line_one"></div>
            <div class="info_close_line_two"></div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="discount">
      <div class="discount_bg" v-show="showDiscount">
        <div class="discount_wrap">
          <div class="discount_big_title">
            <span>优惠活动</span>
          </div>
          <ul class="discount_list">
            <li class="discount_item" v-for="(discount, index) in shopInfo.supports" :key="index">
              <span class="discount_left" :class="showClassify[discount.type]">{{discount.name}}</span>
              <span class="discount_right">{{discount.content}}</span>
            </li>
          </ul>
          <div class="discount_close_wrap" @click="handleCloseDiscount">
            <div class="discount_close close_left"></div>
            <div class="discount_close close_right"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showClassify: ['showGreen', 'showRed', 'showOrange'],
      showInfo: false,//商家信息
      showDiscount: false//商家优惠
    }
  },
  created() {
    this.$store.dispatch('getShopData')
  },
  mounted() {

  },
  methods: {
    handleShowInfo() {
      this.showInfo = true
    },
    handleShowDiscount() {
      this.showDiscount = true
    },
    handleInfoClose() {
      this.showInfo = false
    },
    handleCloseDiscount(){
      this.showDiscount = false
    }
  },
  computed: {
    ...mapState({
      shopInfo: state => state.shopModules.shopData.info
    })
  }
}
</script>

<style lang="less" scoped>
.shop_container {
  width: 100%;
  height: 100%;
}
.header_wrap {
  font-size: 16px;
  .bg_img {
    position: relative;
    height: 100px;
    background-repeat: no-repeat;
    background-size: cover;
    .header_avatar {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -20%);
      img {
        width: 130px;
        height: 130px;
      }
    }
  }
  .shop_info {
    margin-top: 65px;
    .shop_title {
      display: flex;
      justify-content: center;
      align-items: center;
      .shop_brand {
        padding: 5px 10px;
        background-color: var(--themeColor);
        color: #fff;
      }
      .shop_name {
        margin-left: 20px;
        text-align: center;
        font-size: 36px;
        font-weight: 700;
      }
      .shop_icon {
        .icon-xiangyou {
          font-size: 50px;
        }
      }
    }
    .shop_mes {
      text-align: center;
      margin: 10px 0;
      span {
        padding: 0 5px;
      }
    }
    .shop_discount {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 80%;
      margin: 0 auto;
      text-align: center;
      border: 1px solid #e6e6e6;
      color: #999;
      span:nth-child(1) {
        display: inline-block;
        padding: 1px;
        text-align: center;
        line-height: 30px;
        background-color: var(--themeColor);
        color: #fff;
      }
      span:nth-child(2) {
        width: 65%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
.info_wrap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .info {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90%;
    padding: 50px;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    font-size: 26px;
    background-color: #fff;
    .info_title {
      display: flex;
      justify-content: center;
      .info_pinpai {
        background-color: var(--themeColor);
        color: #fff;
        text-align: center;
        line-height: 40px;
        padding: 2px 15px;
        font-size: 16px;
      }
      .info_name {
        padding: 0 20px;
        font-size: 40px;
        font-weight: 700;
      }
    }
    .shop_mes_wrap {
      display: flex;
      justify-content: space-around;
      margin: 30px 0;
      .shop_mes_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .shop_item_top {
          margin-bottom: 15px;
          font-weight: 700;
        }
        .shop_item_bottom {
          color: #999;
        }
      }
    }
    .shop_topic {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 30px;
      .shop_line_left,
      .shop_line_right {
        width: 10%;
        height: 2px;
      }
      .shop_line_left {
        background: linear-gradient(-90deg, #333, #fff);
      }
      .shop_line_right {
        background: linear-gradient(-90deg, #fff, #333);
      }
      .shop_topic_text {
        padding: 0 10px;
        color: #999;
      }
    }
    .shop_content {
      line-height: 40px;
      margin: 0 auto;
      font-size: 16px;
      color: #333;
    }
    .info_close {
      position: fixed;
      left: 50%;
      bottom: -35%;
      width: 60px;
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid #fff;
      background-color: rgba(0, 0, 0, 0);
      .info_close_line_one,
      .info_close_line_two {
        width: 60px;
        height: 2px;
        background-color: #fff;
      }
      .info_close_line_one {
        transform: rotate(45deg);
      }
      .info_close_line_two {
        transform: rotate(315deg);
      }
    }
  }
}
.info-enter-active,
.info-leave-active {
  transition: opacity 0.5s;
}
.info-enter,
.info-leave-to {
  opacity: 0;
}

.discount_bg {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  .discount_wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 40px;
    background: #fff;
    .discount_close {
      position: absolute;
      top: 40px;
      right: 30px;
      width: 50px;
      height: 5px;
      border-radius: 20px;
      background-color: #666;
    }
    .close_left {
      transform: rotate(45deg);
    }
    .close_right {
      transform: rotate(-45deg);
    }
    .discount_big_title {
      padding: 20px;
      text-align: center;
      font-size: 40px;
      font-weight: 700;
    }
    .discount_list {
      height: 240px;
      overflow: auto;
      font-size: 18px;
      .discount_item {
        margin: 30px;
        span {
          padding: 5px 10px;
        }
        .discount_left {
          margin-right: 30px;
          color: #fff;
        }
      }
      .showGreen {
        background-color: var(--themeColor);
      }
      .showRed {
        background: #f07373;
      }
      .showOrange {
        background: #f1884f;
      }
    }
  }
}
.discount-enter-active,
.discount-leave-active {
  transition: opacity 0.5s;
}
.discount-enter,
.discount-leave-to {
  opacity: 0;
}
</style>
