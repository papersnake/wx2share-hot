<template>
  <div class="loading">
    <div class="spinner">
      <mu-circular-progress :size="60" :strokeWidth="5"/>
    </div>
  </div>
</template>
<style>
.loading{
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  z-index: 300;
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  opacity: 0.8;
  justify-content: center;
  align-items: center;
}
</style>
