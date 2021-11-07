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
import api from "../../assets/js/api";

export default {
  name: "Login",
  components: {Btn},
  data() {
    return {
      username: '',
      pwd: '',

      pwdVisible: false,
    }
  },
  methods: {
    login() {
      api.login(this.username, this.pwd).then(rsp => {
        let data = rsp.data
        if (data['code'] === 0) {
          let ud = data.payload
          this.$store.commit('changeUserProfile', {
            uid: ud['uid'],
            username: ud['username'],
            desc: ud['desc'],
            faceUrl: ud['face_url'],
          })
          this.$router.push('/')
        } else {
          this.$store.commit('errHappens', data['msg'])
        }
      })
    }
  }
}
</script>

<style scoped>
.l {
  width: 400px;
  padding: 20px;
  box-sizing: border-box;
}

table {
  margin: 0 auto;
  border-spacing: 5px 10px;
}

table tr {
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

.bottom {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>