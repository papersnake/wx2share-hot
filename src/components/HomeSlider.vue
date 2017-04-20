<template>
<swipe class="home-swipe" :style="{height: swipeHeight + 'px'}" v-if="promos">
  <swipe-item v-for="promo, index in promos" :key="index" class="home-slide"
    :style="{backgroundImage: 'url('+promo.pic+')'}">
    <span @click="goto(promo)"></span>
  </swipe-item>
</swipe>
</template>
<script>
import { Swipe, SwipeItem } from 'vue-swipe'
import Api from '@/services/api'
export default {
  data () {
    return {
      promos: null
    }
  },
  created () {
    this.getPromo()
  },
  methods: {
    getPromo () {
      Api.getPromo().then((response) => {
        const { result } = response.data
        console.info(result)
        this.promos = result
      })
    },
    goto (promo) {
      if (promo.type === 'category') {
        console.log(promo.params.args)
        this.$router.push({name: 'clist', params: {catename: promo.params.args}})
      }
    }
  },
  computed: {
    swipeHeight: function () {
      let w = window
      let d = document
      let e = d.documentElement
      let g = d.getElementsByTagName('body')[0]
      let x = w.innerWidth || e.clientWidth || g.clientWidth
      return x * 0.40909090909090909090909090909091
    }
  },
  components: {
    'swipe': Swipe,
    'swipe-item': SwipeItem
  }
}
</script>
<style>
.mint-swipe.home-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
  background: #fff;
  margin-bottom: .5rem;
}
.home-swipe .home-slide {
  filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
  background-size:100% 100%;
}
.home-swipe .home-slide>span{
  display: block;
  width: 100%;
  height: 100%;
}


</style>
