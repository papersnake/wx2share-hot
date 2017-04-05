<template>
	<div class="home">
		<swipe class="my-swipe">
			<swipe-item class="slide1"></swipe-item>
    		<swipe-item class="slide2"></swipe-item>
    		<swipe-item class="slide3"></swipe-item>
		</swipe>
    <div>
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" title="最热"/>
        <mu-tab value="tab2" title="新品"/>
        <mu-tab value="tab3" @active="handleActive" title="销量"/>
        <mu-tab value="tab4" title="推荐"/>
      </mu-tabs>
      <div class="infinite-container">
        <div v-if="activeTab === 'tab1'">
          <ProductGrid :items="itemList" id="hotGrid" ref="hotsGrid"></ProductGrid>
          <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
        </div>

        <div v-if="activeTab === 'tab2'">
          <h2>Tab Two</h2>
          <p>
            这是第二个 tab
          </p>
        </div>
        <div v-if="activeTab === 'tab3'">
          <h2>Tab Three</h2>
          <p>
            这是第三个 tab
          </p>
      </div>
      </div>
    </div>
	</div>
</template>
<script>
require('vue-swipe/dist/vue-swipe.css')
import { Swipe, SwipeItem } from 'vue-swipe'
// import Vue from 'vue'
import { mapGetters } from 'vuex'
import ProductGrid from '@/components/ProductGrid'
export default {
  name: 'home',
  data () {
    return {
      activeTab: 'tab1',
      scroller: null,
      // loading: false,
      page: 0
    }
  },
  created () {
    // this.getItemList()
  },
  mounted () {
    // console.log(document.getElementById('hotGrid'))
    // console.log(this.$refs.hotsGrid.$el.scrollHeight)
    // console.log(this.$refs.hotsGrid.$el.scrollTop)
    // this.scroller = this.$refs.hotsGrid.$el
    this.scroller = window
    this.getItemList()
  },
  computed: {
    ...mapGetters({
      itemList: 'getItemList',
      loading: 'getloadState'
    })
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    handleActive () {
      window.alert('tab active')
    },
    getItemList () {
      console.log('getItemList')
      let postparam = {
        page: this.page,
        cats: null,
        searchkey: null,
        order: null,
        sortby: null,
        rows: 10
      }
      this.$store.dispatch('fetchItemList', postparam)
    },
    loadMore () {
      // this.loading = true
      this.page++
      this.getItemList()
      // console.log(this.$refs.hotsGrid.$el.scrollHeight)
      // console.log(this.$refs.hotsGrid.$el.scrollTop)
      // this.loading = false
    }
  },
  components: {
    'swipe': Swipe,
    'swipe-item': SwipeItem,
    ProductGrid
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
  background: #fff;
  margin-bottom: .5rem;
}

.slide1 {
  background-color: #0089dc;
  color: #fff;
}

.slide2 {
  background-color: #ffd705;
  color: #000;
}

.slide3 {
  background-color: #ff2d4b;
  color: #fff;
}
.mu-tabs{
  background-color: #fff;
  color: #ff8600;
}
.mu-tab-link{
  color: #ff8600;
  font-size: 1.5rem;
}
</style>
