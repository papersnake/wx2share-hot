<template>
<swipe class="item-swipe" :style="{height: imgHeight + 'px'}">
  <swipe-item v-for="img, index in imglist" :key="index" class="slide1">
      <img v-lazy="img" class="itemimg" fit="true">
  </swipe-item>
</swipe>
</template>
<script>
import { Swipe, SwipeItem } from 'vue-swipe'
export default {
  props: {
    source: [String, Array],
    required: true
  },
  computed: {
    imglist: function () {
      if (this.source instanceof Array) {
        return this.source
      } else {
        return [this.source]
      }
    },
    imgHeight: function () {
      let w = window
      let d = document
      let e = d.documentElement
      let g = d.getElementsByTagName('body')[0]
      let x = w.innerWidth || e.clientWidth || g.clientWidth
      return x
    }
  },
  components: {
    'swipe': Swipe,
    'swipe-item': SwipeItem
  }
}
</script>
<style scoped>
.item-swipe {
  height: 200px;
  color: #000;
  font-size: 30px;
  text-align: center;
  background: #fff;
  max-height: 800px;
}

.itemimg {
  width: 100%;
}

.slide1 {
  background-color: #e2e2e2;
  color: #222;
}
</style>
