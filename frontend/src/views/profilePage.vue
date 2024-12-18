<template>
  <div class="min-h-screen bg-slate-900">
    <!-- Profile Container -->
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <!-- Profile Title -->
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-6">
        Profile
      </h1>

      <!-- User Information -->
      <div class="space-y-4">
        <!-- Check if user is logged in and show user data, else show a message -->
        <div
          v-if="authStore.isAuthenticated"
          class="flex items-center space-x-4">
          <div>
            <h2 class="text-xl font-semibold text-gray-800">
              {{ authStore.user.name }}
            </h2>
            <p class="text-gray-500">{{ authStore.user.email }}</p>
          </div>
        </div>
        <!-- If user is not authenticated -->
        <div v-else class="text-center text-gray-500">
          <p>No user data available. Please log in to see your profile.</p>
        </div>
      </div>

      <!-- Logout Button -->
      <div v-if="authStore.isAuthenticated" class="mt-6 text-center">
        <button
          @click="logout"
          class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
          Log Out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore"; // Import the Pinia store
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
