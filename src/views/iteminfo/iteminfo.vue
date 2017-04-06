<template>
<div>
  <div class="warp">
    <div v-if="item" class="iteminfo">
      <ImgSlider :source="item.itempic" />
      <div class="pricetag">
        <priceTag :price="curprice" />
        <div class="sellerinfo">
          <div class="under-line">￥{{item.itemprice}}</div>
          <div>已抢{{item.itemsellcount}}件</div>
        </div>
        <div class="leftinfo">
          <div class="countinfo">优惠券共：{{item.couponamount}}张</div>
          <div class="countpencent">
            <mu-linear-progress mode="determinate" :size="10" :value="pencent" color="#ffeb3b"></mu-linear-progress>
            <div class="nlayer">已抢{{pencent}}%</div>
          </div>
        </div>
      </div>
      <div class="intro">
        <mu-float-button icon="share" secondary mini class="share-button"  @click="scrolltop"/>
        <h1>{{ item.itemname }}</h1>
        <div class="desc">
          {{ item.coupondeno + ',有效期：' + item.couponstarttime + '到' + item.couponendtime }}
        </div>
      </div>
      <itemDetail :itemid="item.itemid"/>
      <itemRecommend :category="item.itemcats"/>

    </div>
    <mu-paper class="bottombar">
    <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
      <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video" @click="scrolltop"/>
      <mu-bottom-nav-item value="music" title="Music" icon="music_note"/>
      <mu-bottom-nav-item value="books" title="Books" icon="books"/>
      <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo"/>
    </mu-bottom-nav>
  </mu-paper>
  </div>
  <loading v-if="loading"></loading>
</div>

</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import loading from '@/components/loading'
import ImgSlider from '@/components/ItemSlider'
import priceTag from '@/components/priceTag'
import priceComputed from '@/common/priceComputed'
import itemDetail from '@/components/ItemDetail'
import itemRecommend from '@/components/itemRecommend'
export default {
  data () {
    return {
      bottomNav: 'movies',
      bottomNavColor: 'movies'
    }
  },
  mounted () {
    // this.$store.dispatch('fetchItemById', this.$route.params.id)
    this.reloadData()
  },
  destroyed () {
    console.log('item destroyed')
    this.clearItem()
  },
  mixins: [priceComputed],
  methods: {
    ...mapActions([
      'fetchItemById',
      'clearItem'
    ]),
    scrolltop () {
      console.log('scrollto')
      window.scrollTo(0, 500)
    },
    handleChange (val) {
      this.bottomNav = val
    },
    reloadData () {
      this.fetchItemById(this.$route.params.id)
      window.scrollTo(0, 0)
    }
  },
  computed: {
    ...mapGetters({
      item: 'item',
      loading: 'getloadState'
    }),
    pencent: function () {
      return ((this.item.couponamount - this.item.couponamount) / this.item.couponamount) * 100
    }
  },
  components: {
    loading,
    ImgSlider,
    priceTag,
    itemDetail,
    itemRecommend
  },
  watch: {
    $route () {
      console.log(this.$route.params.id)
      this.reloadData()
    }
  }
}
</script>
<style scoped>
.iteminfo{

}
.warp{
  margin-bottom: 56px;
}
.intro{
  padding: 6px;
  background-color: #FFF;
  margin-bottom: 6px;
}
.intro .share-button {
  float: right;
}
.pricetag{
  display: flex;
  height: 4rem;
  background-color: #f44336;
  padding-left: 6px;
  padding-right: 6px;
}
.mainprice{
  display: inline-flex;
  height: 4rem;
  font-size: 2rem;
  color: #fff;
  line-height: 5rem;
}
.mainprice>span>span{
  font-size: 3.5rem;
}
.sellerinfo{
  display: inline-block;
  margin-top: 1rem;
  margin-left: 1rem;
  color: #fff;
}
.leftinfo{
  margin-top: 1rem;
  margin-left: auto;
  color: #ffeb3b;
}
.intro>h1{
  font-size: 1.5rem;
  line-height: 1.5rem;
  font-weight: 800;
  margin: 0;
}
.under-line{
  color: #e2e2e2;
  text-decoration: line-through;
}
.countinfo{
  margin-bottom: 0.2rem;
}
.mu-linear-progress {
  background-color: #f9a825;
}
.countpencent{
  position: relative;
}
.nlayer{
  position: absolute;
  color:#FF1100;
  width: 100%;
  top: 0;
  font-size: 6px;
  height: 10px;
  line-height: 10px;
  text-align: center;
}
.desc{
  color: red;
}
.bottombar{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
