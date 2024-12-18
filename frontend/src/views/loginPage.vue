<template>
  <div class="flex items-center justify-center mt-10">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        Log In
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-600"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
            required />
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-600"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            placeholder="Enter your password"
            required />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg"
          :disabled="authStore.loading">
          Sign In
        </button>

        <div class="text-center text-sm mt-6">
          <p class="text-gray-600">
            Doesn't have account?
            <RouterLink
              to="/register"
              class="text-green-500 hover:text-green-600"
              >Sign up</RouterLink
            >
          </p>
        </div>

        <!-- Error Message -->
        <div v-if="authStore.errorMessage" class="text-red-500 mt-2">
          {{ authStore.errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js"; // Import the Pinia store

const email = ref("");
const password = ref("");
const router = useRouter();

// Access the Pinia store
const authStore = useAuthStore();

// Handle login action
const handleLogin = async () => {
  await authStore.login({
    email: email.value,
    password: password.value,
  });

  if (authStore.isAuthenticated) {
    router.push("/profile"); // Redirect to profile if login is successful
  }
};
</script>

<style scoped>
/* Custom styles */
</style>
