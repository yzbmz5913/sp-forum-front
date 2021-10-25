<template>
  <div class="user-right">
    <ul>
      <li v-for="post in posts">
        <post :title="post.title"
              :abstract="post.abstract"
              :reply="numFlow(post.reply)"
              :visit="numFlow(post.visit)"
              :date="post.date"
              :images="post.images"
              :owner="post.owner"
              :id="post.id"
              left-w="400"
        ></post>
      </li>
    </ul>
  </div>
</template>

<script>
import utils from "../../assets/js/utils";
import Post from "../../components/Post";

export default {
  name: "History",
  components: {
    Post,
  },
  data() {
    return {
      posts: [
        {
          id: 1,
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
          id: 1,
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
          id: 1,
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
    }
  },
  methods: {
    numFlow(num) {
      return utils.numFlow(num)
    }
  }
}
</script>

<style scoped>

</style>