<template>
  <div class="item">
    <router-link :to="{name: 'item', params: {id: item.id}}">
      <div class="pic">
        <img v-lazy="item.itempic+'_200x200.jpg'" alt="" class="itemimg">
      </div>
      <h3>{{item.itemname}}</h3>
      <div class="options">
        <div class="info-warp">
          <span class="couponinfo">{{item.coupondeno}}</span>
            <div>
              <span class="price-discount">
                券后￥<span class="fee">{{curprice}}</span>
              </span>
              <span class="price_original">¥{{item.itemprice}}</span>
            </div>
        </div>
        <mu-raised-button label="立刻领券" class="demo-raised-button" secondary/>
      </div>
    </router-link>
  </div>
</template>


<script>
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
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.item{
  display: inline-block;
  vertical-align: top;
  width: 50%;
  padding: 0.5rem;
  position: relative;
  border-bottom: 1px solid #e5e5e5;
  background: #fff;
}
.item:nth-child(2n-1):before{
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  content: "";
  background-color: #e5e5e5;
}
.item>a{
  display: block;
  color: #333;
}
.itemimg{
  width: 100%;
}
.options{
  display: flex;
}
.info-warp{
  flex: 1;
}
.couponinfo{
  color:red;
}
.price-discount{
  color: #ff5252;
}
.price-discount>.fee{
  font-size: 1.5rem;
  font-weight: 600;
}
.price_original{
  text-decoration: line-through;
}
.mu-raised-button{
  min-width: 5.5rem;
}
</style>
