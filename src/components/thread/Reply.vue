<template>
  <div class="replies">
    <transition-group name="replies-change" tag="ul">
      <li v-for="reply in reps" :key="reply.rid">
        <div class="left">
          <profile size="36" :face-url="reply.owner.faceUrl"></profile>
        </div>
        <div class="right">
          <div class="content">
            <a @click="c(reply.owner.uid)">{{ reply.owner.username }}:&nbsp;</a>
            <span>
            <span v-if="reply.to!==ownerUid">回复<a @click="c(reply.to)">{{ uid2name[reply.to] }}:&nbsp;</a></span>
            {{ reply.content }}
          </span>
          </div>
          <div class="d">
            {{ relDate(reply.date) }}
          </div>
          <div class="bottom">
            <table>
              <tr>
                <td>
                <span @click="changeFav(reply)">
                  <stat class="fav" :icon="reply.fav?'icon-favorites-fill':'icon-favorites'" :text="reply.favNum"
                        fs="18"></stat>
                </span>
                </td>
                <td>
                <span @click="toggleReply(reply.owner.uid)">
                  <stat class="rsp" :icon="reply.owner.uid===replyTo?'icon-resonserate-fill':'icon-resonserate'"
                        fs="18"></stat>
                </span>
                </td>
                <td>
                <span @click="delReply(reply.rid)">
                  <stat class="bin" icon="icon-ashbin" fs="18" v-if="isSelf(reply.owner.uid)"></stat>
                </span>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </li>
    </transition-group>
    <div class="msg-box">
      <!--      <textarea cols="30" rows="4" class="ta" :placeholder="ph" v-model="text"></textarea>-->
      <editor ref="ed" toolbar_el="toolbar_el" text_el="text_el" h="130" w="650" @textChange="replyTextChange"></editor>
      <span>{{ replyLength }}/200</span>
      <btn text="回复" class="btn"></btn>
    </div>
  </div>
</template>

<script>
import Stat from "../Stat";
import Btn from "../Btn";
import Profile from "../Profile";
import utils from "../../assets/js/utils";
import Editor from "./Editor";

export default {
  name: "reply",
  components: {Editor, Profile, Btn, Stat},
  props: [
    'replies',
    'ownerUid',
    'ownerUsername',
  ],
  data() {
    return {
      reps: this.replies,
      uid2name: {},
      replyTo: this.ownerUid,
      replyLength: 0,
    }
  },
  created() {
    this.uid2name[this.ownerUid] = this.ownerUsername
    for (let reply of this.replies) {
      this.uid2name[reply.owner.uid] = reply.owner.username
    }
  },
  methods: {
    changeFav(reply) {
      if (reply.fav) {
        reply.favNum--;
      } else {
        reply.favNum++;
      }
      reply.fav = !reply.fav
    },
    isSelf(uid) {
      return true
      return uid === this.$store.state.user.uid
    },
    reply(uid) {
      this.replyTo = uid
    },
    c(uid) {
      this.$router.push(`/user/${uid}/posts`)
    },
    relDate(date) {
      return utils.abs2rel(date)
    },
    toggleReply(cur) {
      if (this.replyTo === this.ownerUid) {
        this.replyTo = cur
      } else if (this.replyTo === cur) {
        this.replyTo = this.ownerUid
      } else {
        this.replyTo = cur
      }
      let ph = document.querySelector('.msg-box #text_el .w-e-text-container .placeholder')
      ph.innerHTML = this.ph
    },
    replyTextChange(len) {
      this.replyLength = len
    },
    async delReply(rid) {
      this.$store.commit('mask', 'hover_delReply')
      window.addEventListener('mousedown', this.$store.state.lis('hover_delReply'), {capture: true})

      if (!await this.$store.state.delConfirm) return
      //todo call backend api
      let l = 0, r = this.reps.length - 1
      let res = -1
      while (l <= r) {
        let mid = Math.floor((l + r) / 2)
        let cur = this.reps[mid].rid
        if (cur === rid) {
          res = mid
          break
        } else if (cur < rid) {
          l = mid + 1
        } else r = mid - 1
      }
      if (res < 0) return
      this.reps.splice(res, 1)
    }
  },
  computed: {
    ph() {
      if (this.replyTo !== this.ownerUid) {
        return `回复 ${this.uid2name[this.replyTo]}:`
      }
      return ''
    },
  },
  mounted() {
    console.log(this.$refs)
  }
}
</script>

<style scoped>
.replies a {
  color: #2877ee;
}

.replies > ul > li {
  margin: 10px 0;
}

.replies .left {
  float: left;
  margin-right: 10px;
}

.replies .right .d {
  position: absolute;
  top: 0;
  right: 5%;
  color: #666;
}

.content {
  width: 75%;
  line-height: 1.2;
}

.bottom {
  margin-left: 75%;
  user-select: none;
  cursor: pointer;
  color: #666;
}

.bottom .rsp:hover, .bottom .bin:hover {
  color: #333;
}

.bottom .fav:hover {
  color: #DD4A68;
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

.msg-box {
  color: #333;
}

textarea {
  resize: none;
  padding: 5px;
  margin: 10px 0;
  width: 75%;
  outline: none;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  border: none;
}

.btn {
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 68%;
}

.msg-box span {
  font-size: 14px;
  position: absolute;
  left: 0;
  bottom: 8px;
}

.replies li {
  transition: all .3s;
}

.replies-change-enter, .replies-change-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.replies-change-leave-active {
  position: absolute;
}
</style>