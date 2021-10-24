<template>
<div class="post clearfix card">
  <div class="left">
    <div class="detail">
      <h3><a href="#" class="title">{{title}}</a></h3>
      <p class="abstract ellipsis" :style="{width: (leftW?leftW:'550')+'px'}">{{abstract}}</p>
    </div>
    <div class="img-box">
      <img v-for="img in images" :src="img.path" alt="">
    </div>
  </div>
  <div class="right">
      <div class="pro" @click="c()">
        <profile size="40" :face-url="owner.faceUrl"></profile>
        <p class="ellipsis">{{owner.username}}</p>
      </div>
    <stat class="reply" icon="icon-resonserate" :text="reply"></stat>
    <stat class="visit" icon="icon-browse" :text="visit"></stat>
    <stat class="date" icon="icon-calendar" :text="date"></stat>
  </div>
</div>
</template>

<script>
import Profile from "./Profile";
import Stat from "./Stat";
export default {
  name: "Post",
  components:{
    Stat,
    Profile
  },
  props: ['id','title','abstract','images','owner','reply','visit','date','leftW'],
  methods:{
    c(){
      this.$router.push(`/user/${this.owner.uid}/posts`)
    }
  }
}
</script>

<style scoped>
.post{
  margin-bottom: 8px;
  padding: 10px 10px 10px 15px;
}
.left{
  float: left;
}
.left .detail{
  height: 66px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

}
.left h3{
  font-weight: 400;
  font-size: 16px;

}
.left a{
  color: #2877ee;
}
.left p{
  font-size: 14px;
  width: 550px;
}
.left .img-box{
  margin: 10px 0;
}
.right{
  position: relative;
  height: 66px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
}
.right .pro{
  position: absolute;
  left: 10%;
  display: flex;
  align-items: center;
}
.right .pro p{
  width: 84px;
  display: inline-block;
  margin-left: 8px;
  color: #333;
}
.right span{
  margin-right: 40px;
}
.right span:last-of-type{
  margin-right: 10px;
}
.right .date{
  position: absolute;
  left: 79%;
}

.right .visit{
  position: absolute;
  left: 62%;
}

.right .reply{
  position: absolute;
  left: 45%;
}
</style>