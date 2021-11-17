<template>
  <div class="user-right">
    <ul>
      <li v-for="n in notices">
        <nt :post="n.post" :content="n.content" :from="n.from" :type="n.type" :date="n.date"></nt>
      </li>
    </ul>
  </div>
</template>

<script>
import nt from "../../components/user/Notification";
import api from "../../assets/js/api";

export default {
  name: "Notification",
  components: {
    nt
  },
  data() {
    return {
      notices: []
    }
  },
  created() {
    api.notifications().then(rsp => {
      let data = rsp.data
      if (data.code === 0) {
        let p = data.payload
        for (let nt of p) {
          this.notices.push({
            type: nt['type'],
            date: nt['date'],
            from: {
              uid: nt['from']['uid'],
              username: nt['from']['username'],
              faceUrl: nt['from']['face_url']
            },
            content: nt['content'],
            post: {
              title: nt['title'],
              tid: nt['tid']
            }
          })
        }
      } else {
        this.$store.commit('errHappens', data.msg)
      }
    })
  }
}
</script>

<style scoped>

</style>