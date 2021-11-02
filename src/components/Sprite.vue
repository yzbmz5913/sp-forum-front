<template>
  <div class="sp" @click="move()">
    <svg xmlns="http://www.w3.org/2000/svg" height="500" width="380">
      <g id="leg">
        <path d="M53,430 a600,600 0 0,0 -3,52 l220,0 a600,600 0 0,0 -3,-52" fill="rgb(87,107,168)"/>
        <path d="M32,485 a800,800 0 0,1 135,1 a200,200 0 0,0 -135,-1" stroke="rgb(52,45,52)" fill="rgb(52,45,52)"
              stroke-width="4" stroke-linecap="round"></path>
        <path d="M156,486 a800,800 0 0,1 135,2 a200,200 0 0,0 -135,-2" stroke="rgb(52,45,52)" fill="rgb(52,45,52)"
              stroke-width="4" stroke-linecap="round"></path>
      </g>

      <g id="cloth" :transform="`rotate(${isAni?'-2':'0'} 160,405)`" style="transition: all 400ms">
        <path d="M70,310 a500,500 0 0,0 -30,132 a460,460 0 0,0 240,5 a500,500 0 0,0 -30,-132 Z"
              fill="rgb(160,94,82)"/>
        <line x1="160" y1="366" x2="154" y2="458" stroke-width="4" stroke="rgb(13,6,3)"></line>
        <circle r="4" cx="146" cy="374" fill="rgb(13,6,3)"/>
        <circle r="4" cx="144" cy="405" fill="rgb(13,6,3)"/>
        <circle r="4" cx="142" cy="442" fill="rgb(13,6,3)"/>
        <g id="left-arm">
          <path fill="rgb(160,94,82)" d="M66,310 a220,220 0 0,0 -45,116 l40,5 a300,300 0 0,0 38,-116"></path>
          <path stroke="rgb(52,34,37)" d="M60,431 a300,300 0 0,1 10,-52"></path>
          <circle r="25" fill="rgb(215,33,64)" cx="43" cy="420"></circle>
          <circle r="11" fill="rgb(215,33,64)" cx="60" cy="413" stroke="rgb(132,32,51)" stroke-width="1.5"></circle>
        </g>
        <g id="right-arm" :transform="`rotate(${isAni?'-115':'0'} 256,325)`" style="transition: all 400ms">
          <path fill="rgb(160,94,82)" d="M254,310 a220,220 0 0,1 45,116 l-36,5 a300,300 0 0,1 -36,-116"></path>
          <path stroke="rgb(52,34,37)" d="M260,431 a300,300 0 0,0 -10,-52" v-show="!isAni"/>
          <circle r="25" fill="rgb(215,33,64)" cx="278" cy="424"></circle>
          <circle r="11" :transform="`rotate(${isAni?'-90':'0'} 278,424)`" fill="rgb(215,33,64)" cx="260" cy="417" stroke="rgb(132,32,51)"
                  stroke-width="1.5"></circle>
        </g>
        <ellipse cx="112" cy="340" rx="54" ry="14" transform="rotate(25 112,340)" fill="rgb(210,30,64)"/>
        <ellipse cx="209" cy="342" rx="54" ry="14" transform="rotate(-24 209,342)" fill="rgb(210,30,64)"/>
      </g>

      <g id="head" :transform="isAni?'translate(-3 0)rotate(-2 160,215)':''" style="transition: all 400ms">
        <circle cx="160" cy="200" r="152" fill="#fcdab3"/>
        <path d="M8,186 A140,140 0 0,1 312,186 A450,450 0 0,0 8,186 Z"
              fill="rgb(87,107,168)"/>
        <path d="M2,191 L3,157 A450,450 60 0,1 317,157 L318,191 A450,450 0 0,0 2,191 Z"
              fill="rgb(210,30,64)"/>
        <g transform="translate(1 0)">
          <path stroke="rgb(132,32,51)" d="M126,30 l60,0 a3.5,3.5 0 0,1 0,7 l-60,0 a3.5,3.5 0 0,1 0,-7 Z"
                fill="rgb(230,36,73)"/>
        </g>
        <g transform="rotate(45 156,34)">
          <path stroke="rgb(132,32,51)" d="M126,30 l60,0 a3.5,3.5 0 0,1 0,7 l-60,0 a3.5,3.5 0 0,1 0,-7 Z"
                fill="rgb(230,36,73)"/>
        </g>
        <g transform="rotate(160 156,34)translate(1 0)">
          <path stroke="rgb(132,32,51)" d="M126,30 l60,0 a3.5,3.5 0 0,1 0,7 l-60,0 a3.5,3.5 0 0,1 0,-7 Z"
                fill="rgb(230,36,73)"/>
        </g>
        <g transform="rotate(135 156,34)">
          <path stroke="rgb(132,32,51)" d="M126,30 l60,0 a3.5,3.5 0 0,1 0,7 l-60,0 a3.5,3.5 0 0,1 0,-7 Z"
                fill="rgb(230,36,73)"/>
        </g>
        <g transform="rotate(115 156,34)">
          <path stroke="rgb(132,32,51)" d="M126,30 l60,0 a3.5,3.5 0 0,1 0,7 l-60,0 a3.5,3.5 0 0,1 0,-7 Z"
                fill="rgb(230,36,73)"/>
        </g>
        <g transform="rotate(90 156,34)">
          <path stroke="rgb(132,32,51)" d="M126,30 l60,0 a3.5,3.5 0 0,1 0,7 l-60,0 a3.5,3.5 0 0,1 0,-7 Z"
                fill="rgb(230,36,73)"/>
        </g>
        <g transform="rotate(70 156,34)translate(0 1)">
          <path stroke="rgb(132,32,51)" d="M126,30 l60,0 a3.5,3.5 0 0,1 0,7 l-60,0 a3.5,3.5 0 0,1 0,-7 Z"
                fill="rgb(230,36,73)"/>
        </g>
        <g transform="rotate(25 156,34)translate(-1 0)">
          <path stroke="rgb(132,32,51)" d="M126,30 l60,0 a3.5,3.5 0 0,1 0,7 l-60,0 a3.5,3.5 0 0,1 0,-7 Z"
                fill="rgb(230,36,73)"/>
        </g>

        <ellipse rx="50" ry="42" cx="117" cy="212" fill="#fefefe" transform="rotate(-50 117,212)"/>
        <ellipse rx="50" ry="42" cx="205" cy="213" fill="#fefefe" transform="rotate(54, 205,213)"/>
        <circle id="left-eye" :cx="cx1" :cy="cy1" r="5" fill="rgb(39,29,35)"/>
        <circle id="right-eye" :cx="cx2" :cy="cy2" r="5" fill="rgb(39,29,35)"/>
        <path stroke="rgb(41,36,32)" :d="hasErr?'M135,318 a50,50 0 0,1 50,4':'M135,311 a50,50 0 0,0 50,4'" fill="none" stroke-width="2"/>
      </g>
    </svg>
    <div class="bubble" v-show="isAni">
      <div :style="{color: hasErr?'#dd4a68':'#333'}">{{message}}</div>
    </div>
  </div>
