<template>
<div class="pa card">
  <div class="cnt">
    <span>共{{totalPage}}页</span>
    <ul>
      <li class="icon iconfont icon-double-arrow-left" :class="{disable:$parent['curPage']===1}" @click="$parent['curPage']=1"></li>
      <li class="icon iconfont icon-arrow-left" :class="{disable:$parent['curPage']===1}" @click="$parent['curPage']--"></li>
      <li v-for="pItem in $parent['pageNums']" :class="{chosen: pItem===$parent['curPage']}" @click="$parent['curPage']=pItem">{{pItem}}</li>
      <li class="icon iconfont icon-arrow-right" :class="{disable:$parent['curPage']===totalPage}" @click="$parent['curPage']++"></li>
      <li class="icon iconfont icon-double-arro-right" :class="{disable:$parent['curPage']===totalPage}" @click="$parent['curPage']=totalPage"></li>
    </ul>
    <input type="text" placeholder="跳转" @keydown.enter="down()" v-model="inputPage">
  </div>

</div>
</template>

<script>
export default {
  name: "Pager",
  props: ['totalPage'],
  data(){
    return {
      inputPage: '',
    }
  },
  methods:{
    down(){
      this.$parent['curPage'] = +this.inputPage
      this.inputPage = ''
    }
  }
}
</script>

<style scoped>
.pa{
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.pa ul{
  display: inline-block;
}
.pa ul li{
  height: 30px;
  width: 30px;
  display: inline-block;
  margin: 0 5px;
  color: #666;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
}
.pa ul li:hover,.pa ul li.chosen{
  cursor: pointer;
  color: #333;
  background-color: rgba(100,100,100,0.2);
}
.pa ul li.disable{
  cursor: auto;
  color: #bbb;
  background-color: unset;
}
.pa input{
  width: 40px;
  height: 30px;
  font-size: 13px;
  padding-left: 5px;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: rgba(0,0,0,0.1);
}
</style>