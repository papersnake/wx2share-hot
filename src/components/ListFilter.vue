<template>
  <div class="filterwarp">
    <mu-paper class="listfilter">
      <filterButton label="综合" value="id" class="o_item"/>
      <filterButton label="销量" value="itemsellcount" class="o_item"/>
      <filterButton label="新品" value="srrate" class="o_item"/>
      <filterButton label="价格" value="itemprice" class="o_item"/>
      <div class="o_item o_style">
        <mu-icon-button tooltip="default tooltip" icon="more_vert" class="more"/>
      </div>
    </mu-paper>
  </div>
</template>
<script>
import filterButton from '@/components/filterButton'
export default {
  name: 'listfilter',
  props: {
    value: {}
  },
  methods: {
    handleItemClick (value, item) {
      console.log(this.value)
      if (this.value !== value) {
        this.$emit('change', value)
      }
    }
  },
  components: {
    filterButton
  }
}
</script>
<style>
.listfilter{
  position: fixed;
  width: 100%;
  height: 40px;
  line-height: 40px;
  top: 56px;
  display: flex;
  z-index: 1
}
.o_item{
  flex: 1;
  display: block;
  width: 1px;
  text-align: center;
  font-size: 15px;
  color: #999;
}
.o_style{
  position: relative;
  font-size: 25px;
  flex: 0;
  flex-basis: 50px;
}
.more{
  padding: 3px;
  height: 40px;
  line-height: 40px;
}
@media (min-width: 480px){
  .listfilter{
    top:64px;
  }
}
</style>
