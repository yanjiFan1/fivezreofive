<template>
  <div id="app">
    <header-tab></header-tab>
    <router-view class="g-view"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import HeaderTab from './components/header.vue'
import Footer from './components/footer/Footer.vue'
export default {
  name: 'app',
  components:{
    HeaderTab,
    Footer
  }
}
</script>

<style lang="scss" scoped>

#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.g-view {
  width: 100%;
  height: 100%;
  padding: 48px 0 140px;
  overflow: scroll;
  box-sizing: border-box;
}

</style>
