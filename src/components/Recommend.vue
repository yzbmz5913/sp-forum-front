<template>
  <div id="recommend" class="clearfix">
    <div id="carousel" class="card">
      <carousel></carousel>
    </div>
    <div id="hot" class="card">
      <p>热门帖子</p>
      <ul v-if="hotPosts.length>0">
        <li v-for="post in hotPosts" class="hot-post">
          <p class="post-date">{{ post.date }}</p>
          <a @click="c(post.id)">{{ post.title }}</a>
        </li>
      </ul>
      <div class="none" v-else>还没有热门帖子...</div>
    </div>
  </div>
</template>

<script>
import Carousel from "./Carousel";
import api from "../assets/js/api";

export default {
  name: "Recommend",
  components: {
    Carousel,
  },
  data() {
    return {
      hotPosts: []
    }
  },
  methods: {
    c(id) {
      this.$router.push('/thread/' + id)
    }
  },
  created() {
    api.getHotPosts().then(rsp => {
      let data = rsp.data
      if (data.code === 0) {
        let p = data.payload
        for (let h of p) {
          this.hotPosts.push({
            date: h['date'],
            title: h['title'],
            id: h['tid'],
          })
        }
      } else {
        this.$store.commit('errHappens', "获取热门帖子失败，详细原因：" + data.msg)
      }
    })
  }
}
</script>

<style scoped>
#recommend {
  margin: 50px auto 0 auto;
  padding: 20px 0 20px 0;
  box-sizing: border-box;
  width: 70%;
}

#carousel {
  float: left;
  width: 70%;
  height: 420px;
  padding-top: 20px;
  padding-left: 20px;
  box-sizing: border-box;
}

#hot {
  float: right;
  width: 28%;
  height: 420px;
  padding: 20px 30px 30px 30px;
  box-sizing: border-box;
  font-size: 14px;
}

#hot p {
  font-weight: 600;
}

#hot .none {
  font-size: 16px;
  font-weight: 600;
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 360px;
}

#hot .post-date {
  font-size: 13px;
  margin-bottom: 5px;
  font-weight: normal;
  color: #333;
}

#hot ul li {
  height: 44px;
  margin: 15px 0;
  border-bottom: 2px solid rgba(200, 200, 200, .7);
  padding-left: 7px;
}

#hot ul li a {
  color: #2877ee;
}
</style>