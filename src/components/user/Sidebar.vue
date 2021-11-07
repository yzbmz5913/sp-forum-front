<template>
  <div class="sb card">
    <ul>
      <router-link v-if="authRes" :to="$route.fullPath.substring(0,$route.fullPath.lastIndexOf('/'))+'/notification'"
                   tag="li">
        通知<span class="icon iconfont icon-messagecenter"></span>
      </router-link>
      <router-link :to="$route.fullPath.substring(0,$route.fullPath.lastIndexOf('/'))+'/posts'" tag="li">
        帖子<span class="icon iconfont icon-viewlist"></span>
      </router-link>
      <router-link :to="$route.fullPath.substring(0,$route.fullPath.lastIndexOf('/'))+'/fav'" tag="li">
        收藏<span class="icon iconfont icon-collection"></span>
      </router-link>
      <router-link v-if="authRes" :to="$route.fullPath.substring(0,$route.fullPath.lastIndexOf('/'))+'/history'"
                   tag="li">
        历史<span class="icon iconfont icon-history"></span>
      </router-link>
      <router-link :to="$route.fullPath.substring(0,$route.fullPath.lastIndexOf('/'))+'/following'" tag="li">
        关注<span class="icon iconfont icon-Rightarrow"></span>
      </router-link>
      <router-link :to="$route.fullPath.substring(0,$route.fullPath.lastIndexOf('/'))+'/follower'" tag="li">
        粉丝<span class="icon iconfont icon-leftarrow"></span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      authRes: false
    }
  },
  created() {
    console.log(this.$route.params['uid'],this.$store.state.user.uid)
    this.authRes = parseInt(this.$route.params['uid'])===this.$store.state.user.uid
  },
  watch:{
    '$store.state.user'(newUser){
      console.log(this.$route.params['uid'],newUser.uid)
      this.authRes = this.$route.params['uid']===newUser.uid
    }
  }
}
</script>

<style scoped>
.sb ul {
  --h: 360px;
  width: 100%;
  height: var(--h);
  position: absolute;
  top: calc(50% - 180px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.sb ul li {
  height: 59px;
  line-height: 60px;
  width: 83%;
  color: #333;
  font-size: 18px;
  letter-spacing: 3px;
  margin-left: 20px;
  border-radius: 30px;
  user-select: none;
  padding-left: 8%;
  box-sizing: border-box;
  transition: background-color 200ms;
}

.sb ul li:hover {
  cursor: pointer;
  background-color: rgba(200, 200, 200, 0.7);
}

.sb ul li span {
  position: absolute;
  right: 9%;
  font-size: 29px;
}
</style>