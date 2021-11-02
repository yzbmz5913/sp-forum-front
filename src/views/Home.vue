<template>
  <div class="home">
    <recommend></recommend>
    <posts></posts>
    <side-tool :count="2" class="st">
      <template slot="slot_0">
        <div class="container" @click="createThread()">
          <span class="icon-chuangzuo" style="font-size: 30px"></span>
        </div>
      </template>
      <template slot="slot_1">
        <div class="container" @click="top()">
          <span class="icon-arrow-up" style="font-size: 42px"></span>
        </div>
      </template>
    </side-tool>

    <hover-box id="hover_threadCreator" t="100" w="800">
      <template v-slot:content>
        <div id="te">
          <input type="text" class="t" placeholder="标题..." autofocus="autofocus">
          <editor ref="editor" class="e" el="thread_editor" h="300" w="700"></editor>
        </div>
      </template>
    </hover-box>
  </div>
</template>

<script>
import Recommend from "../components/Recommend";
import Posts from "../components/Posts";
import SideTool from "../components/SideTool";
import HoverBox from "../components/HoverBox";
import Editor from "../components/thread/Editor";

export default {
  name: 'Home',
  components: {
    Recommend,
    Posts,
    SideTool,
    HoverBox,
    Editor,
  },
  methods:{
    async createThread() {
      this.$store.commit('mask', 'hover_threadCreator')
      window.addEventListener('mousedown', this.$store.state.lis('hover_threadCreator'), {capture: true})
      if(!await this.$store.state.delConfirm){
        return
      }
      let title = document.querySelector('#hover_threadCreator #te input[type=text]').value
      let html = this.$refs.editor.editor.txt.html();
      let content = html.substring(3, html.length - 4)
      // todo call post thread API
    },
    top() {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>
<style scoped>
.st {
  position: fixed;
  right: calc(15% - 45px);
  bottom: 20%;
}
#hover_threadCreator {
  color: #444;
}

#hover_threadCreator .t {
  display: block;
  height: 40px;
  width: 700px;
  border: none;
  outline: none;
  font-size: 23px;
  font-weight: bold;
  line-height: 40px;
  background-color: rgba(0, 0, 0, 0.1);
  text-indent: 15px;
  margin: 25px auto 15px auto;
}

#hover_threadCreator #te {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
</style>