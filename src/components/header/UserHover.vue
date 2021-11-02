<template>
  <div class="uh"
       :style="{width: `${w}px`, color: c}">
    <span class="icon iconfont icon-dengchu" @click="logout()"></span>
  </div>
</template>

<script>
export default {
  name: "UserHover",
  data() {
    return {
      w: 36,
      c: 'rgba(188,188,188,0)',
    }
  },
  methods: {
    logout() {
      //logout api
      localStorage.removeItem('jwt')
      location.reload()
    }
  }
}
</script>

<style scoped>
.uh {
  height: 36px;
  border-radius: 18px;
  position: relative;
  box-shadow: 0 0 5px rgba(100, 100, 100, 0.4) inset;
  transition: all 400ms;
}

.uh span {
  font-size: 20px;
  line-height: 36px;
  position: absolute;
  right: 8px;
}

.uh span:hover {
  cursor: pointer;
  color: rgb(144, 144, 144);
}
</style>