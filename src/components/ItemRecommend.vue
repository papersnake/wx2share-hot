<template>
  <div class="itemdetail itemcategory">
    <div class="detail-header">
      <span class="title">同类商品推荐{{category}}</span>
    </div>
    <div class="category-content" v-if="recommendList">
      <ProductGrid :items="recommendList" id="hotGrid" ref="hotsGrid"></ProductGrid>
    </div>
  </div>
</template>
<script>
import Api from '@/services/api.js'
import ProductGrid from '@/components/ProductGrid'
export default {
  props: {
    category: {
      type: String
    }
  },
  mounted () {
    this.getRecommend()
  },
  data () {
    return {
      recommendList: null,
      loadState: false
    }
  },
  components: {
    ProductGrid
  },
  methods: {
    getRecommend () {
      if (this.category !== null) {
        const param = {
          page: 0,
          cats: this.category,
          order: null,
          sortby: null,
          rows: 6
        }
        Api.fetchItemList(param).then((response) => {
          console.log(response)
          let json = response.data
          if (json.success) {
            // return commit('FETCH_ITEM_LIST_SUCCESS', json.items)
            this.recommendList = json.items
          }
          // return Promise.reject(new Error(json.message))
        }).catch((error) => {
          console.log(error)
          return Promise.reject(error)
        })
      } else {
        console.log('category is null')
      }
    }
  }
}
</script>
<style>

</style>
