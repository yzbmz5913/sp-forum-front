<template>
<div class="edit">
  {{text}}
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
  background-color: #bbb;
  text-align: center;
  font-size: 13px;
  line-height: var(--h);
  user-select: none;
}

.edit:hover {
  cursor: pointer;
  background-color: #999999;
}
</style>