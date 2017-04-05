<template>
<mu-grid-list class="product-grid">
    <ItemCard v-for="item, index in items" :key="index" :item="item"></ItemCard>
</mu-grid-list>
</template>
<script>
import ItemCard from './ItemCard'
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    ItemCard
  }
}
</script>
<style scoped>
.product-grid{
  position: relative;
}
</style>
