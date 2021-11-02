<template>
<div class="b">
  <ul>
    <router-link class="card" tag="li" to="login"><div>登&nbsp;&nbsp;录</div></router-link>
    <router-link class="card" tag="li" to="register"><div>注&nbsp;&nbsp;册</div></router-link>
  </ul>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>
</template>

<script>
export default {
  name: "Base"
}
</script>

<style scoped>
.b{
  position: fixed;
  top: 150px;
  left: calc(50% - 200px);
  width: 400px;
}
.b ul{
  display: flex;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 20px;
}
.b ul li{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  color: #333;
  cursor: pointer;
  user-select: none;
}
</style>