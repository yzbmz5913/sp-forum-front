<template>
  <div id="recommend" class="clearfix">
    <div id="carousel" class="card">
      <carousel></carousel>
    </div>
    <div id="hot" class="card">
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
        },
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
  margin: 50px auto 0 auto;
  padding: 20px 0 20px 0;
  box-sizing: border-box;
  width: 70%;
}

#carousel {
  float: left;
  width: 70%;
  height: 420px;
  padding-top: 20px;
  padding-left: 20px;
  box-sizing: border-box;
}

#hot {
  float: right;
  width: 28%;
  height: 420px;
  padding: 20px 30px 30px 30px;
  box-sizing: border-box;
  font-size: 14px;
}
#hot p{
  font-weight: 600;
}
#hot .post-date{
  font-size: 13px;
  margin-bottom: 5px;
  font-weight: normal;
  color: #333;
}
#hot ul li{
  height: 44px;
  margin: 15px 0;
  border-bottom: 2px solid rgba(200,200,200,.7);
  padding-left: 7px;
}
#hot ul li a{
  color: #2877ee;
}
</style>