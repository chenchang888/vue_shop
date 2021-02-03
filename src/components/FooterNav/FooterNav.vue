<template>
  <div class="footer_wrap">
    <div :class="{active:$route.path==='/home', item:true}" @click="handle('/home')">
      <span>
        <i class="iconfont icon-zhuye"></i>
      </span>
      <span>首页</span>
    </div>
    <div :class="{active:$route.path==='/search', item:true}" @click="handle('/search')">
      <span>
        <i class="iconfont icon-biaoqiankuozhan_sousuo-354"></i>
      </span>
      <span>搜索</span>
    </div>
    <div :class="{active:$route.path==='/order', item:true}" @click="handle('/order')">
      <span>
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </div>
    <div :class="{active:$route.path==='/center', item:true}" @click="handle('/center')">
      <span>
        <i class="iconfont icon-biaoqiankuozhan_wode-175"></i>
      </span>
      <span>我的</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handle(path) {
      if (this.$route.path === path) {
        return
      }
      this.$router.push(path)
    }
  },
}
</script>

<style lang="less" scoped>
.footer_wrap {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  background: #fff;

  .item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    &.active {
      color: var(--themeColor);
    }
  }
}
</style>
