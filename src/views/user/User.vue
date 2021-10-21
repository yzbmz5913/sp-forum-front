<template>
<div style="height: 100%;">
  <user-bar></user-bar>
  <sidebar></sidebar>
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
  }
}
</script>

<style scoped>

</style>