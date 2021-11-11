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
import api from "../../assets/js/api";

export default {
  name: "Fav",
  components: {
    Post,
  },
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    numFlow(num) {
      return utils.numFlow(num)
    }
  },
  created() {
    api.collection().then(rsp => {
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
  }
}
</script>

<style scoped>

</style>