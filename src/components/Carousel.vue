<template>
  <div class="carousel">
    <div class="images" :style="{left: left+'px'}" @mouseover="stopTimer()" @mouseout="startTimer()">
      <img v-for="img in images" :src="img.path" alt="">
    </div>
    <div class="prev icon iconfont icon-arrow-left" @click="play(chosenIdx-1)"></div>
    <ul>
      <li v-for="(_,idx) in images" :class="{chosen: isChosen(idx)}" @click="play(idx)"></li>
    </ul>
    <div class="next icon iconfont icon-arrow-right" @click="play(chosenIdx+1)"></div>
    <div class="desc"><a @click="c(images[chosenIdx].rid)">{{ images[chosenIdx].desc }}</a></div>
  </div>
</template>

<script>
let timer = 0
export default {
  name: "Carousel",
  data() {
    return {
      images: [
        {
          path: 'https://variety.com/wp-content/uploads/2021/04/South-Park-Key-Art.jpg',
          desc: '南方公园真好看',
          rid: 1
        }, {
          path: 'https://static.onecms.io/wp-content/uploads/sites/6/2019/09/south-park-s05e08-2000.jpg',
          desc: '打电动，打电动',
          rid: 2
        }, {
          path: 'https://images-na.ssl-images-amazon.com/images/I/818NVOPboaL._RI_.jpg',
          desc: '精选剧集: S20E06',
        }, {
          path: 'https://assets-prd.ignimgs.com/2021/09/01/south-park-movies-1630505975089.jpeg',
          desc: '经典剧集: Guitar Queer\'O',
        }, {
          path: 'https://deadline.com/wp-content/uploads/2018/09/south-park-grab.jpg',
          desc: '精选剧集: S19E02',
        }
      ],
      chosenIdx: 0,
      left: 0,
    }
  },
  methods: {
    isChosen(idx) {
      return idx === this.chosenIdx
    },
    play(idx) {
      if (idx < 0) idx = this.images.length - 1
      if (idx >= this.images.length) idx = 0
      this.chosenIdx = idx
      this.left = -this.chosenIdx * 700
    },
    startTimer() {
      timer = setInterval(() => {
        this.play(this.chosenIdx + 1)
      }, 5000);
    },
    stopTimer() {
      clearInterval(timer)
    },
    c(id) {
      this.$router.push('/thread/' + id)
    }
  },
  mounted() {
    timer = setInterval(() => {
      this.play(this.chosenIdx + 1)
    }, 5000);
  }
}


</script>

<style scoped>
.carousel {
  --img-w: 700px;
  width: var(--img-w);
  height: 380px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.images {
  position: absolute;
  height: 100%;
  display: flex;
  transition: left 500ms;
}

.images img {
  width: var(--img-w);
  height: 400px;
  flex-grow: 1;
}

.carousel .prev, .carousel .next {
  position: absolute;
  top: calc(50% - 40px);
  height: 80px;
  font-size: 28px;
  color: rgba(200, 200, 200, .9);
  user-select: none;
  color: #eee;
  line-height: 80px;
  background-color: rgba(200, 200, 200, .4);
}

.carousel .prev:hover, .carousel .next:hover {
  cursor: pointer;
  background-color: rgba(200, 200, 200, .6);
}

.carousel .prev {
  width: 35px;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  padding-left: 5px;
}

.carousel .next {
  right: 0;
  width: 30px;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  padding-left: 10px;
}

.carousel ul {
  position: absolute;
  bottom: 20px;
  left: calc(50% - 37px);
  height: 10px;
}

.carousel ul li {
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: rgba(200, 200, 200, .7);
  float: left;
  margin-right: 9px;
  cursor: pointer;
}

.carousel ul li:last-child {
  margin-right: 0;
}

.carousel ul .chosen {
  background-color: rgba(230, 230, 230, .9);
}

.carousel .desc {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 50px;
  background-color: rgba(100, 100, 100, .5);
  font-size: 20px;
  font-weight: 600;
  line-height: 50px;
  padding-left: 20px;
}

.carousel .desc a {
  color: #eee;
}
</style>