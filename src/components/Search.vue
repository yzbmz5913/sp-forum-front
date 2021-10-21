<template>
  <div class="search">
    <input type="text" placeholder="搜索...">
    <div class="search-btn icon iconfont icon-search"></div>
  </div>
</template>

<script>
export default {
  name: "Search"
}
</script>

<style scoped>
.search{
  font-size: 14px;
  position: relative;
}
.search input {
  display: block;
  height: 30px;
  width: 240px;
  border: 1px solid #bebebe;
  border-radius: 2px;
  box-sizing: border-box;
  text-indent: 0.5em;
  font-size: 13px;
  color: #666;
  outline: none;
  caret-color: #2877ee;
}

.search .search-btn {
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
  font-size: 20px;
  line-height: 30px;
  height: 30px;
  width: 30px;
  color: #bebebe;
}

.search .search-btn:hover{
  background-color: #bbb;
  color: #999;
}
</style>