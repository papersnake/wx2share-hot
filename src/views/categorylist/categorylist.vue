<template>
    <div class="categorylist">
        hello categorylist {{value}}
    </div>
</template>
<script>
export default {
  data () {
    return {
      value: '123'
    }
  },
  mounted () {
    this.getCateName()
  },
  methods: {
    getCateName () {
      this.value = this.$route.params.catename
    }
  }
}
</script>
