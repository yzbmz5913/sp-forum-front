<template>
<div class="post clearfix">
  <div class="left">
    <div class="detail">
      <h3><a href="#" class="title">{{title}}</a></h3>
      <p class="abstract ellipsis">{{abstract}}</p>
    </div>
    <div class="img-box">
      <img v-for="img in images" :src="img.path" alt="">
    </div>
  </div>
  <div class="right">
      <div class="pro">
        <profile size="36" face-url=""></profile>
        <p class="ellipsis">{{author}}</p>
      </div>


    <div class="reply">
      <i class="icon iconfont icon-resonserate"></i>
      <span>{{reply}}</span>
    </div>
    <div class="visit">
      <i class="icon iconfont icon-browse"></i>
      <span>{{visit}}</span>
    </div>
    <div class="date">
      <i class="icon iconfont icon-calendar"></i>
      <span>{{date}}</span>
    </div>
  </div>
</div>
</template>

<script>
import Profile from "./Profile";
export default {
  name: "Post",
  components:{
    Profile
  },
  props: ['title','abstract','images','faceUrl','author','reply','visit','date'],
}
</script>

<style scoped>
.post{
  padding-left: 15px;
  border-bottom: 2px solid #bbb;
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
  font-size: 13px;
  color: #666;
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
  color: #666;
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