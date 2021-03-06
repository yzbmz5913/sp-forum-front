<template>
  <div class="level card clearfix">
    <div class="left">
      <profile class="pro" size="60" :face-url="owner.faceUrl"></profile>
    </div>
    <div class="right">
      <div class="top">
        <span class="title">{{ owner.username }}</span>
        <span class="date">{{ relDate }}</span>
      </div>
      <div class="content" :style="{color: color}">
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
              <stat class="fav" :icon="isFav?'icon-favorites-fill':'icon-favorites'" :text="favNum" fs="18"></stat>
            </span>
            </td>
            <td>
            <span @click="toggleReply()">
              <stat class="rsp" :icon="showReplies?'icon-resonserate-fill':'icon-resonserate'" :text="replyNum"
                    fs="18"></stat>
            </span>
            </td>
            <td>
            <span v-if="isRoot" @click="changeCollect()">
              <stat class="collect" :icon="isCollect?'icon-collection-fill':'icon-collection'" fs="18"></stat>
            </span>
            </td>
            <td>
            <span v-if="owner.uid===$store.state.user.uid" @click="delLevel()">
              <stat class="bin" icon="icon-ashbin" fs="18" v-if="isSelf"></stat>
            </span>
            </td>
          </tr>
        </table>
      </div>
      <transition name="show-reply-box">
        <reply v-show="showReplies" :owner-uid="owner.uid" :owner-username="owner.username" :lid="lid"></reply>
      </transition>
    </div>
  </div>
</template>

<script>
import Profile from "../Profile";
import utils from "../../assets/js/utils";
import Stat from "../Stat";
import Reply from "./Reply";
import api from "../../assets/js/api";

export default {
  name: "level",
  components: {Reply, Stat, Profile},
  props: [
    'replyNum',
    'owner', //
    'content',
    'date',
    'images',
    'isRoot',
    'lid',
  ],
  data() {
    return {
      isFav: false,
      favNum: 0,
      showReplies: false,
      isCollect: false,
      color: '#333',
      worker: null,
    }
  },
  computed: {
    isSelf() {
      return this.owner.uid === this.$store.state.user.uid;
    },
    relDate() {
      return utils.abs2rel(this.date)
    }
  },
  methods: {
    changeFav() {
      api.fav(this.$parent['tid'], this.lid, !this.isFav).then(rsp => {
        if (rsp.data.code === 0) {
          if (this.isFav) {
            this.favNum--;
          } else {
            this.favNum++;
          }
          this.isFav = !this.isFav
        } else {
          this.$store.commit('errHappens', rsp.data.msg)
        }
      })
    },
    toggleReply() {
      this.showReplies = !this.showReplies
    },
    changeCollect() {
      api.collect(this.$parent['tid'], !this.isCollect).then(rsp => {
        if (rsp.data.code === 0) {
          this.isCollect = !this.isCollect
        } else {
          this.$store.commit('errHappens', rsp.data.msg)
        }
      })
    },
    async delLevel() {
      this.$store.commit('mask', 'hover_delLevel')
      window.addEventListener('mousedown', this.$store.state.lis('hover_delLevel'), {capture: true})

      if (!await this.$store.state.delConfirm) return
      if (this.isRoot) {
        api.delThread(this.$parent['tid']).then(rsp => {
          if (rsp.data.code !== 0) {
            this.$store.commit('errHappens', rsp.data.msg)
          }
        })
        await this.$router.push('/')
      } else {
        api.delLevel(this.lid).then(rsp => {
          if (rsp.data.code !== 0) {
            this.$store.commit('errHappens', rsp.data.msg)
          }
        })
      }
    }
  },
  created() {
    api.favNum(this.lid).then(rsp => {
      if (rsp.data.code === 0) {
        this.favNum = rsp.data.payload
      }
    })
    api.isFav(this.lid).then(rsp => {
      if (rsp.data.code === 0) {
        this.isFav = rsp.data.payload
      }
    })
    api.isCollect(this.$parent['tid']).then(rsp => {
      if (rsp.data.code === 0) {
        this.isCollect = rsp.data.payload
      }
    })
  },
  mounted() {
    let canvas = document.createElement('canvas')
    let img = document.querySelector('.thread .level .left .pro')
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
        this.color = color
      })
    }
  },
  destroyed() {
    this.worker = null
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