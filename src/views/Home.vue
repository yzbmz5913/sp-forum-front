<template>
  <div class="home">
    <recommend></recommend>
    <posts></posts>
  </div>
</template>

<script>
import Recommend from "../components/Recommend";
import Posts from "../components/Posts";
export default {
  name: 'Home',
  components: {
    Recommend,
    Posts,
  }
}
</script>
