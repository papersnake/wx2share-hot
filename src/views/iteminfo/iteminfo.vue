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
    <section class="action-container">
      <div class="action-bar mui-flex align-center">
        <div class="tohome cell">
          首页
          <router-link :to="{name: 'Home'}"></router-link>
        </div>
        <div class="grade cell">
          收藏
        </div>
        <div class="share cell">
          分享
        </div>
        <button class="totop cell" @click="gotoTop">回到顶部</button>
        <button class="buy cell" @click="showDialog">立即购买</button>
      </div>
    </section>
  </div>
  <loading v-if="loading"></loading>
  <mu-dialog :open="dialog" @show="show" title="复制淘口令购买" v-if="item">
    <TpwdView :item="item" ref="tpwdview"></TpwdView>
    <mu-flat-button label="确定" slot="actions" primary @click="close"/>
  </mu-dialog>
</div>

</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import loading from '@/components/loading'
import ImgSlider from '@/components/ItemSlider'
import priceTag from '@/components/priceTag'
import priceComputed from '@/common/priceComputed'
import itemDetail from '@/components/ItemDetail'
import itemRecommend from '@/components/ItemRecommend'
import TpwdView from '@/components/TpwdView'
export default {
  data () {
    return {
      dialog: false,
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
    gotoTop () {
      window.scrollTo(0, 0)
    },
    handleChange (val) {
      this.bottomNav = val
    },
    reloadData () {
      this.fetchItemById(this.$route.params.id)
      window.scrollTo(0, 0)
    },
    showDialog () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    show () {
      console.log('this show')
      this.$refs.tpwdview.getTpwd()
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
    itemRecommend,
    TpwdView
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
</style>
