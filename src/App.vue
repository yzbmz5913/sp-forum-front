<template>
  <div id="app">
    <div class="mask" v-if="$store.state.shouldMask"></div>
    <Header></Header>
    <router-view></router-view>
    <div class="spr" @mousedown="startDrag($event)">
      <sprite></sprite>
    </div>

  </div>
</template>

<script>
import Header from "./components/header/Header";
import Sprite from "./components/Sprite";
import api from "./assets/js/api";

let gapX, gapY

function move(event) {
  let obj = document.querySelector('#app .spr');
  obj.style.left = (event.clientX - gapX) + 'px'
  obj.style.top = (event.clientY - gapY) + 'px'
  return false;
}

function stop() {
  document.removeEventListener('mousemove', move)
  document.removeEventListener('mouseup', stop)
}

export default {
  components: {
    Sprite,
    Header,
  },
  methods: {
    startDrag(event) {
      if (event.button === 0) {
        let obj = document.querySelector('#app .spr')
        gapX = event.clientX - obj.offsetLeft
        gapY = event.clientY - obj.offsetTop
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', stop)
      }
    }
  },
  beforeCreate() {
    let jwt = localStorage.getItem('jwt')
    if (!jwt) return
    api.login('', '').then(rsp => {
      let data = rsp.data
      if (data['code'] === 0) {
        this.$store.commit('changeUserProfile', {
          uid: data.payload['uid'],
          username: data.payload['username'],
          desc: data.payload['desc'],
          faceUrl: data.payload['face_url'],
        })
      }
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
  z-index: 3;
}

.router-link-active {
  font-weight: 600;
}

.spr {
  position: fixed;
  left: -5%;
  top: 45%;
  transform: scale(0.5);
  z-index: 5;
  cursor: move;
}
</style>
