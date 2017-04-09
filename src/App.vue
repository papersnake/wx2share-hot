<template>
  <div id="app">
  <mu-appbar title="优券">
    <mu-icon-button icon='menu' slot="left" @click="toggle(true)"/>
    <mu-text-field icon="search" v-model="searchkey" slot="right" class="appbar-search-field" hintText="请输入搜索内容" @change="search"/>
  </mu-appbar>
  <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-list>
        <mu-list-item title="首页" href="/hot" />
        <mu-list-item title="分类列表" toggleNested :open="false" v-if="categoryList">
          <mu-list-item v-for="cate, index in categoryList"
            :key="index"
            :title="cate.itemcats"
            :href="'/hot/cate/' + encodeURIComponent(cate.itemcats)"
            slot="nested"/>
        </mu-list-item>
        <mu-list-item title="Menu Item 3"/>
        <mu-list-item v-if="docked" @click.native="open = false" title="Close"/>
      </mu-list>
  </mu-drawer>
  <div class="maincontent">
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
import Api from '@/services/api'
export default {
  name: 'app',
  mounted () {
    this.fetchCategoryList()
  },
  data () {
    return {
      open: true,
      docked: true,
      categoryList: null,
      searchkey: ''
    }
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    },
    search () {
      // this.gosearch()
      console.log(this.searchkey)
      this.$router.push({name: 'search', params: {searchKey: this.searchkey}})
    },
    fetchCategoryList () {
      Api.fetchCategoryList().then((response) => {
        this.categoryList = response.data.cates
        console.log(response)
      })
    }
  }
}
</script>

<style lang="less">
.mu-appbar{
	position: fixed;
	top:0;
	background-color: #fe4a65;
}
.mu-appbar-title{
    font-family: Simhei;
}
.appbar-search-field{
  color: #FFF;
  margin-bottom: 0;
  width: 100%;
  &.focus-state {
    color: #FFF;
  }
  .mu-text-field-hint {
    color: fade(#FFF, 54%);
  }
  .mu-text-field-input {
    color: #FFF;
  }
  .mu-text-field-focus-line {
    background-color: #FFF;
  }
}
.maincontent{
	margin-top: 56px;
  overflow: hidden;
  max-width: 800px;
  margin-left : auto;
  margin-right: auto;
}
</style>
