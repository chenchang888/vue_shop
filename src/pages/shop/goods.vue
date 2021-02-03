<template>
  <div class="goods_wrap">
    <div ref="left" class="left">
      <ul class="item_nav">
        <li v-for="(itemNav,index) in shopNav" :key="index" :class="index===current?'active':''" @click="handleShopNav(index)">{{itemNav.name}}</li>
      </ul>
    </div>
    <div ref="right" class="right">
      <ul class="foods_wrap">
        <li class="food_list" v-for="(itemNav,index) in shopNav" :key="index">
          <div class="nav_name">{{itemNav.name}}</div>
          <div class="foods_message" v-for="(itemShop,i) in itemNav.foods" :key="i">
            <div class="foods_img">
              <img :src="itemShop.image" alt="">
            </div>
            <div class="food_mes_right">
              <div class="food_mes_name">{{itemShop.name}}</div>
              <div class="food_mes_description">{{itemShop.description}}</div>
              <div class="food_praise">
                <span class="food_sellCount">月售{{itemShop.sellCount}}</span>
                <span class="food_rating">好评率{{itemShop.rating}}%</span>
              </div>
              <div class="food_price">¥{{itemShop.price}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      current: 0
    }
  },
  mounted() {
    this.$store.dispatch('getShopNav', () => {
      this.$nextTick(() => {
        this._loadLeftScroll();
        this._loadRightScroll();
      })
    })
  },
  methods: {
    _loadLeftScroll() {
      new BScroll(this.$refs.left, {
        scrollY: true,
        click: true
      })
    },
    _loadRightScroll() {
      new BScroll(this.$refs.right, {
        scrollY: true,
        click: true
      })
    },
    handleShopNav(index) {
      this.current = index
    }
  },
  computed: {
    ...mapState({
      shopNav: state => state.shopNav
    })
  }
}
</script>

<style lang="less" scoped>
.goods_wrap {
  display: flex;
  height: calc(100vh - 397px);
  overflow: hidden;
  .left {
    box-sizing: border-box;
    background-color: #f3f5f7;
    .item_nav {
      li {
        width: 150px;
        line-height: 105px;
        text-align: center;
        border-bottom: 1px solid #e9e9e9;
        background-color: #f3f5f7;
        &.active {
          background-color: #fff;
        }
      }
    }
  }
  .right {
    width: 580px;
    .foods_wrap {
      .food_list {
        .nav_name {
          width: 100%;
          padding: 10px 20px;
          background-color: #f3f5f7;
          color: #666;
        }
        .foods_message {
          display: flex;
          padding: 30px;
          border-bottom: 0.5px solid #999;
          background-color: #fff;
          &:after{
            content: '';
          }
          .foods_img {
            margin-right: 20px;
            img {
              width: 110px;
              height: 110px;
            }
          }
          .food_mes_right {
            line-height: 42px;
            .food_mes_name {
            }
            .food_mes_description {
              color: #999;
            }
            .food_praise {
              .food_sellCount,
              .food_rating {
                margin-right: 30px;
                color: #999;
              }
            }
            .food_price {
              font-size: 28px;
              color: #f01414;
            }
          }
        }
      }
    }
  }
}
</style>
