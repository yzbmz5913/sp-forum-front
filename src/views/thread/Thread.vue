<template>
  <div class="thread">
    <div class="title card">
      <h2>{{ title }}</h2>
    </div>
    <ul>
      <li v-for="l in levels">
        <level :fav="l.fav"
               :fav-num="l.favNum"
               :reply-num="l.replies.length"
               :owner="l.owner"
               :content="l.content"
               :date="l.date"
               :replies="l.replies"
               :images="l.images"
               :is-root="l.isRoot"
               :lid="l.lid"></level>
      </li>
    </ul>

    <hover-box id="hover_delReply" t="300" w="200">
      <template v-slot:content>
        <p style="text-align: center;margin: 15% auto;">是否确认删除回复？</p>
      </template>
    </hover-box>
    <hover-box id="hover_delLevel" t="300" w="200">
      <template v-slot:content>
        <p style="text-align: center;margin: 15% auto;">是否确认删除？</p>
      </template>
    </hover-box>
    <hover-box id="hover_levelCreator" t="100" w="800">
      <template v-slot:content>
        <div id="te">
          <editor ref="editor" class="e" el="thread_editor" h="300" w="700"></editor>
        </div>
      </template>
    </hover-box>

    <div class="bottom">
      <pager :total-page="this.totalPage"></pager>
    </div>

    <side-tool :count="2" class="st">
      <template slot="slot_0">
        <div class="container" @click="createLevel()">
          <span class="icon-chuangzuo" style="font-size: 30px"></span>
        </div>
      </template>
      <template slot="slot_1">
        <div class="container" @click="top()">
          <span class="icon-arrow-up" style="font-size: 42px"></span>
        </div>
      </template>
    </side-tool>
  </div>
</template>

<script>
import Level from "../../components/thread/Level";
import Pager from "../../components/Pager";
import HoverBox from "../../components/HoverBox";
import SideTool from "../../components/SideTool";
import Editor from "../../components/thread/Editor";

export default {
  name: "Thread",
  components: {Editor, SideTool, Pager, Level, HoverBox},
  data() {
    return {
      title: '风暴英雄使我快乐',
      id: 1,
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
          isRoot: true,
          fav: false,
          favNum: 4231,
          title: '风暴英雄使我快乐',
          date: '2021-10-24 19:27:23',
          content: '风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！风暴英雄真好玩，又拿MVP了！',
          images: [
            'https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180323/22743255f58b4c10a445365fbe73f4b3.webp',
            'https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180323/d338bd4f8fd74b34aab5d4631b097605.webp',
          ],
          replies: [
            {
              rid: 1,
              owner: {
                uid: 3,
                username: 'kenny mccormick',
                faceUrl: 'https://img0.baidu.com/it/u=668882205,3932911443&fm=26&fmt=auto',
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
                faceUrl: 'https://img0.baidu.com/it/u=216031677,97581716&fm=15&fmt=auto',
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
  methods: {
    async createLevel() {
      this.$store.commit('mask', 'hover_levelCreator')
      window.addEventListener('mousedown', this.$store.state.lis('hover_levelCreator'), {capture: true})
      if(!await this.$store.state.delConfirm){
        return
      }
      let html = this.$refs.editor.editor.txt.html();
      let content = html.substring(3, html.length - 4)
      // todo call create level API
    },
    top() {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      })
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

.st {
  position: fixed;
  right: calc(20% - 45px);
  bottom: 20%;
}

.container {
  height: 45px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#hover_levelCreator {
  color: #444;
}

#hover_levelCreator #te {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}
</style>