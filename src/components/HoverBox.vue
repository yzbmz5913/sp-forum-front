<template>
  <div :id="id" v-show="$store.state.shouldMask===id" class="hovered card"
       :style="{'--w':w+'px',height:h+'px',top:t+'px'}">
    <slot name="content"></slot>
    <btn class="btn" text="确认" @click.native="commit()"></btn>
  </div>
</template>

<script>
import Btn from "./Btn";

export default {
  name: "HoverBox",
  components: {Btn},
  props: ['id', 'w', 'h', 't'],
  created() {

  },
  computed: {},
  methods: {
    commit() {
      this.$store.commit('mask', false)
      this.$store.commit('delConfirmCommit', true)
      window.removeEventListener('mousedown', this.$store.state.lis(this.id), {capture: true})
    }
  }
}
</script>

<style scoped>
.hovered {
  width: var(--w);
  position: fixed;
  left: calc(50% - 0.5 * var(--w));
  z-index: 99;
}

.btn {
  margin: 0 auto 20px auto;
}
</style>