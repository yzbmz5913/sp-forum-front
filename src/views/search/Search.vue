<template>
  <div class="s">
    <div class="abstract card">
      <h2>搜索结果: {{keyword}}</h2>
      <div>共{{count}}条记录</div>
    </div>
    <ul>
      <li v-for="post in posts">
        <post :title="post.title"
              :abstract="post.abstract"
              :reply="numFlow(post.reply)"
              :visit="numFlow(post.visit)"
              :date="post.date"
              :images="post.images"
              :owner="post.owner"
        ></post>
      </li>
    </ul>
    <div class="bottom">
      <pager :total-page="totalPage"></pager>
    </div>

  </div>
</template>

<script>
import Post from "../../components/Post";
import utils from "../../assets/js/utils";
import Pager from "../../components/Pager";
export default {
  name: "Search",
  components: {Pager, Post},
  data(){
    return{
      keyword: '',
      count: 0,

      posts: [
        {
          title: '我爱坦子',
          abstract: '我爱坦子，啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
          images: [{
            path: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg0.pconline.com.cn%2Fpconline%2F1401%2F09%2F4142876_keai%2F46-121220093F2_thumb.gif&refer=http%3A%2F%2Fimg0.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637292338&t=a795fdb1e1585d1445ec583f13065094',
          }],
          owner: {
            uid: 1,
            faceUrl: 'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg',
            username: 'stan marsh',
          },
          reply: 43,
          visit: 2552,
          date: utils.abs2rel('2021-10-20 19:23:23')
        },
        {
          title: '我爱坦子',
          abstract: '我爱坦子，啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
          images: [],
          owner: {
            uid: 2,
            faceUrl: 'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg',
            username: 'kyle broflovski',
          },
          reply: 2,
          visit: 22,
          date: utils.abs2rel('2021-10-20 18:33:23')
        },
        {
          title: '我爱坦子',
          abstract: '我爱坦子，啦啦啦',
          images: [],
          owner: {
            uid: 1,
            faceUrl: 'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg',
            username: 'stan marsh',
          },
          reply: 4313,
          visit: 2552523,
          date: utils.abs2rel('2021-10-19 19:23:23')
        },
      ],
      curPage: 1,
      pageNums: [],
    }
  },
  computed:{
    totalPage(){
      console.log(this.count/20);
      return Math.ceil(this.count/20)
    }
  },
  methods: {
    numFlow(num) {
      return utils.numFlow(num)
    }
  },
  watch: {
    curPage(newP, oldP) {
      if (this.totalPage <= 5 || newP === oldP) return
      let newPages = []
      for (let i = newP - 2; i <= newP + 2; i++) newPages.push(i)
      while (newPages[0] <= 0) {
        newPages.shift()
        newPages.push(newPages[newPages.length - 1] + 1)
      }
      while (newPages[newPages.length - 1] > this.totalPage) {
        newPages.pop()
        newPages.unshift(newPages[0] - 1)
      }
      this.pageNums = newPages
      //todo fetch new page from server
    },
    '$route':{
      handler(to){
        this.keyword = to.query['keyword']
        //todo get posts from svr
        this.count=this.keyword.length*10
        this.pageNums = []
        for (let i = 0; i < Math.min(5, this.totalPage); i++) {
          this.pageNums.push(i + 1)
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.s{
  width: 60%;
  margin: 50px auto 20px auto;
}
.abstract{
  margin-bottom: 20px;
}
.abstract h2{
  margin: 20px 0 20px 30px;
}
.abstract div{
  margin: 0 0 20px 30px;
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 110%;
  left: -5%;
  z-index: 2;
  margin-top: 50px;
}
</style>