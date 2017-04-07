<template>
  <div class="filterwarp">
    <mu-paper class="listfilter bottomShadow">
      <div class="o_item">综合</div>
      <div class="o_item">销量</div>
      <div class="o_item">新品</div>
      <div class="o_item">价格</div>
      <div class="o_item o_style">
        <mu-icon-button tooltip="default tooltip" icon="more_vert" class="more"/>
      </div>
    </mu-paper>
  </div>
</template>
<style>
.listfilter{
  position: fixed;
  width: 100%;
  height: 40px;
  line-height: 40px;
  top: 56px;
  display: flex;
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
