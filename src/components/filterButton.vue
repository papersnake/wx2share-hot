<template>
  <mu-flat-button :label="label" class="o_item" @click="tabclick"/>
</template>
<script>
export default {
  props: {
    label: {},
    value: {}
  },
  methods: {
    tabclick (e) {
      if (this.$parent.$parent.handleItemClick) this.$parent.$parent.handleItemClick(this.value, this)
      console.log(this.value)
    }
  }
}
</script>
