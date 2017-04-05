import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from '@/views/home/home'
import Item from '@/views/iteminfo/iteminfo'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
