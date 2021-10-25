<template>
  <div class="e card">
    <div class="left">
      <div id="p">
        <profile size="80" :face-url="faceUrl" style="cursor: auto"></profile>
      </div>
      <div class="upload">
        更换头像
        <input type="file" id="file" @change="changeProfile()">
      </div>
    </div>
    <div class="right">
      <table>
        <tr>
          <td><span>用户名：</span></td>
          <td><input type="text" placeholder="2~24个字符" v-model="username"></td>
        </tr>
        <tr>
          <td><span>密码：</span></td>
          <td>
            <input :type="pwdVisible?'text':'password'" placeholder="8~18位的字母与数字组合" v-model="pwd">
            <span class="icon iconfont" :class="{'icon-browse':pwdVisible,'icon-Notvisible':!pwdVisible}"
                  @click="pwdVisible=!pwdVisible"></span>
          </td>
        </tr>
        <tr>
          <td><span>个人简介：<br>({{ desc.length + '/' + 110 }})</span></td>
          <td><textarea name="desc" v-model="desc" cols="30" rows="9" placeholder="不超过110个字符"></textarea></td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
import Profile from "../Profile";
import Btn from "../Btn";

export default {
  name: "Editor",
  components: {Btn, Profile},
  data() {
    return {
      desc: this.$store.state.user.desc,
      username: this.$store.state.user.username,
      faceUrl: this.$store.state.user.faceUrl,
      pwd: '',

      pwdVisible: false,
    }
  },
  methods: {
    changeProfile() {
      let preview = document.querySelector('#p #face')
      let file = document.querySelector('#file').files[0]
      let reader = new FileReader()
      reader.onload = () => {
        preview.style.backgroundImage = `url('${reader.result}')`
      }
      if (file) reader.readAsDataURL(file)
    }
  }
}
</script>

<style scoped>
.e {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  color: #333;
}

.e * {
  font-size: 13px;
}

.left {
  position: absolute;
  left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.left #p {
  margin-bottom: 10px;
}

.e .right {
  position: absolute;
  right: 20px;
  color: #333;
}

.right table {
  border-spacing: 5px 10px;
}

.right table tr td {
  vertical-align: auto;
}

.right input, .right textarea {
  outline: none;
  background-color: rgba(0, 0, 0, 0.07);
}

.right input {
  display: inline-block;
  height: 24px;
  width: 100%;
  padding: 0 5px;
  box-sizing: border-box;
  border: none;
}

textarea {
  resize: none;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  line-height: 1.25;
  border: none;
}

textarea::-webkit-scrollbar {
  display: none;
}

.icon.iconfont.icon-browse, .icon.iconfont.icon-Notvisible {
  display: inline;
  font-size: 20px;
  position: absolute;
  right: 0;
}

.upload {
  --h: 26px;
  width: 100px;
  height: var(--h);
  background-color: rgba(188, 188, 188, .7);
  text-align: center;
  font-size: 13px;
  letter-spacing: 1px;
  line-height: var(--h);
  user-select: none;
  transition: background-color 200ms;
  box-shadow: 1px 1px 1px rgba(122, 122, 122, 0.4);
}

.upload:hover, .upload input:hover {
  background-color: rgba(133, 133, 133, .7);
}

.upload input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100px;
  height: 26px;
}
</style>