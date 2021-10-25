<template>
  <div class="nt card">
    <div class="pro" @click="c()">
      <profile size="66" :face-url="from.faceUrl"></profile>
    </div>
    <div class="right">
      <div class="abstract">
        <a href="#" @click="c()">{{ from.name }}&nbsp;</a>
        <span v-if="type===1">关注了你</span>
        <span v-else>{{ action }}了你的帖子<a href="#"
                                         @click="$router.push('/thread/'+post.id)">&nbsp;{{ post.title }}</a></span>
      </div>
      <div class="content ellipsis" v-if="type===3">
        {{ content }}
      </div>
    </div>
    <stat icon="icon-calendar" fs="13" :text="relDate" class="date"></stat>
  </div>
</template>

<script>
import Profile from "../Profile";
import Stat from "../Stat";
import utils from "../../assets/js/utils";

export default {
  name: "Notification",
  components: {Stat, Profile},
  props: [
    'type',
    'from', //包括{name, uid,faceUrl}
    'post', //包括{title, id}
    'content',
    'date',
  ],
  computed: {
    action() {
      switch (this.type) {
        case 2:
          return '点赞'
        case 3:
          return '回复'
      }
    },
    relDate() {
      return utils.abs2rel(this.date)
    }
  },
  methods: {
    c() {
      this.$router.push(`/user/${this.from.uid}/posts`)
    }
  }
}
</script>

<style scoped>
.nt {
  width: 100%;
  height: 90px;
  position: relative;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
}

.pro {
  position: absolute;
  left: 3%;
}

.nt .right {
  position: absolute;
  left: 15%;
  width: 60%;
}

.nt .abstract a {
  color: #2877ee;
}

.nt .right {
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}

.nt .date {
  position: absolute;
  right: 5%;
}
</style>