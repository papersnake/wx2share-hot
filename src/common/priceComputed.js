export default {
  computed: {
    curprice: function () {
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

      return (this.item.itemprice - couponmount).toFixed(1)
    }
  }
}
