<template>
<div style="display: inline-block">
  <i class="icon iconfont" :style="{fontSize: (+fs+2)+'px'}" :class="icon" ></i>
  <span :style="{fontSize: (fs-3)+'px'}">&nbsp;{{text}}</span>
</div>
</template>

<script>
export default {
  name: "Stat",
  props: {
    icon:{type:String},
    fs:{default:'16'},
    text: null,
  }
}
</script>

<style scoped>
span{
  position: relative;
  top: -2px;
}
</style>