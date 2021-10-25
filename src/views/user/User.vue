<template>
  <div>
    <user-bar></user-bar>
    <div class="user-info clearfix">
      <sidebar class="sb"></sidebar>
      <div style="height: 500px;display: inline-block"></div>
      <!--    <keep-alive>-->
      <router-view class="user-right"></router-view>
      <!--    </keep-alive>-->
    </div>
  </div>
</template>

<script>
import UserBar from "../../components/user/UserBar";
import Sidebar from "../../components/user/Sidebar";

export default {
  name: "User",
  components: {
    UserBar,
    Sidebar,
  },
  data() {
    return {
      isShow: true,
    }
  },
  mounted() {

    window.addEventListener("scroll", e => {
      let sb = document.querySelector('.sb')
      let r = document.querySelector('.user-right')
      let rect = r.getBoundingClientRect();

      if (rect.top <= 50) {
        sb.style.position = 'fixed'
        sb.style.top = '12%'
        sb.style.width = '16.8%'
      } else {
        sb.style.removeProperty('position')
        sb.style.removeProperty('top')
        sb.style.width = '24%'
      }
    })
  }
}
</script>

<style scoped>
.user-info {
  width: 70%;
  margin: 0 auto;
  position: relative;
}

.sb {
  width: 24%;
  height: 400px;
  float: left;
}

.user-right {
  float: right;
  width: 74.5%;
}
</style>