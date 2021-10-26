<template>
  <div class="st">
    <ul>
      <li v-for="(_,idx) of new Array(count)" class="card">
        <div class="icon iconfont">
          <slot :name="'slot_'+idx"></slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideTool",
  props: ['count',],
  mounted() {
    console.log(this.$slots)
  }
}
</script>

<style scoped>
.st ul {
  --w: 45px;
  width: var(--w);
  height: var(--w);
}

.st ul li {
  width: 100%;
  height: var(--w);
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.st ul li:after {
  background-color: rgba(60, 60, 60, 0.8);
}

.st ul li * {
  color: #dbdbdb;
}
</style>