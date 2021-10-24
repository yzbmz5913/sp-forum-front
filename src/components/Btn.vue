<template>
  <div class="edit">
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
.edit {
  --h: 26px;
  width: 100px;
  height: var(--h);
  background-color: rgba(188, 188, 188, .7);
  text-align: center;
  font-size: 13px;
  letter-spacing: 1px;
  line-height: var(--h);
  user-select: none;
  transition: background-color 200ms;
  box-shadow: 1px 1px 1px rgba(122, 122, 122, 0.4);
}

.edit:hover {
  cursor: pointer;
  background-color: rgba(133, 133, 133, .7);
}
</style>