<template>
  <div>
    <!-- 头部 -->
    <div class="header_wrap">
      <div class="bg_img" :style="{backgroundImage:`url(${shopInfo.bgImg})`}">
        <div class="header_avatar">
          <img :src="shopInfo.avatar" alt="">
        </div>
      </div>
      <div class="shop_info">
        <div class="shop_title">
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
        <div class="shop_mes">
          <span>{{shopInfo.score}}</span>
          <span>月售{{shopInfo.sellCount}}单</span>
          <span>{{shopInfo.description}}</span>
          <span>约{{shopInfo.deliveryTime}}分钟</span>
          <span>距离{{shopInfo.distance}}</span>
        </div>
        <div class="shop_discount">
          <span>{{shopInfo.supports[0].name}}</span>
          <span>{{shopInfo.supports[0].content}}</span>
          <span>{{shopInfo.supports.length}}个优惠</span>
          <span>
            <i class="iconfont icon-xiangxia1"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      shopInfo: state => state.shopInfo
    })
  }
}
</script>

<style lang="less" scoped>
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
</style>
