// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import store from './vuex/store'

import './styles/styles.css'
Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.use(VueLazyload, {
  error: require('./assets/404.png'),
  loading: require('./assets/loading-spin.svg'),
  attempt: 1,
  filter: {
    customer: function ({ el, src }) {
      // console.log(el)
      if (src && el.getAttribute('fit')) {
        let w = window
        let d = document
        let e = d.documentElement
        let g = d.getElementsByTagName('body')[0]
        let x = w.innerWidth || e.clientWidth || g.clientWidth
        if (x > 800) {
          x = 800
        } else {
          x = (Math.floor(x / 100)) * 100 + 100
        }
        return src + `_${x}x${x}.jpg`
      }
      return src
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
