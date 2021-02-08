<template>
  <!-- 商家列表 -->
  <div class="business_wrap">
    <div class="near_shop">附近商家</div>
    <div class="business_list">
      <div class="business_item" v-for="(shop,index) in shopList" :key="index" @click="handleShop(shop.id)">
        <div class="left">
          <div class="left_img">
            <img :src="'http://cangdu.org:8001/img/' +shop.image_path" alt="">
          </div>
          <div class="shop_mes_wrap">
            <div class="shop_title_wrap">
              <span class="shop_pinpai">品牌</span>
              <span class="shop_name">{{shop.name}}</span>
            </div>
            <div class="start_wrap">
              <Start :rating="shop.rating" />
              <!--  -->
              <span class="start_score">{{shop.rating}}</span>
              <span>月售{{shop.recent_order_num}}单</span>
            </div>
            <div class="require">
              <span>¥{{shop.float_minimum_order_amount}}起送</span>
              <span class="separate">/</span>
              <span>{{shop.piecewise_agent_fee.tips}}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="provide_mes">
            <span v-for="(support, index) in shop.supports" :key="index">{{support.icon_name}}</span>
          </div>
          <div class="distribution_mes">{{shop.delivery_mode.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Start from '../Start/Start'
export default {
  components: {
    Start
  },
  mounted() {
    this.$store.dispatch('getBusinessList')
  },
  methods: {
    handleShop() {
      this.$router.push('/shop')
    }
  },
  computed: {
    ...mapState({
      shopList: state => state.businessList
    })
  }
}
</script>

<style lang="less" scoped>
.business_wrap {
  margin: 30px 0 80 px;
  .near_shop {
    margin: 0 0 30px 20px;
    font-size: 30px;
    color: #999;
  }
  .business_list {
    .business_item {
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: 35px 10px;
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #e6e6e6;
        transform: scaleY(0.5);
      }
      .left {
        display: flex;
        .left_img {
          img {
            width: 140px;
            height: 140px;
          }
        }
        .shop_mes_wrap {
          margin-left: 20px;
          .shop_title_wrap {
            .shop_pinpai {
              padding: 5px;
              background-color: #ff9900;
              color: #fff;
            }
            .shop_name {
              margin-left: 10px;
              font-size: 30px;
              font-weight: 700;
            }
          }
          .start_wrap {
            display: flex;
            line-height: 85px;
            .start_score {
              margin: 0 10px;
            }
          }
          .require {
            display: flex;
            color: #666;
            .separate {
              margin: 0 10px;
            }
          }
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .provide_mes {
          display: flex;
          span {
            display: block;
            padding: 2px;
            margin-right: 5px;
            border: 1px solid #d6d6d6;
            color: #999;
          }
        }
        .distribution_mes {
          line-height: 30px;
          text-align: center;
          font-size: 12px;
          border: 1px solid var(--themeColor);
          color: var(--themeColor);
        }
      }
    }
  }
}
</style>
