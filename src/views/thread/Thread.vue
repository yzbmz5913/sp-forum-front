<template>
  <div class="thread">
    <div class="title card">
      <h2>{{ title }}</h2>
    </div>
    <ul>
      <li v-for="l in levels">
        <level :reply-num="l.replyNum"
               :owner="l.owner"
               :content="l.content"
               :date="l.date"
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
import api from "../../assets/js/api";

export default {
  name: "Thread",
  components: {Editor, SideTool, Pager, Level, HoverBox},
  data() {
    return {
      title: '风暴英雄使我快乐',
      tid: 1,
      curPage: 1,
      totalPage: 1,
      pageNums: [],
      levels: []
    }
  },
  created() {
    this.getLevel(1)
    api.levelNum(this.$route.params['tid']).then(rsp => {
      if (rsp.data.code === 0) {
        this.totalPage = rsp.data.payload
      }
    })
    for (let i = 0; i < Math.min(5, this.totalPage); i++) {
      this.pageNums.push(i + 1)
    }
    api.visit(this.$route.params['tid'])
  },
  methods: {
    getLevel(page) {
      console.log('getLevel', page)
      api.getThread(this.$route.params['tid'], page).then(rsp => {
        let data = rsp.data
        if (data.code === 0) {
          let p = data.payload
          this.tid = p['tid']
          this.title = p['title']
          for (let level of p['levels']) {
            this.levels.push({
              isRoot: level['is_root'],
              replyNum: level['reply_num'],
              date: level['date'],
              content: level['content'],
              lid: level['lid'],
              owner: {
                uid: level['author']['uid'],
                username: level['author']['username'],
                faceUrl: level['author']['face_url']
              }
            })
          }
        } else {
          this.$store.commit('errHappens', data.msg)
        }
      })
    },
    async createLevel() {
      this.$store.commit('mask', 'hover_levelCreator')
      window.addEventListener('mousedown', this.$store.state.lis('hover_levelCreator'), {capture: true})
      if (!await this.$store.state.delConfirm) {
        return
      }
      let html = this.$refs.editor.editor.txt.html()
      let content = html.substring(3, html.length - 4)

      api.createLevel(this.tid, content).then(async rsp => {
        let data = rsp.data
        if (data.code === 0) {
          let rsp = await api.levelNum(this.$route.params['tid'])
          if (rsp.data.code === 0) {
            let lastPage = rsp.data.payload
            this.getLevel(lastPage)
          }
        } else {
          this.$store.commit('errHappens', data.msg)
        }
      })
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
      this.getLevel(newPages)
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