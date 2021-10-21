<template>
<div class="e card">
  <div class="left">
    <div class="p"><profile size="80"></profile></div>
    <div>
      <btn text="更换头像"></btn>
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
        <td><span>个人简介：<br>({{desc.length+'/'+110}})</span></td>
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
  data(){
    return {
      desc: this.$store.state.user.desc,
      username: this.$store.state.user.username,
      faceURL: this.$store.state.user.faceURL,
      pwd: '',

      pwdVisible: false,
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.e{
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  color: #333;
}
.e *{
  font-size: 13px;
}
.left{
  position: absolute;
  left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.left .p{
  margin-bottom: 10px;
}
.e .right{
  position: absolute;
  right: 20px;
  color: #333;
}
.right table{
  border-spacing: 5px 10px;
}
.right table tr td{
  vertical-align: auto;
}
.right input,.right textarea{
  outline: none;
  background-color: rgba(0,0,0,0);
}
.right input{
  display: inline-block;
  height: 24px;
  width: 100%;
  padding: 0 5px;
  box-sizing: border-box;
  border: 0;
  border-bottom: 1px solid #666;
}

textarea{
  resize: none;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  line-height: 1.25;
}
textarea::-webkit-scrollbar{
  display: none;
}
.icon.iconfont.icon-browse,.icon.iconfont.icon-Notvisible{
  display: inline;
  font-size: 20px;
  position: absolute;
  right: 0;
}
</style>