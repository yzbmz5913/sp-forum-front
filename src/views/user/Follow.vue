<template>
  <div class="user-right">
    <ul>
      <li v-for="u in users">
        <user-card :username="u.username" :desc="u.desc" :uid="u.uid" :is-follow="u.isFollow"
                   :face-url="u.faceUrl"></user-card>
      </li>
    </ul>
  </div>
</template>

<script>
import UserCard from "../../components/user/UserCard";
import api from "../../assets/js/api";

export default {
  name: "Follower",
  components: {
    UserCard
  },
  data() {
    return {
      users: [],
    }
  },
  watch: {
    '$route': {
      handler(to, from) {
        this.users = []
        if (to.fullPath.includes('follower')) {
          api.follower().then(async rsp => {
            let data = rsp.data
            if (data.code === 0) {
              let p = data.payload
              for (let u of p) {
                let isFollow = false
                await api.isFollow(u['uid']).then(rsp => {
                  if (rsp.data.code === 0) {
                    isFollow = rsp.data.payload
                  }
                })
                this.users.push({
                  uid: u['uid'],
                  username: u['username'],
                  faceUrl: u['face_url'],
                  desc: u['desc'],
                  isFollow: isFollow,
                })
              }
            } else {
              this.$store.commit('errHappens', '关注列表获取失败，详细原因：' + data.msg)
            }
          })
        } else {
          api.following().then(rsp => {
            let data = rsp.data
            if (data.code === 0) {
              let p = data.payload
              for (let u of p) {
                this.users.push({
                  uid: u['uid'],
                  username: u['username'],
                  faceUrl: u['face_url'],
                  desc: u['desc'],
                  isFollow: true,
                })
              }
            } else {
              this.$store.commit('errHappens', '粉丝列表获取失败，详细原因：' + data.msg)
            }
          })
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>