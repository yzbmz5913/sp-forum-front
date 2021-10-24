<template>
<div class="replies">
  <ul>
    <li v-for="reply in reps">
      <div class="left">
        <profile size="36" :face-url="reply.owner.faceUrl"></profile>
      </div>
      <div class="right">
        <div class="content">
          <a href="#">{{reply.owner.username}}:&nbsp;</a>
          <span>
            <span v-if="reply.to!==ownerUid">回复<a href="#">{{uid2name[reply.to]}}:&nbsp;</a></span>
            {{reply.content}}
          </span>
        </div>
        <div class="bottom">
          <table>
            <tr>
              <td>
                <span @click="changeFav(reply)">
                  <stat class="fav" :icon="reply.fav?'icon-favorites-fill':'icon-favorites'" :text="reply.favNum" fs="18"></stat>
                </span>
              </td>
              <td>
                <span @click="replyTo=reply.owner.uid">
                  <stat class="rsp" icon="icon-resonserate" fs="18"></stat>
                </span>
              </td>
              <td>
                <span @click="">
                  <stat class="bin" icon="icon-ashbin" fs="18" v-if="isSelf(reply.owner.uid)"></stat>
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </li>
  </ul>
  <div class="msg-box">
    <textarea cols="30" rows="4" class="ta" :placeholder="ph" v-model="text"></textarea>
    <span>{{text.length}}/200</span>
    <btn text="回复" class="btn"></btn>
  </div>
</div>
</template>

<script>
import Stat from "../Stat";
import Btn from "../Btn";
import Profile from "../Profile";
export default {
  name: "reply",
  components:{Profile, Btn, Stat},
  props: [
    'replies',
    'ownerUid',
    'ownerUsername',
  ],
  data(){
    return {
      reps: this.replies,
      uid2name: {},
      replyTo: this.ownerUid,
      text: '',
    }
  },
  created() {
    this.uid2name[this.ownerUid]=this.ownerUsername
    for (let reply of this.replies) {
      this.uid2name[reply.owner.uid]=reply.owner.username
    }
  },
  methods:{
    changeFav(reply){
      if(reply.fav){
        reply.favNum--;
      }else{
        reply.favNum++;
      }
      reply.fav=!reply.fav
    },
    isSelf(uid){
      return true
      return uid === this.$store.state.user.uid
    },
    reply(uid){
      this.replyTo=uid
    }
  },
  computed:{
    ph(){
      if(this.replyTo!==this.ownerUid){
        return `回复 ${this.uid2name[this.replyTo]}:`
      }
      return ''
    }
  }
}
</script>

<style scoped>
.replies a{
  color: #2877ee;
}
.replies>ul>li{
  margin: 10px 0;
}
.replies .left{
  float: left;
  margin-right: 10px;
}
.content{
  width: 75%;
  line-height: 1.2;
}
.bottom{
  margin-left: 78%;
  user-select: none;
  cursor: pointer;
  color: #666;
}
.bottom .rsp:hover,.bottom .bin:hover{
  color: #333;
}
.bottom .fav:hover{
  color: #DD4A68;
}
table{
  width: 180px;
}
table tr td{
  width: 37%;
}
table tr td:nth-child(2){
  width: 24%;
}
.msg-box{
  color: #333;
}
textarea{
  resize: none;
  padding: 5px;
  margin: 10px 0;
  width: 75%;
  outline: none;
  background-color: rgba(0,0,0,0.1);
  border-radius: 5px;
  border: none;
}
.btn{
  margin-left: 65%;
}
.msg-box span{
  font-size: 14px;
  position: absolute;
  left: 0;
  bottom: 8px;
}
</style>