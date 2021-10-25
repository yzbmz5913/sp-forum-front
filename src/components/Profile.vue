<template>
  <div id="face" :style="bgi">

  </div>
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
      bgi: {
        height: this.size + 'px',
        width: this.size + 'px',
        backgroundImage: `url(${this.faceUrl})`
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