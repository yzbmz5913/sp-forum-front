<template>
  <div id="app">
    <div class="mask" v-if="$store.state.shouldMask"></div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  components: {
    Header,
  }
}
</script>

<style>
@import "assets/css/common.css";
@import "assets/font/iconfont.css";
#app{
  background: url("https://images.alphacoders.com/590/thumb-1920-590805.png") no-repeat fixed 50% 95%;
  background-size: cover;
  height: 1500px;
}
.mask{
  height: 100%;
  width: 100%;
  background-color: rgba(100,100,100,0.5);
  position: fixed;
  top: 0;
  z-index: 2;
}
</style>
