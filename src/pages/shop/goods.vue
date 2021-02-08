<template>
  <div class="goods_wrap">
    <div class="left">
      <ul ref='leftLi' class="item_nav">
        <li v-for="(itemNav,index) in shopNav" :key="index" :class="index===current?'active':''" @click="handleShopNav(index)">{{itemNav.name}}</li>
      </ul>
    </div>
    <div class="right">
      <ul ref='rightLi' class="foods_wrap">
        <li class="food_list" v-for="(itemNav,index) in shopNav" :key="index">
          <div class="nav_name">{{itemNav.name}}</div>
          <!-- 商品信息 -->
          <div class="foods_message" v-for="(foodShop,index) in itemNav.foods" :key="index">
            <div class="foods_img">
              <img :src="foodShop.image" alt="">
            </div>
            <div class="food_mes_right">
              <div class="food_mes_name">{{foodShop.name}}</div>
              <div class="food_mes_description">{{foodShop.description}}</div>
              <div class="food_praise">
                <span class="food_sellCount">月售{{foodShop.sellCount}}</span>
                <span class="food_rating">好评率{{foodShop.rating}}%</span>
              </div>
              <div class="food_price">¥{{foodShop.price}}</div>
            </div>
            <CartContorl :foodShop='foodShop' />
          </div>
        </li>
      </ul>
    </div>
    <ShopCart/>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import { mapState } from 'vuex'
import ShopCart from '../../components/ShopCart/ShopCart'
import CartContorl from '../../components/CartContorl/CartContorl'

export default {
  data() {
    return {
      current: 0,
      rightTop: [0],//右侧每个li需要滑动的高度集,
      scrollY: '',//右侧滚动的高度
    }
  },
  components: {
    CartContorl,
    ShopCart
  },
  mounted() {
    this.$store.dispatch('getShopData', () => {
      this.$nextTick(() => {
        this._loadLeftScroll();
        this._loadRightScroll();
        this.getRightTop()
      })
    })
  },
  methods: {
    _loadLeftScroll() {
      new BScroll('.left', {
        scrollY: true,
        click: true
      })
    },
    _loadRightScroll() {
      this.rightScroll = new BScroll('.right', {
        scrollY: true,
        click: true,
        probeType: 3
      })
      // 滑动
      this.rightScroll.on('scroll', ({ x, y }) => {
        this.scrollY = y
        this.scrollX = x
      })
      // 滑动结束
      this.rightScroll.on('scrollEnd', () => {
        const index = this.rightTop.findIndex((item, index) => {
          return Math.abs(this.scrollY) <= item - 100 && Math.abs(this.scrollY) >= this.rightTop[index - 1] - 100
        })
        this.current = index - 1
      })
    },
    // 左侧商品选项
    handleShopNav(index) {
      this.current = index
      // 更新scrollY
      this.scrollY = this.rightTop[index]
      this.rightScroll.scrollTo(0, -this.rightTop[index], 1000)
    },
    // 获取右侧滚动点的高度
    getRightTop() {
      Array.from(this.$refs.rightLi.children).reduce((oldValue, liItem) => {
        oldValue += liItem.clientHeight
        this.rightTop.push(oldValue)
        return oldValue
      }, 0)
    },
  },
  computed: {
    ...mapState({
      shopNav: state => {
        return state.shopModules.shopData.goods
      }
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
    margin-bottom: 105px;
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
    margin-bottom: 105px;
    .foods_wrap {
      .food_list {
        .nav_name {
          width: 100%;
          padding: 10px 20px;
          background-color: #f3f5f7;
          color: #666;
        }
        .foods_message {
          position: relative;
          display: flex;
          padding: 30px;
          border-bottom: 0.5px solid #999;
          background-color: #fff;
          &:after {
            content: "";
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