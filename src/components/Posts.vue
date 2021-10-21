<template>
<div class="posts card">
  <ul>
    <li v-for="post in posts">
      <post :title="post.title"
            :abstract="post.abstract"
            :author="post.author"
            :reply="numFlow(post.reply)"
            :visit="numFlow(post.visit)"
            :date="post.date"
            :images="post.images"
      ></post>
    </li>
  </ul>
</div>
</template>

<script>
import Post from "./Post";
function abs2rel(dateStr){
  let now=Date.now()/1000
  let ts=+new Date(dateStr)/1000
  let diff=now-ts
  let day=Math.floor(diff/86400)
  if(day>30){
    return dateStr.substring(5,10)
  }
  if(day>0){
    return day+'天前'
  }
  let hour=Math.floor(diff/3600)
  if(hour>0){
    return hour+'小时前'
  }
  let minute=Math.floor(diff/60)
  if(minute>0){
    return minute+'分钟前'
  }
  return '刚刚'
}
export default {
  name: "Posts",
  components:{
    Post,
  },
  data(){
    return {
      posts:[
        {
          title: '我爱坦子',
          abstract: '我爱坦子，啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
          images: [{
            path: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg0.pconline.com.cn%2Fpconline%2F1401%2F09%2F4142876_keai%2F46-121220093F2_thumb.gif&refer=http%3A%2F%2Fimg0.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637292338&t=a795fdb1e1585d1445ec583f13065094',
          }],
          faceUrl: '',
          author: 'stan marsh',
          reply: 43,
          visit: 2552,
          date: abs2rel('2021-10-20 19:23:23')
        },
        {
          title: '我爱坦子',
          abstract: '我爱坦子，啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
          images: [],
          faceUrl: '',
          author: 'kyle broflovski',
          reply: 2,
          visit: 22,
          date: abs2rel('2021-10-20 18:33:23')
        },
        {
          title: '我爱坦子',
          abstract: '我爱坦子，啦啦啦',
          images: [],
          faceUrl: '',
          author: 'stan marsh',
          reply: 4313,
          visit: 2552523,
          date: abs2rel('2021-10-19 19:23:23')
        },
      ]
    }
  },
  methods:{
    numFlow(num){
      return num>1000?'999+':num
    }
  }
}
</script>

<style scoped>
.posts{
  margin: 0 auto;
  width: 70%;
}
.posts ul{
  z-index: 5;
}
</style>