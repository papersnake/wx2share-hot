<template>
  <div class="sharepic">
    <canvas width="620px" height="920px" class="canv" ref="sharearea"></canvas>
    <img :src="shareimg" style="width: 100%">
    <div class="qrcode" ref="qrcode"></div>
  </div>
</template>
<script>
import QRious from 'qrious'
import priceComputed from '@/common/priceComputed'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      shareimg: null
    }
  },
  mixins: [priceComputed],
  mounted () {
    this.updateCxt()
  },
  methods: {
    updateCxt () {
      const image = new Image()
      image.crossOrigin = 'Anonymous'
      image.onload = () => {
        const area = this.$refs.sharearea
        const cxt = area.getContext('2d')
        cxt.scale(2, 2)
        cxt.fillStyle = '#ffffff'
        cxt.fillRect(0, 0, area.width, area.height)
        console.log(image.width)
        cxt.drawImage(image, 5, 5, 300, 300)

      // `console.info(window.location.href)
        const qr = new QRious({
          background: '#fff',
          backgroundAlpha: 0.8,
          foreground: '#000',
          foregroundAlpha: 1,
          level: 'H',
          padding: 5,
          size: 500,
          value: window.location.href
        })

        cxt.drawImage(qr.canvas, 5, 310, 110, 110)

        // cxt.fillRect(5, 310, 110, 110)

        cxt.font = '11px 微软雅黑 bold'
        cxt.fillStyle = '#000'

        // cxt.fillText(this.item.itemname, 120, 320)
        canvasTextAutoLine(this.item.itemname, area, 120, 320, 15)
        cxt.font = '11px 微软雅黑 normal'
        cxt.fillStyle = '#ff0000'
        cxt.fillText(`领券：${this.item.coupondeno}`, 120, 360)

        cxt.font = 'italic 11px 微软雅黑 normal'
        cxt.fillStyle = '#0000ff'
        cxt.fillText(`原价：${this.item.itemprice}`, 120, 380)

        cxt.font = '20px 微软雅黑 bold'
        cxt.fillStyle = '#ff0000'
        const str = `券后价：${this.curprice} 元`
        cxt.fillText(str, 120, 410)

        cxt.font = '20px 微软雅黑'
        cxt.fillStyle = '#000000'
        cxt.fillText('长按扫码，先领券再购物', 40, 450)

        this.shareimg = area.toDataURL('image/png')
        // console.log(this.shareimg)
      }
      image.src = this.item.itempic
      console.log(image.src)
    }
  }
}
function canvasTextAutoLine (str, canvas, initX, initY, lineHeight) {
  var ctx = canvas.getContext('2d')
  var lineWidth = 0
  var canvasWidth = canvas.width / 2
  var lastSubStrIndex = 0
  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width
    if (lineWidth > canvasWidth - initX) { // 减去initX,防止边界出现的问题
      ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY)
      initY += lineHeight
      lineWidth = 0
      lastSubStrIndex = i
    }
    if (i === str.length - 1) {
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY)
    }
  }
}
</script>
<style>
.sharepic{
  display: block;
  margin: -24px;
}
.canv{
  display: none;
  width: 100%;
  background-color: #FFF;
}
</style>
