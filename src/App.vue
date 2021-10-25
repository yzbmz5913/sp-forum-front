<template>
  <div id="app">
    <div class="mask" v-if="$store.state.shouldMask"></div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/header/Header";

export default {
  components: {
    Header,
  },
  beforeCreate() {
    let jwt = localStorage.getItem('jwt')
    //if(!jwt)return
    // let user = getUserDetail from backend api
    // if(!user)return
    this.$store.commit('changeUserProfile', {
      uid: 1,
      username: 'stan marsh',
      desc: '我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴',
      faceUrl: 'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg'
    })
  }
}
</script>

<style>
@import "assets/css/common.css";
@import "assets/font/iconfont.css";

.mask {
  height: 100%;
  width: 100%;
  background-color: rgba(100, 100, 100, 0.5);
  position: fixed;
  top: 0;
  z-index: 2;
}

.router-link-active {
  font-weight: 600;
}
</style>
