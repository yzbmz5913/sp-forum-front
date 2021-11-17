<template>
  <div class="replies">
    <transition-group name="replies-change" tag="ul">
      <li v-for="reply in replies" :key="reply.rid">
        <div class="left">
          <profile class="pro" size="36" :face-url="reply.owner.faceUrl"></profile>
        </div>
        <div class="right">
          <div class="content">
            <a @click="c(reply.owner.uid)">{{ reply.owner.username }}:&nbsp;</a>
            <span>
              <span v-if="reply.to!==ownerUid">回复<a @click="c(reply.to)">{{ uid2name[reply.to] }}:&nbsp;</a></span>
              <span :class="'reply_'+reply.owner.uid">{{ reply.content }}</span>
            </span>
          </div>
          <div class="d">
            {{ relDate(reply.date) }}
          </div>
          <div class="bottom">
            <table>
              <tr>
                <td>
                <span @click="toggleReply(reply.owner.uid)">
                  <stat class="rsp" :icon="reply.owner.uid===replyTo?'icon-resonserate-fill':'icon-resonserate'"
                        fs="18"></stat>
                </span>
                </td>
                <td>
                <span v-if="reply.owner.uid===$store.state.user.uid" @click="delReply(reply.rid)">
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
      <editor ref="ed" toolbar_el="toolbar_el" text_el="text_el" h="130" w="650" @textChange="replyTextChange"></editor>
      <span>{{ content.length }}/200</span>
      <btn text="回复" class="btn" @click.native="sendReply(content,replyTo)"></btn>
    </div>
  </div>
</template>

<script>
import Stat from "../Stat";
import Btn from "../Btn";
import Profile from "../Profile";
import utils from "../../assets/js/utils";
import Editor from "./Editor";
import api from "../../assets/js/api";

export default {
  name: "reply",
  components: {Editor, Profile, Btn, Stat},
  props: [
    'ownerUid',
    'ownerUsername',
    'lid',
  ],
  data() {
    return {
      replies: [],
      uid2name: {},
      replyTo: this.ownerUid,
      content: '',
      triggered: false,
    }
  },
  created() {
    this.uid2name[this.ownerUid] = this.ownerUsername
    for (let reply of this.replies) {
      this.uid2name[reply.owner.uid] = reply.owner.username
    }
  },
  methods: {
    isSelf(uid) {
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
    replyTextChange(content) {
      this.content = content
    },
    async delReply(rid) {
      this.$store.commit('mask', 'hover_delReply')
      window.addEventListener('mousedown', this.$store.state.lis('hover_delReply'), {capture: true})

      if (!await this.$store.state.delConfirm) return
      api.delReply(rid).then(rsp => {
        if (rsp.data.code === 0) {
          let l = 0, r = this.replies.length - 1
          let res = -1
          while (l <= r) {
            let mid = Math.floor((l + r) / 2)
            let cur = this.replies[mid].rid
            if (cur === rid) {
              res = mid
              break
            } else if (cur < rid) {
              l = mid + 1
            } else r = mid - 1
          }
          if (res < 0) return
          this.replies.splice(res, 1)
        } else {
          this.$store.commit('errHappens', rsp.data.msg)
        }
      })
    },
    sendReply(lid, content, replyTo) {
      api.createReply(lid, content, replyTo).then(rsp => {
        let data = rsp.data
        if (data.code === 0) {
          let p = data.payload
          this.replies.push({
            rid: p.rid,
            owner: {
              uid: p.author.uid,
              username: p.author.username,
              faceUrl: p.author.face_url,
            },
            to: p.to.uid,
            content: p.content,
            date: p.date,
            fav: p.fav,
            favNum: 0,
          })
        } else {
          this.$store.commit('errHappens', data.msg)
        }
      })
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
    let canvas = document.createElement('canvas')
    let imgs = document.querySelector('.level .replies').getElementsByClassName('pro')
    let userSet = new Set()
    for (let idx = 0; idx < imgs.length; idx++) {
      let img = imgs[idx]
      let uid = this.replies[idx].owner.uid
      if (userSet.has(uid)) continue
      userSet.add(uid)
      img.setAttribute('crossOrigin', '')
      let ctx = canvas.getContext('2d')
      img.onload = () => {
        ctx.drawImage(img, 0, 0, img.width, img.height)
        this.worker = this['$worker'].run((data) => {
          function ColorBox(colorRange, total, data) {
            this.total = total
            this.data = data
          }

          ColorBox.prototype.getColor = function () {
            let total = this.total
            let data = this.data
            let redCount = 0, greenCount = 0, blueCount = 0
            for (let i = 0; i < total; i++) {
              redCount += data[i * 4]
              greenCount += data[i * 4 + 1]
              blueCount += data[i * 4 + 2]
            }
            return [Math.round(redCount / total), Math.round(greenCount / total), Math.round(blueCount / total)]
          }
          let total = data.length / 4
          let rMin = 255, rMax = 0,
              gMin = 255, gMax = 0,
              bMin = 255, bMax = 0
          for (let i = 0; i < total; i++) {
            let red = data[i * 4], green = data[i * 4 + 1], blue = data[i * 4 + 2]
            if (red < rMin) rMin = red
            if (red > rMax) rMax = red
            if (green < gMin) gMin = green
            if (green > gMax) gMax = green
            if (blue < bMin) bMin = blue
            if (blue > bMax) bMax = blue
          }
          let colorRange = [[rMin, rMax], [gMin, gMax], [bMin, bMax]]
          let colorBox = new ColorBox(colorRange, total, data)
          return colorBox.getColor()
        }, [ctx.getImageData(0, 0, img.width, img.height).data]).then(res => {
          let color = '#'
          for (let c of res) {
            c = Math.floor(c * 0.9)
            let hex = c['toString'](16)
            if (hex.length === 1) hex = '0' + hex
            color += hex
          }
          document.querySelector('.replies .right .content .reply_' + this.replies[idx].owner.uid).style.color = color
        })
      }
    }
  },
  watch: {
    '$parent.showReplies'() {
      if (this.triggered) return
      this.triggered = true
      api.getReply(this.lid).then(rsp => {
        let data = rsp.data
        if (data.code === 0) {
          let p = data.payload
          for (let reply of p) {
            this.replies.push({
              rid: reply['rid'],
              to: reply['toAuthor']['uid'],
              content: reply['content'],
              date: reply['date'],
              owner: {
                uid: reply['author']['uid'],
                username: reply['author']['username'],
                faceUrl: reply['author']['face_url']
              }
            })
          }
        } else {
          this.$store.commit('errHappens', data.msg)
        }
      })
    }
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