<template>
  <div id="recommend" class="clearfix card">
    <div id="carousel">
      <carousel></carousel>
    </div>
    <div id="hot">
      <p>热门帖子</p>
      <ul>
        <li v-for="post in hotPosts" class="hot-post">
          <p class="post-date">{{post.date}}</p>
          <a href="#">{{post.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Carousel from "./Carousel";

export default {
  name: "Recommend",
  components: {
    Carousel,
  },
  data(){
    return {
      hotPosts:[
        {
          date: '2021-10-20',
          title: '南方公园主题站上线啦'
        },
        {
          date: '2021-10-19',
          title: '坦子生日快乐'
        },
        {
          date: '2021-10-21',
          title: '我是一事无成铁哈批，求喷'
        }
      ]
    }
  }
}
</script>

<style scoped>
#recommend {
  margin: 50px auto 20px auto;
  padding: 20px 15px 20px 15px;
  box-sizing: border-box;
  width: 70%;
}

#carousel {
  float: left;
}

#hot {
  float: right;
  width: 300px;
  height: 400px;
  padding: 30px;
  box-sizing: border-box;
  font-size: 14px;
}
#hot p{
  font-weight: 600;
}
#hot .post-date{
  font-weight: normal;
  color: #999999;
}
#hot ul li{
  height: 44px;
  margin: 15px 0;
  border-left: 2px solid #777;
  padding-left: 7px;
}
#hot ul li a{
  color: #2877ee;
}
</style>