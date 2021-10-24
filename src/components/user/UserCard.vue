<template>
  <div class="uc card">
    <div class="pro" @click="c()">
      <profile size="66" :face-url="faceUrl"></profile>
    </div>
    <div class="right">
      <h3 @click="c()">{{username}}</h3>
      <p class="ellipsis">{{desc}}</p>
    </div>
    <div class="btn" @click="changeFollow()">
      <btn :text="fo?'取消关注':'关注'"></btn>
    </div>
  </div>
</template>

<script>
import Profile from "../Profile";
import Btn from "../Btn";
export default {
  name: "UserCard",
  components:{
    Btn,
    Profile,
  },
  props:['username','desc','uid','isFollow','faceUrl'],
  data(){
    return {
      fo : this.isFollow
    }
  },
  methods:{
    c(){
      this.$router.push(`/user/${this.uid}/posts`)
    },
    changeFollow(){
      //fetch follow status from server
      this.fo=!this.fo
    }
  }
}
</script>

<style scoped>
.uc{
  width: 100%;
  height: 90px;
  position: relative;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
}
.pro {
  position: absolute;
  left: 3%;
}
.uc .right{
  position: absolute;
  left: 15%;
  width: 50%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.uc .right h3{
  display: inline;
}
.uc .right p{
  height: 18px;
}
.uc .right h3:hover{
  color: #2877ee;
  cursor: pointer;
}
.btn{
  position: absolute;
  right: 10%;
}
</style>