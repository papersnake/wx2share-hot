<template>
  <div class="itemdetail">
    <div class="detail-header" @click="toggle">
      <span class="title">商品详情</span>
      <div class="left">
        <mu-icon-button icon="keyboard_arrow_down"/>
      </div>
    </div>
    <div class="detail-content" :class="{'hide': !open}">
      <div class="warp" v-if="details">
        <img v-lazy="img" class="detailimg" fit="true" v-for="img, index in details">
      </div>
    </div>
  </div>
</template>
<script>
import jsonp from 'jsonp'
export default {
  props: {
    itemid: {
      type: String
    }
  },
  data () {
    return {
      open: false,
      details: null
    }
  },
  created () {
    this.$Lazyload.$on('loaded', ({ el, src }) => {
      // console.log(el)
      // this.$emit('opened')
    })
  },
  updated () {
    console.log(document.body.clientHeight)
  },
  methods: {
    toggle () {
      this.open = !this.open
      this.$nextTick(function () {
        console.log(this.$el.offsetTop)
        console.log(document.body.clientHeight)
        window.scrollTo(0, 100)
        console.log('scrollTo postion')
      })
      this.loadDetail()
    },
    loadDetail () {
      if (this.details === null) {
        const detailUrl = `https://hws.m.taobao.com/cache/mtop.wdetail.getItemDescx/4.1/?data=%7Bitem_num_id%3A${this.itemid}%7D&type=jsonp&dataType=jsonp`
        jsonp(detailUrl, {
          name: 'jsonpcall'
        }, (err, data) => {
          if (err) {
            console.log('error')
            console.log(err)
          } else {
            console.log(data)
            // console.log(this.$el)
            this.details = data.data.images
          }
        })
      }
    }
  }
}
</script>
<style>
.itemdetail{
  background-color: #FFF;
}

.itemdetail .detail-header {
  display: flex;
  -webkit-box-pack: justify;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
  height: 4rem;
  cursor: pointer;
}
.itemdetail .detail-header .title {
  line-height: 4rem;
  font-size: 1.5rem;
  font-weight: 500;
  border-bottom: 1px solid #f0f0f0;
}
.itemdetail .detail-content{
  overflow: auto;
  overflow-x: none;
  height: 800px;
  max-height: 1400px;
  transition: max-height .8s cubic-bezier(.445,.05,.55,.95);
}
.itemdetail .detail-content.hide {
  max-height: 0;
}
.detailimg {
  display: block;
  margin-top: 0px;
  width: 100%;
  border: 0px;
}
</style>
