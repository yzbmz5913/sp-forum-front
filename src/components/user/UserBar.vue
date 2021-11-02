<template>
  <div class="user-bar card">
    <div class="info">
      <div class="face">
        <profile size="100" :face-url="$store.state.user.faceUrl" :no-link="true"></profile>
      </div>
      <div class="right">
        <div style="display: flex;align-items: center;justify-content: space-between">
          <h3>{{ $store.state.user.username }}</h3>
          <div class="edit" @click="edit()">
            <btn text="编辑资料"></btn>
          </div>
        </div>
        <p>{{ $store.state.user.desc }}</p>
      </div>
    </div>
    <div class="statistics">
      <div><span class="k">注册时间：</span><span class="v">2021-10-21</span></div>
      <div><span class="k">发帖数：</span><span class="v">34</span></div>
      <div><span class="k">关注：</span><span class="v">23</span></div>
      <div><span class="k">粉丝：</span><span class="v">15</span></div>
    </div>

    <hover-box id="hover_editor" t="200" w="500">
      <template v-slot:content>
        <editor ref="editor"></editor>
      </template>
    </hover-box>
  </div>
</template>

<script>
import Profile from "../Profile";
import Btn from "../Btn";
import HoverBox from "../HoverBox";
import Editor from "./Editor";

export default {
  name: "UserBar",
  components: {
    Profile,
    Btn,
    HoverBox,
    Editor,
  },
  methods: {
    async edit() {
      this.$store.commit('mask', 'hover_editor')
      window.addEventListener('mousedown', this.$store.state.lis('hover_editor'), {capture: true})
      if(!await this.$store.state.delConfirm)return
      this.commitEdition()
    },
    commitEdition() {
      let newUsername = this.$refs.editor['username']
      let newDesc = this.$refs.editor['desc']
      let newFace = this.$refs.editor['faceUrl']
      let oldPwd = this.$refs.editor['oldPwd']
      let newPwd = this.$refs.editor['newPwd']
      let changeUserProfileReq = {
        username: newUsername,
        desc: newDesc,
        face: newFace,
      }
      if (oldPwd&&newPwd) {
        changeUserProfileReq.newPwd = newPwd
        changeUserProfileReq.oldPwd = oldPwd
      }

      let rsp = {msg:"旧密码不正确！"} //todo call backend api，校验是否修改成功
      if(rsp.msg){
        this.$store.commit('errHappens',rsp.msg)
        return
      }
      location.reload()
    },
  },
  mounted() {
  }
}
</script>

<style scoped>
.user-bar {
  position: relative;
  height: 140px;
  width: 70%;
  margin: 50px auto 20px auto;
  padding-left: 25px;
  box-sizing: border-box;
}

.user-bar .info {
  height: 100px;
  width: 75%;
  position: absolute;
  top: calc(50% - 47px);
  overflow: hidden;
}

.user-bar .info .face {
  display: inline-block;
}

.user-bar .info .right {
  position: absolute;
  display: inline-block;
  height: 100%;
  width: 60%;
  margin-left: 20px;
}

.user-bar .info .right h3 {
  display: inline-block;
  margin: 10px 0 12px 0;
}

.user-bar .info .right p {
  font-size: 14px;
  line-height: 1.3;
}

.statistics {
  display: flex;
  height: 100px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  position: absolute;
  color: #333;
  font-size: 14px;
  right: 7%;
  top: calc(50% - 44px);
}

.statistics .k {
  float: left;
  width: 100px;
}

.statistics .v {
  float: right;
}

.statistics div:nth-of-type(n+2):hover {
  cursor: pointer;
  color: #2877ee;
}


</style>