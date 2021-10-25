<template>
  <div class="thread">
    <div class="title card">
      <h2>{{ title }}</h2>
    </div>
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

    <div class="dc" v-show="$store.state.shouldMask">
      <del-confirm></del-confirm>
    </div>

    <div class="bottom">
      <pager :page-nums="this.pageNums" :total-page="this.totalPage"></pager>
    </div>

  </div>
</template>

<script>
import Level from "../../components/thread/Level";
import DelConfirm from "../../components/thread/DelConfirm";
import Pager from "../../components/Pager";

export default {
  name: "Thread",
  components: {Pager, DelConfirm, Level},
  data() {
    return {
      title: '风暴英雄使我快乐',
      curPage: 1,
      totalPage: 1,
      pageNums: [],
      levels: [
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
            },
          ]
        }
      ]
    }
  },
  created() {
    //fetch total page from server
    this.totalPage = 10
    for (let i = 0; i < Math.min(5, this.totalPage); i++) {
      this.pageNums.push(i + 1)
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
    }
  }
}
</script>

<style scoped>
.dc {
  position: fixed;
  --w: 200px;
  width: var(--w);
  height: 120px;
  top: 200px;
  left: calc(50% - 0.5 * var(--w));
  z-index: 98;
}

.title {
  margin: 50px auto 15px auto;
  height: 60px;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding-left: 2%;
}

.title h2 {
  letter-spacing: 1px;
}

.thread ul > li:last-child {
  margin-bottom: 70px;
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