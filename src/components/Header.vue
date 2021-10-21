<template>
  <div id="header">
    <img src="../assets/img/logo.png" alt="logo" id="logo">
    <span class="logo-text">南方公园主题站</span>
    <div class="s">
      <search></search>
    </div>
    <div class="p">
      <profile size="36" face-url="../assets/img/face.jpg"></profile>
    </div>
  </div>
</template>

<script>
import Search from "./Search";
import Profile from "./Profile";
export default {
  name: "Header",
  components:{
    Search,
    Profile
  }
}
</script>

<style scoped>
#header{
  z-index: 2;
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 50px;
  box-shadow: 0 2px 2px rgba(100,100,100,0.15);
  background-color: #f6f6f6;
}
#logo{
  padding-left: 100px;
  padding-right: 20px;
  height: 90%;
}
.logo-text{
  font-size: 26px;
  font-weight: 600;
}
.s{
  position: absolute;
  right: 260px;
  padding-right: 15px;
}
.p {
  position: absolute;
  right: 220px;
}
</style>