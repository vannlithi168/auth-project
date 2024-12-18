<template>
  <nav
    class="flex py-4 px-10 justify-between items-center bg-slate-900 mx-auto">
    <div class="flex items-center gap-3">
      <img :src="Logo" alt="Logo" class="w-10 drop-shadow-lg" />
      <div class="text-3xl font-medium">
        <span class="text-green-600">Vue</span>
        <span class="text-yellow-500">Task</span>
      </div>
    </div>

    <div class="flex gap-4 items-center text-white font-light">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/">Add Task</RouterLink>
      <a href="#">Favorite</a>
      <RouterLink to="/profile">Profile</RouterLink>
      <RouterLink :to="authStore.isAuthenticated ? '/profile' : '/login'">
        <div>
          <button class="bg-green-500 rounded-md px-3 py-1">
            {{ authStore.isAuthenticated ? authStore.user.name : "Sign in" }}
          </button>
        </div>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import Logo from "@/assets/img/logo.svg";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
</script>

<style scoped></style>
