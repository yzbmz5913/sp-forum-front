<template>
  <ul>
    <li v-for="l in levels">
      <level :face-url="l.owner.faceUrl"
      :fav="l.fav"
      :fav-num="l.favNum"
      :reply-num="l.replies.length"
      :owner="l.owner"
      :content="l.content"
      :date="l.date"
      :replies="l.replies"
      :images="l.images"></level>
    </li>
  </ul>
</template>

<script>
import Level from "../../components/thread/Level";
export default {
  name: "Thread",
  components: {Level},
  data(){
    return {
      levels:[
        {
          lid: 1,
          owner: {
            uid: 1,
            username: 'stan marsh',
            faceUrl: 'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg',
          },
          fav: false,
          favNum: 4231,
          title: '风暴英雄使我快乐',
          date: '2021-10-24 19:27:23',
          content: '风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！',
          images: [
              'http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180323/22743255f58b4c10a445365fbe73f4b3.webp',
              'http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180323/d338bd4f8fd74b34aab5d4631b097605.webp',
          ],
          replies: [
            {
              rid: 1,
              owner: {
                uid: 3,
                username: 'kenny mccormick',
                faceUrl: 'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg',
              },
              to: 1,
              content: '斯坦你好！我也喜欢风暴英雄。我也喜欢风暴英雄。我也喜欢风暴英雄。我也喜欢风暴英雄。我也喜欢风暴英雄。我也喜欢风暴英雄。我也喜欢风暴英雄。我也喜欢风暴英雄。',
              date: '2021-10-24 19:28:43',
              fav: true,
              favNum: 75,
            },
            {
              rid: 2,
              owner: {
                uid: 2,
                username: 'kyle broflovski',
                faceUrl: 'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg',
              },
              to: 3,
              content: '肯尼你好，我也喜欢斯坦。我也喜欢斯坦。我也喜欢斯坦。我也喜欢斯坦。我也喜欢斯坦。我也喜欢斯坦。',
              date: '2021-10-24 19:29:43',
              fav: false,
              favNum: 5,
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>