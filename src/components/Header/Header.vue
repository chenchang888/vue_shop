<template>
  <!--首页头部-->
  <header class="msite_header">
    <slot name="left"></slot>
    <span class="header_title">
      <span class="header_title_text ellipsis">{{titles}}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  props: {
    titles: {
      title: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.msite_header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 20px;
  color: #fff;
  background: var(--themeColor);
  .header_title {
    font-size: 36px;
  }
}
</style>
