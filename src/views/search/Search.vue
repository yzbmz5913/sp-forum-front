<template>
  <div class="s">
    <div class="abstract card">
      <h2>搜索结果: {{ keyword }}</h2>
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
  </div>
</template>

<script>
import Post from "../../components/Post";
import utils from "../../assets/js/utils";
import api from "../../assets/js/api";

export default {
  name: "Search",
  components: {Post},
  data() {
    return {
      keyword: '',
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
  watch: {
    '$route': {
      handler(to) {
        this.keyword = to.query['keyword']
        api.search(this.keyword, 1).then(rsp => {
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
          } else {
            this.$store.commit('errHappens', data.msg)
          }
        })
      },
      immediate: true
    }
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
            await api.search(this.keyword, this.page).then(rsp => {
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
  }
}
</script>

<style scoped>
.s {
  width: 60%;
  margin: 50px auto 20px auto;
}

.abstract {
  margin-bottom: 20px;
}

.abstract h2 {
  margin: 20px 0 20px 30px;
}

.abstract div {
  margin: 0 0 20px 30px;
}
</style>