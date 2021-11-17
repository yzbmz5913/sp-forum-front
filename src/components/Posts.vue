<template>
  <div class="posts">
    <ul>
      <li v-for="post in posts">
        <post :id="post.tid"
              :title="post.title"
              :abstract="post.abstract"
              :reply="numFlow(post.reply)"
              :visit="numFlow(post.visit)"
              :date="post.date"
              :images="post.images"
              :owner="post.owner"
        ></post>
      </li>
    </ul>
    <loading class="loading" v-show="isLoading"></loading>
  </div>
</template>

<script>
import Post from "./Post";
import utils from "../assets/js/utils";
import Loading from "./Loading";
import api from "../assets/js/api";

export default {
  name: "Posts",
  components: {
    Loading,
    Post,
  },
  data() {
    return {
      posts: [],
      isLoading: false,
      page: 2,
    }
  },
  methods: {
    numFlow(num) {
      return utils.numFlow(num)
    },
  },
  created() {
    api.getPosts(1).then(rsp => {
      let data = rsp.data
      if (data.code === 0) {
        let p = data.payload
        for (let post of p) {
          let content = post['abstract']
          let images = []
          let m = content.match(/<img>.*?<\/img>/)
          if (m !== null) {
            for (let match of m) {
              let url = match.substring(5, match.length - 6)
              images.push(url)
            }
          }
          content = content.replaceAll(/<img>.*?<\/img>/g, '[图片]')
          content = content.replaceAll(/<(.+)>(.*?)<\/\1>/g, '$2')
          this.posts.push({
            tid: post['tid'],
            title: post['title'],
            abstract: content,
            owner: {
              uid: post['author']['uid'],
              username: post['author']['username'],
              faceUrl: post['author']['face_url'],
            },
            reply: post['reply_num'],
            visit: post['visit_num'],
            date: post['last_modify'],
            images: images
          })
        }
        this.page++
      }
    })
  },
  mounted() {
    let timer = null
    let lis = () => {
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;// 视口高度
      if (!timer) {
        timer = setTimeout(async () => {
          let documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;// 页面高度
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;// 滚动条位置
          if ((windowHeight + scrollTop + 2) >= documentHeight) {
            this.isLoading = true
            await api.getPosts(this.page).then(rsp => {
              let data = rsp.data
              if (data.code === 0) {
                let p = data.payload
                if (p.length === 0) {
                  window.removeEventListener('scroll', lis)
                  this.$store.commit('errHappens', '已经到底了！')
                  this.isLoading = false
                  return
                }
                for (let post of p) {
                  let content = post['abstract']
                  let images = []
                  for (let match of content.match(/<img>.*?<\/img>/)) {
                    let url = match.substring(5, match.length - 6)
                    images.push(url)
                  }
                  content = content.replaceAll(/<img>.*?<\/img>/, '[图片]')
                  content = content.replaceAll(/<(.+)>(.*?)<\/\1>/, '$2')
                  this.posts.push({
                    title: post['title'],
                    abstract: content,
                    owner: {
                      uid: post['author']['uid'],
                      username: post['author']['username'],
                      faceUrl: post['author']['face_url'],
                    },
                    reply: post['reply_num'],
                    visit: post['visit_num'],
                    date: post['last_modify'],
                    images: images
                  })
                }
                this.page++
              } else {
                this.$store.commit('errHappens', data.msg)
              }
              this.isLoading = false
            })
          }
          timer = null
        }, 1000)
      }
    }
    window.addEventListener('scroll', lis)
  },
}
</script>

<style scoped>
.posts {
  margin: 0 auto;
  width: 70%;
}

.posts ul {
  z-index: 5;
}

.posts .loading {
  height: 120px;
  width: 120px;
  position: fixed;
  bottom: 0;
  left: calc(50% - 60px);
}
</style>