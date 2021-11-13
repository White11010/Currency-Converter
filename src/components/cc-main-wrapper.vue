<template>
  <div class="cc-main-wrapper">
    <cc-header />
    <router-view />
  </div>
</template>

<script>
import ccHeader from "./cc-header.vue";

export default {
  name: "cc-main-wrapper",
  components: {
    ccHeader,
  },
  data() {
    return {};
  },
};
</script>

<style>
.cc-main-wrapper {
  height: 100%;
}
</style>
