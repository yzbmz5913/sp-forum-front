<template>
<div class="sb card">
  <ul>
    <li>通知<span class="icon iconfont icon-messagecenter"></span></li>
    <li>帖子<span class="icon iconfont icon-viewlist"></span></li>
    <li>收藏<span class="icon iconfont icon-collection"></span></li>
    <li>历史<span class="icon iconfont icon-history"></span></li>
    <li>关注<span class="icon iconfont icon-Rightarrow"></span></li>
    <li>粉丝<span class="icon iconfont icon-leftarrow"></span></li>
  </ul>
</div>
</template>

<script>
export default {
  name: "Sidebar"
}
</script>

<style scoped>
.sb{
  width: 240px;
  height: 400px;
  position: sticky;
  left: 15%;
  top: 12%;
}
.sb ul{
  --h: 360px;
  width: 100%;
  height: var(--h);
  position: absolute;
  top: calc(50% - 180px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

}
.sb ul li{
  height: 59px;
  line-height: 60px;
  width: 83%;
  color: #333;
  font-size: 18px;
  letter-spacing: 3px;
  margin-left: 20px;
  border-radius: 30px;
  user-select: none;
  padding-left: 8%;
  box-sizing: border-box;
}
.sb ul li:hover{
  cursor: pointer;
  background-color: #bbb;
}
.sb ul li span{
  position: absolute;
  right: 9%;
  font-size: 29px;
}
</style>