</template>

<script>
let timer
export default {
  name: "Sprite",
  data() {
    return {
      cx1: 134,//116
      cy1: 216,
      cx2: 188,//206
      cy2: 217,

      isAni: false,
      hasErr: false,
      messages: [
          '你好！我是坦坦(Stan)，是本站的向导~',
          '我也是作者一行行写出来的哦，花了一整个通宵呢',
          '登录可以体验完整功能哦',
          '登出按钮在右上角！鼠标经过头像即可显示',
          '我想，作者创造我与其说是为了实用，不如说是为了炫技...',
          '为了方便使用，登录注册流程的复杂度已经最小化！（其实是作者懒得弄）',
          '点击右上角进入个人页，可以编辑头像等个人资料',
          '在帖子中，你的发言字体颜色是头像的主题色！所以建议头像色调不要太淡',
          '我喜欢Kyle，我在第16季向他表白了！',
          '我觉得Cartman对Butters绝对有意思...',
          'Kenny好久没当主角了，好可怜',
          '我不明白为什么那么多人磕我和Craig，因为我们的帽子都是蓝色的吗？',
      ],
      message: '',
      timer: null,
    }
  },
  methods: {
    move(){
      if(this.isAni)return
      this.message=this.messages[Math.floor(Math.random()*this.messages.length)]
      this.isAni = true
      clearInterval(this.timer)
      setTimeout(()=>{
        this.isAni=false
      },4000)
      this.timer = setInterval(()=>{
        this.message=this.messages[Math.floor(Math.random()*this.messages.length)]
        this.isAni=true
        setTimeout(()=>{
          this.isAni=false
        },4000)
      },10000)
    }
  },
  mounted() {
    document.addEventListener('mousemove', (e) => {
      let x = e.clientX, y = e.clientY
      let rect = document.querySelector('#app .spr').getBoundingClientRect()
      let l = rect.left, r = rect.left + rect.width, t = rect.top, b = rect.top + rect.height
      let cx = l + rect.width / 2, cy = t + rect.height / 2
      if (x >= l && x <= r && y <= b && y >= t) {
        [this.cx1, this.cy1, this.cx2, this.cy2] = [134, 216, 188, 217]
      } else {
        let dx = x - cx, dy = cy - y
        let theta = Math.atan2(dy, dx);
        let c = Math.cos(theta), s = Math.sin(theta)
        const r = 20;
        [this.cx1, this.cy1, this.cx2, this.cy2] = [
          116 + r * c, 216 - r * s, 206 + r * c, 217 - r * s
        ]
      }
    })
    setTimeout(()=>{
      this.message=this.messages[0]
      this.isAni=true
      setTimeout(()=>{
        this.isAni=false
      },4000)
      this.timer = setInterval(()=>{
        this.message=this.messages[Math.floor(Math.random()*this.messages.length)]
        this.isAni=true
        setTimeout(()=>{
          this.isAni=false
        },4000)
      },10000)
    },1000)
  },
  watch:{
    '$store.state.errMessage'(newMsg, oldMsg){
      if(newMsg){
        this.hasErr = true
        this.message = newMsg
        this.isAni = true
        clearInterval(this.timer)
        setTimeout(()=>{
          this.isAni=false
          this.hasErr=false
        },4000)
        this.timer = setInterval(()=>{
          this.message=this.messages[Math.floor(Math.random()*this.messages.length)]
          this.isAni=true
          setTimeout(()=>{
            this.isAni=false
          },4000)
        },10000)
      }
    }
  }
}
</script>

<style scoped>
.bubble{
  font-size: 30px;
  width: 340px;
  background-color: rgba(244,244,244,0.8);
  position: absolute;
  top: -150px;
  right: 60px;
  box-shadow: 2px 2px 4px rgba(100,100,100,0.3);
  box-sizing: border-box;
  padding: 16px;
  line-height: 1.3;
}
</style>