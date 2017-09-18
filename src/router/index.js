import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from '@/views/home/home'
// import Item from '@/views/iteminfo/iteminfo'
// import CateList from '@/views/categorylist/categorylist'

const Item = resolve => require(['@/views/iteminfo/iteminfo'], resolve)
const CateList = resolve => require(['@/views/categorylist/categorylist'], resolve)
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/hot/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/item/:id',
      name: 'item',
      component: Item
    },
    {
      path: '/cate/:catename',
      name: 'clist',
      component: CateList
    },
    {
      path: '/search/:searchKey',
      name: 'search',
      component: CateList
    }
  ]
})
