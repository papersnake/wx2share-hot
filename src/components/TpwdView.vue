<template>
<div class="tpwd-warp">
  <div class="tpwd-content">
    【{{item.itemname}}  原价{{item.itemprice}}元，抢券立省{{couponprice}}元】复制这条信息{{tpwd}}，打开手机淘宝购买！
  </div>
  <Loading v-if="loading"/>
</div>
</template>
<script>
import Loading from '@/components/loading'
import Api from '@/services/api'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      successed: false,
      tpwd: ''
    }
  },
  created () {
    console.log('tpwdview created')
  },
  mounted () {
    console.log('tpwdview mounted')
  },
  updated () {
    console.log('tpwdview updated')
  },
  methods: {
    getTpwd () {
      let {item, successed} = this
      if (!successed) {
        let param = {
          text: item.itemname,
          url: item.couponsharelink,
          pic: item.itempic
        }
        // console.log(param)

        Api.createTpwd(param).then((response) => {
          console.log(response)
          let result = response.data
          if (result.success) {
            this.loading = false
            this.successed = true
            this.tpwd = result.model.model
          }
        })
      }
    }
  },
  computed: {
    couponprice: function () {
      let couponpriceinfo = this.item.coupondeno.match(/\d+/g)
      let couponmount = 0
      if (couponpriceinfo && couponpriceinfo.length > 1) {
        couponmount = couponpriceinfo[1]
        if (this.item.itemprice < couponpriceinfo[0]) {
          couponmount = 0
        }
      } else {
        couponmount = couponpriceinfo[0]
      }

      return couponmount
    }
  },
  watch: {
    item: {
      handler: function () {
        this.loading = true
        this.successed = false
      },
      deep: true
    }
  },
  components: {
    Loading
  }
}
</script>
<style>
.tpwd-warp{
  position: relative;
  margin: 0 -24px;
}
.tpwd-warp>.loading{
  position: absolute;
  opacity: 1;
}
.tpwd-content{
  padding: .2rem .92rem;
  background: #f4f4f4;
  font-size: 2rem;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  color: #5a5a5a;
  word-break: break-all;
}
</style>
