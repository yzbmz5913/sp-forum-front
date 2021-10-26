<template>
  <div class="level card clearfix">
    <div class="left">
      <profile class="pro" size="60" :face-url="faceUrl"></profile>
    </div>
    <div class="right">
      <div class="top">
        <span class="title">{{ owner.username }}</span>
        <span class="date">{{ relDate }}</span>
      </div>
      <div class="content">
        {{ content }}
      </div>
      <div class="images">
        <img v-for="url in images" :src="url" alt="">
      </div>
      <div class="bottom">
        <table>
          <tr>
            <td>
            <span @click="changeFav()">
              <stat class="fav" :icon="isFav?'icon-favorites-fill':'icon-favorites'" :text="cnt" fs="18"></stat>
            </span>
            </td>
            <td>
            <span @click="toggleReply()">
              <stat class="rsp" :icon="showReplies?'icon-resonserate-fill':'icon-resonserate'" :text="replyNum"
                    fs="18"></stat>
            </span>
            </td>
            <td>
            <span @click="changeCollect()">
              <stat class="collect" :icon="isCollect?'icon-collection-fill':'icon-collection'" fs="18"></stat>
            </span>
            </td>
            <td>
            <span @click="">
              <stat class="bin" icon="icon-ashbin" fs="18" v-if="isSelf"></stat>
            </span>
            </td>
          </tr>
        </table>
      </div>
      <transition name="show-reply-box">
        <reply v-show="showReplies" :owner-uid="owner.uid" :owner-username="owner.username" :replies="replies"></reply>
      </transition>
    </div>
  </div>
</template>

<script>
import Profile from "../Profile";
import utils from "../../assets/js/utils";
import Stat from "../Stat";
import Reply from "./Reply";

export default {
  name: "level",
  components: {Reply, Stat, Profile},
  props: ['faceUrl',
    'fav',
    'favNum',
    'replyNum',
    'owner', //
    'content',
    'date',
    'replies',
    'images',
  ],
  data() {
    return {
      isFav: this.fav,
      cnt: this.favNum,
      showReplies: true,
      isCollect: false,
    }
  },
  computed: {
    isSelf() {
      return true
      return this.owner.uid === this.$store.state.user.uid;
    },
    relDate() {
      return utils.abs2rel(this.date)
    }
  },
  methods: {
    changeFav() {
      //call fav api
      if (this.isFav) {
        this.cnt--;
      } else {
        this.cnt++;
      }
      this.isFav = !this.isFav
    },
    toggleReply() {
      this.showReplies = !this.showReplies
    },
    changeCollect() {
      //call collect api
      this.isCollect = !this.isCollect
    }
  }
}
</script>

<style scoped>
.level {
  width: 60%;
  margin: 0 auto 20px auto;
  padding: 10px;
  box-sizing: border-box;
}

.level .left {
  float: left;
  width: 9%;
  box-sizing: border-box;
  padding-left: 8px;
}

.level .right {
  float: right;
  width: 91%;

}

.level .right .images img {
  max-width: 90%;
}

.level .title {
  font-weight: 600;
  color: #333;
}

.level .date {
  color: #666;
  position: absolute;
  top: 0;
  right: 5%;
}

.content {
  width: 70%;
  margin: 24px 0;
  line-height: 1.2;
}

.bottom {
  width: 18%;
  margin-top: 10px;
  margin-left: 75%;
  user-select: none;
  cursor: pointer;
  color: #666;
}

table {
  width: 180px;
}

table tr td:nth-child(1) {
  width: 36%;
}

table tr td:nth-child(2) {
  width: 24%;
}

.bottom .rsp:hover, .bottom .bin:hover {
  color: #333;
}

.bottom .fav:hover {
  color: #DD4A68;
}

.show-reply-box-enter-active, .show-reply-box-leave-active {
  transition: all .2s;
}

.show-reply-box-enter, .show-reply-box-leave-to {
  transform: translateY(-10%);
  opacity: 0;
}
</style>