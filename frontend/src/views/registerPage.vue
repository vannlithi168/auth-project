<template>
  <div class="flex items-center justify-center mt-10">
    <!-- Form Container -->
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <!-- Form Title -->
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        Sign Up
      </h2>

      <!-- Sign Up Form -->
      <form @submit.prevent="registerUser" class="space-y-6">
        <!-- Full Name Field -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-600"
            >Full Name</label
          >
          <input
            v-model="name"
            type="text"
            id="name"
            class="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your full name"
            required />
        </div>

        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-600"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
            class="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your password"
            required />
        </div>

        <!-- Display error message from store -->
        <div
          v-if="authStore.errorMessage"
          class="text-red-500 text-sm text-center">
          {{ authStore.errorMessage }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Sign Up
        </button>

        <!-- Already have an account link -->
        <div class="text-center text-sm mt-6">
          <p class="text-gray-600">
            Already have an account?
            <router-link to="/login" class="text-green-500 hover:text-green-600"
              >Sign In</router-link
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

// Define the reactive variables
const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

// Access the auth store
const authStore = useAuthStore();

// Register user
const registerUser = async () => {
  const userData = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  try {
    // Call the register action from the store
    await authStore.register(userData);

    // Redirect user after successful registration
    router.push("/verify-email");
  } catch (error) {
    console.error("Registration error:", error);
  }
};
</script>

<style scoped>
/* Tailwind already handles most of the styles, no extra styles needed */
</style>
