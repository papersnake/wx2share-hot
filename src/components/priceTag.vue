<template>
<div class="mainpricetag" :style="tagStyle">
  <span>￥<span>{{intPart}}</span>{{floatPart}}</span>
</div>
</template>
<script>
export default {
  data () {
    return {
      intPart: '0',
      floatPart: ''
    }
  },
  created () {
    this.splitPrice()
  },
  props: {
    price: {
      type: String,
      default: 0
    },
    size: {
      type: Number,
      default: 4
    },
    color: {
      type: String
    }
  },
  computed: {
    tagStyle () {
      const {size, color} = this
      return {
        height: size + 'rem',
        'font-size': size / 2 + 'rem',
        color: color,
        'line-height': size * 1.25 + 'rem'
      }
    }
  },
  methods: {
    splitPrice: function () {
      let price = Number(this.price)
      if (Math.floor(price) === price) {
        this.intPart = price
      } else {
        let tmp = price.toString().split('.')
        this.intPart = tmp[0]
        this.floatPart = '.' + tmp[1]
      }
    }
  }
}
</script>
<style>
.mainpricetag{
  display: inline-flex;
  height: 4rem;
  font-size: 2rem;
  color: #fff;
  line-height: 5rem;
}
.mainpricetag>span>span{
  font-size: 3.5rem;
}
</style>
