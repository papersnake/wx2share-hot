<template>
    <div class="categorylist">
        <div class="header">
          <filterNav :value="filters" @change="handleChange"></filterNav>
        </div>
        <div class="content" v-if="itemList">
          <ProductGrid :items="itemList" id="hotGrid" ref="hotsGrid"></ProductGrid>
          <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
        </div>
    </div>
</template>
<script>
import Api from '@/services/api.js'
import filterNav from '@/components/ListFilter'
import ProductGrid from '@/components/ProductGrid'
export default {
  data () {
    return {
      value: '',
      page: 0,
      scroller: null,
      loading: false,
      loadfinshed: false,
      itemList: [],
      searchKey: null,
      filters: 'id'
    }
  },
  mounted () {
    this.scroller = window
    this.getCateName()
    this.getCategoryItemList()
    this.searchKey = this.$route.params.searchKey
    console.log(this.searchKey)
  },
  methods: {
    handleChange (val) {
      this.filters = val
      console.log('change')
      this.reload()
    },
    getCateName () {
      this.value = this.$route.params.catename
    },
    reload () {
      this.page = 0
      this.itemList = []
      this.getCategoryItemList()
    },
    loadMore () {
      if (!this.loadfinshed) {
        this.page++
        console.log(this.page)
        this.getCategoryItemList()
      }
    },
    getCategoryItemList () {
      console.log(this.searchKey)
      this.loading = true
      if (this.value !== null) {
        const param = {
          page: this.page,
          cats: this.value,
          order: this.filters,
          searchkey: this.$route.params.searchKey,
          sortby: 'desc',
          rows: 10
        }
        Api.fetchItemList(param).then((response) => {
          console.log(response)
          let json = response.data
          if (json.success) {
            // return commit('FETCH_ITEM_LIST_SUCCESS', json.items)
            if (json.items.length < this.rows) {
              this.loadfinshed = true
            }
            this.itemList = this.itemList.concat(json.items)
            this.loading = false
          }
          // return Promise.reject(new Error(json.message))
        }).catch((error) => {
          console.log(error)
          return Promise.reject(error)
        })
      } else {
        this.loading = false
        console.log('category is null')
      }
    }
  },
  watch: {
    $route () {
      this.value = this.$route.params.catename
      this.reload()
    }
  },
  components: {
    filterNav,
    ProductGrid
  }
}
</script>
<style>
.categorylist .content{
  margin-top: 48px;
}
</style>
