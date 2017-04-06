<template>
  <div id="app">
  <mu-appbar title="优券">
    <mu-icon-button icon='menu' slot="left" @click="toggle(true)"/>
    <mu-text-field icon="search" slot="right" class="appbar-search-field" hintText="请输入搜索内容"/>
  </mu-appbar>
  <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-list @itemClick="docked ? '' : toggle()">
        <mu-list-item title="首页" href="#/" />
        <mu-list-item title="Menu Item 1" toggleNested :open="false">
          <mu-list-item title="subMenu1" slot="nested"/>
        </mu-list-item>
        <mu-list-item title="Menu Item 3"/>
        <mu-list-item v-if="docked" @click.native="open = false" title="Close"/>
      </mu-list>
  </mu-drawer>
  <div class="maincontent">
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      open: true,
      docked: true
    }
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    }
  }
}
</script>

<style lang="less">
.mu-appbar{
	position: fixed;
	top:0;
	background-color: #fe4a65;
}
.mu-appbar-title{
    font-family: Simhei;
}
.appbar-search-field{
  color: #FFF;
  margin-bottom: 0;
  width: 100%;
  &.focus-state {
    color: #FFF;
  }
  .mu-text-field-hint {
    color: fade(#FFF, 54%);
  }
  .mu-text-field-input {
    color: #FFF;
  }
  .mu-text-field-focus-line {
    background-color: #FFF;
  }
}
.maincontent{
	margin-top: 56px;
  overflow: hidden;
  max-width: 800px;
  margin-left : auto;
  margin-right: auto;
}
</style>
