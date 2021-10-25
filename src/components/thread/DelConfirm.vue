<template>
  <div class="e card">
    <p class="cancel icon iconfont icon-close" @click="cancel()"></p>
    <p>是否确认删除？</p>
    <btn text="确认" @click.native="confirm"></btn>
  </div>
</template>

<script>
import Btn from "../Btn";

export default {
  name: "DelConfirm",
  components: {Btn},
  methods: {
    confirm() {
      this.$store.commit('mask', false)
      this.$store.commit('delConfirmCommit', true)
    },
    cancel() {
      this.$store.commit('mask', false)
      this.$store.commit('delConfirmCommit', false)
    }
  }
}
</script>

<style scoped>
.e {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.e .cancel {
  position: absolute;
  right: 5%;
  top: 5%;
  color: #666;
  cursor: pointer;
  font-size: 20px;
}

.e .cancel:hover {
  color: #333;
}
</style>