<template>
  <div class="search">
    <input type="text" placeholder="搜索..." v-model="keyword" @keydown.enter="search()">
    <div class="search-btn icon iconfont icon-search" @click="search()"></div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
    search() {
      if (!this.keyword) return
      this.$router.push('/search?keyword=' + this.keyword)
      this.keyword = ''
    }
  }
}
</script>

<style scoped>
.search {
  font-size: 14px;
  position: relative;
}

.search input {
  display: block;
  height: 30px;
  width: 240px;
  border: 1px solid #bebebe;
  border-radius: 4px;
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
  cursor: pointer;
}

.search .search-btn:hover {
  background-color: #bbb;
  color: #999;
}
</style>