<template>
  <div>
    <user-bar></user-bar>
    <div class="user-info clearfix">
      <sidebar class="sb"></sidebar>
      <div style="height: 500px;display: inline-block"></div>
      <!--    <keep-alive>-->
      <router-view class="user-right"></router-view>
      <!--    </keep-alive>-->
      <hover-box id="hover_editor" t="200" w="500">
        <template v-slot:content>
          <editor ref="editor"></editor>
        </template>
      </hover-box>
    </div>
  </div>
</template>

<script>
import UserBar from "../../components/user/UserBar";
import Sidebar from "../../components/user/Sidebar";
import HoverBox from "../../components/HoverBox";
import Editor from "../../components/user/Editor";

let lis = () => {
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
}
export default {
  name: "User",
  components: {
    HoverBox,
    UserBar,
    Sidebar,
    Editor,
  },
  data() {
    return {
      isShow: true,
    }
  },
  mounted() {
    window.addEventListener("scroll", lis)
  },
  destroyed() {
    window.removeEventListener("scroll", lis)
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