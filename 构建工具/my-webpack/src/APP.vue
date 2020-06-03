<template>
  <div>
    <h1 class="title">
      {{msg}}
      <div class="w">231</div>
    </h1>
    <img src="./img/123.jpg" alt />
    <router-link to="/foo">to-foo</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      msg: "hello world"
    };
  }
};
</script>
<style lang="scss">
.title {
  display: flex;
  text-align: center;
  color: aquamarine;
}
</style>