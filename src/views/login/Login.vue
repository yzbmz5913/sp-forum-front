<template>
<div class="l card">
  <table>
    <tr>
      <td><span>用户名：</span></td>
      <td><input type="text" v-model="username"></td>
    </tr>
    <tr>
      <td><span>密码：</span></td>
      <td>
        <input :type="pwdVisible?'text':'password'" v-model="pwd">
        <span class="icon iconfont" :class="{'icon-browse':pwdVisible,'icon-Notvisible':!pwdVisible}"
              @click="pwdVisible=!pwdVisible"></span>
      </td>
    </tr>
  </table>
  <div class="bottom" @click="login()">
    <btn text="登录"></btn>
  </div>
</div>
</template>

<script>
import Btn from "../../components/Btn";
export default {
  name: "Login",
  components: {Btn},
  data(){
    return {
      username: '',
      pwd: '',

      pwdVisible: false,
    }
  },
  methods:{
    login(){
      //call login api
      //拿到用户信息，存入vuex, 拿到token，存入localStorage
      localStorage.setItem('jwt', 'jwt123')
      this.$store.commit('changeUserProfile', {
        uid: 1,
        username: 'stan marsh',
        desc: '我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴',
        faceUrl: 'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg'
      })
    }
  }
}
</script>

<style scoped>
.l{
  width: 400px;
  padding: 20px;
  box-sizing: border-box;
}
table {
  margin: 0 auto;
  border-spacing: 5px 10px;
}
table tr{
  height: 40px;
}

table tr td {
  vertical-align: auto;
}

input {
  outline: none;
  background-color: rgba(0, 0, 0, 0.07);
  display: inline-block;
  height: 24px;
  width: 100%;
  padding: 0 5px;
  box-sizing: border-box;
  border: none;
}
.icon.iconfont.icon-browse, .icon.iconfont.icon-Notvisible {
  display: inline;
  font-size: 20px;
  position: absolute;
  right: 0;
}
.bottom{
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>