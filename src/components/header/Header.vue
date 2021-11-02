<template>
  <div id="header">
    <img src="../../assets/img/logo.png" alt="logo" id="logo" @click="$router.push('/')">
    <span class="logo-text">南方公园主题站</span>
    <div class="s">
      <search></search>
    </div>
    <div class="p" @mouseenter="showUH" @mouseleave="hideUH">
      <div @click="c()">
        <profile size="36" :face-url="getFaceUrl()" class="pro"></profile>
      </div>

      <div class="uh">
        <user-hover ref="uh"></user-hover>
      </div>

    </div>

  </div>
</template>

<script>
import utils from "../../assets/js/utils";
import Search from "./Search";
import Profile from "../Profile";
import UserHover from "./UserHover";

export default {
  name: "Header",
  components: {
    UserHover,
    Search,
    Profile
  },
  data() {
    return {}
  },
  methods: {
    getFaceUrl() {
      return utils.isLogin() ? this.$store.state.user.faceUrl :
          'https://img0.baidu.com/it/u=1051750546,2567387195&fm=26&fmt=auto'
    },
    c() {
      if (utils.isLogin()) {
        this.$router.push(`/user/${this.$store.state.user.uid}/notification`).catch(err => err)
      } else {
        this.$router.push('/l/login')
      }
    },
    showUH() {
      if (!utils.isLogin()) return
      this.$refs.uh.w = 72
      this.$refs.uh.c = 'rgba(188,188,188,1)'
    },
    hideUH() {
      this.$refs.uh.w = 36
      this.$refs.uh.c = 'rgba(188,188,188,0)'
    }
  }
}
</script>

<style scoped>
#header {
  z-index: 2;
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 50px;
  box-shadow: 0 2px 2px rgba(100, 100, 100, 0.15);
  background-color: #fafafa;
}

#logo {
  padding-left: 100px;
  padding-right: 20px;
  height: 90%;
  cursor: pointer;
}

.logo-text {
  font-size: 26px;
  font-weight: 500;
}

.s {
  position: absolute;
  right: 260px;
  padding-right: 15px;
}

.p {
  height: 36px;
  width: 36px;
  border-radius: 50%;
  position: absolute;
  right: 220px;
  top: calc(50% - 18px);
}

.pro:hover {
  filter: brightness(80%);
}

.pro {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.uh {
  position: absolute;
  width: 36px;
  height: 100%;
  left: 0;
  top: 0;
}

</style>