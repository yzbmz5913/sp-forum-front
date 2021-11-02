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
import axios from "axios";

let gapX,gapY
function move(event){
  let obj = document.querySelector('#app .spr');
  obj.style.left = (event.clientX-gapX)+'px'
  obj.style.top = (event.clientY-gapY)+'px'
  return false;
}
function stop(){
  document.removeEventListener('mousemove', move)
  document.removeEventListener('mouseup', stop)
}

export default {
  components: {
    Sprite,
    Header,
  },
  methods:{
    startDrag(event){
      if(event.button===0){
        let obj = document.querySelector('#app .spr')
        gapX=event.clientX - obj.offsetLeft
        gapY=event.clientY - obj.offsetTop
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', stop)
      }
    }
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

    axios.post('http://localhost:8080/hi',{age:8},{
      params:{name:'stan'}
    }).then(rsp=>{
      console.log(rsp)
    }).catch(err=>{
      console.log(err)
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

.spr{
  position: fixed;
  left: -5%;
  top: 45%;
  transform: scale(0.5);
  z-index: 2;
  cursor: move;
}
</style>
