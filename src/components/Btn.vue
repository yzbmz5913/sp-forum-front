<template>
  <div>
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "Btn",
  props: ['text']
}
</script>

<style scoped>
div {
  --h: 26px;
  width: 100px;
  height: var(--h);
  background-color: rgba(0, 0, 0, 0.08);
  text-align: center;
  font-size: 13px;
  letter-spacing: 1px;
  line-height: var(--h);
  user-select: none;
  transition: background-color 200ms;
}

div:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>