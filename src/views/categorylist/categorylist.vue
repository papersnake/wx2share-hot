<template>
    <div class="categorylist">
        <div class="header">
          <filterNav></filterNav>
        </div>
        <div class="content">

        </div>
    </div>
</template>
<script>
import filterNav from '@/components/ListFilter'
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
  },
  watch: {
    $route () {
      this.value = this.$route.params.catename
    }
  },
  components: {
    filterNav
  }
}
</script>
