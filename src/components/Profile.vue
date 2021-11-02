<template>
  <img id="face" :style="sz" alt="" :src="faceUrl">

</template>

<script>
export default {
  name: "Profile",
  props: {
    'size': {
      default: 32
    },
    'faceUrl': {
      type: String
    }
  },
  data() {
    return {
      sz: {
        height: this.size + 'px',
        width: this.size + 'px',
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
#face {
  display: inline-block;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 50%;
}

#face:hover {
  cursor: pointer;
}
</style>