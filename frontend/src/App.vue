<script setup>
import navBar from "./components/navBar.vue";
import Footer from "./components/Footer.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <section class="bg-slate-900">
    <navBar />
    <RouterView />
    <Footer />
  </section>
</template>

<style scoped></style>
