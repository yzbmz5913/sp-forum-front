<template>
<div id="face" :style="{height: size+'px', width: size+'px'}">

</div>
</template>

<script>
export default {
  name: "Profile",
  props:{
    'size':{
      default: 32
    },
    'faceUrl':{
      type: String
    }
  }
}
</script>

<style scoped>
#face{
  display: inline-block;
  background-image: url('../assets/img/face.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 50%;
}
</style>