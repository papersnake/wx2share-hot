<template>
  <div class="itemdetail">
    <div class="detail-header" @click="toggle">
      <span class="title">商品详情(点击加载)</span>
      <mu-circular-progress :size="40" v-show="loadState" />
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
      details: null,
      loadState: false
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
      this.loadDetail()
    },
    loadDetail () {
      if (this.details === null) {
        this.loadState = true
        const detailUrl = `https://hws.m.taobao.com/cache/mtop.wdetail.getItemDescx/4.1/?data=%7Bitem_num_id%3A${this.itemid}%7D&type=jsonp&dataType=jsonp`
        jsonp(detailUrl, {
          name: 'jsonpcall'
        }, (err, data) => {
          this.loadState = false
          if (err) {
            console.log('error')
            console.log(err)
          } else {
            console.log(data)
            console.log(this.$el)
            this.details = data.data.images
            this.$nextTick(function () {
              console.log(this.$el.offsetTop)
              window.scrollTo(0, this.$el.offsetTop)
            })
          }
        })
      }
    }
  },
  watch: {
    $route () {
      this.open = false
      this.details = null
    }
  }
}
</script>
<style>
.itemdetail{
  background-color: #FFF;
  margin-bottom: 6px;
}

.itemdetail .detail-header {
  display: flex;
  -webkit-box-pack: justify;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
  height: 4rem;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 1px;
}
.itemdetail .detail-header .title {
  line-height: 4rem;
  font-size: 1.5rem;
  font-weight: 500;
}
.itemdetail .detail-content{
  overflow: auto;
  overflow-x: none;
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
