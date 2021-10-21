<template>
  <div class="user-bar card">
    <div class="info">
      <div class="face">
        <profile size="100"></profile>
      </div>
      <div class="right">
        <div style="display: flex;align-items: center;justify-content: space-between">
          <h3>{{$store.state.user.username}}</h3>
          <div class="edit" @click="edit()">
            <btn text="编辑资料"></btn>
          </div>
        </div>
        <p>{{$store.state.user.desc}}</p>
      </div>
    </div>
    <div class="statistics">
      <div><span class="k">注册时间：</span><span class="v">2021-10-21</span></div>
      <div><span class="k">发帖数：</span><span class="v">34</span></div>
      <div><span class="k">关注：</span><span class="v">23</span></div>
      <div><span class="k">粉丝：</span><span class="v">15</span></div>
    </div>

    <div class="editor" v-show="$store.state.shouldMask">
      <editor ref="editor"></editor>
    </div>
  </div>
</template>

<script>
import Profile from "../Profile";
import Editor from "./Editor";
import Btn from "../Btn";

export default {
  name: "UserBar",
  components: {
    Profile,
    Editor,
    Btn,
  },
  computed: {
    lis() {
      return event => {
        let e = document.querySelector('.editor')
        let l = e.offsetLeft, t = e.offsetTop
        let r = l + e.offsetWidth, b = t + e.offsetHeight
        let x = event.clientX, y = event.clientY
        if (this.$store.state.shouldMask && x < l || x > r || y < t || y > b) {
          let succeed = this.commitEdition()
          if(succeed){
            this.$store.commit('mask', false)
            window.removeEventListener('mousedown', this.lis, {capture: true})
          }
        }
      }
    }
  },
  methods: {
    edit() {
      this.$store.commit('mask', true)
      window.addEventListener('mousedown', this.lis, {capture: true})
    },
    commitEdition(){
      let newUsername = this.$refs.editor.username
      let newDesc = this.$refs.editor.desc
      let newFace = this.$refs.editor.faceUrl
      let newPwd = this.$refs.editor.pwd
      let changeUserProfileReq = {
        username: newUsername,
        desc: newDesc,
        face: newFace,
        pwd: newPwd
      }
      this.$store.commit('changeUserProfile',changeUserProfileReq)
      return true
    }
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
  font-size: 13px;
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

.editor {
  --w: 500px;
  width: var(--w);
  height: 300px;
  position: fixed;
  top: 200px;
  left: calc(50% - 0.5 * var(--w));
  z-index: 99;
}
</style>