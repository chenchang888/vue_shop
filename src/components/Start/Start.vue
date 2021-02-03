<template>
  <div class="start_img">
    <div class="start_img" v-for="(startItem, index) in starts" :key="index" :class="startItem"></div>
  </div>
</template>
 
<script>
export default {
  props: {
    rating: {
      type: Number,
      require: true,
      default: 0
    }
  },
  computed: {
    starts() {
      const startsNum = []
      const score = Math.floor(this.rating)
      //   全星
      for (let index = 0; index < score; index++) {
        startsNum.push('all_start')
      }
      //   半星
      if (this.rating - score > 0) {
        startsNum.push('harf_start')
      }
      //   没星
      const noStart = Math.floor(5 - this.rating)
      if (noStart > 0) {
        for (let index = 0; index < noStart; index++) {
          startsNum.push('no_start')
        }
      }
      return startsNum
    }
  }
}
</script>
<style lang="less" scoped>
.start_img {
  .start_img {
    width: 24px;
    height: 24px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: 24px;
  }
  .all_start {
    background-image: url(../../assets/images/starts/star24_on@2x.png);
  }
  .harf_start {
    background-image: url(../../assets/images/starts/star24_half@2x.png);
  }
  .no_start {
    background-image: url(../../assets/images/starts/star24_off@2x.png);
  }
}
</style>
