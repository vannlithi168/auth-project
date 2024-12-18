<template>
  <div class="flex justify-center items-center mt-10">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        Forgot Password
      </h2>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="text-center text-sm text-gray-600">
        Sending reset link...
      </div>

      <!-- Success or Error Message -->
      <div v-if="successMessage" class="text-center text-green-600">
        <p>{{ successMessage }}</p>
      </div>
      <div v-if="errorMessage" class="text-center text-red-600">
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Forgot Password Form -->
      <form
        v-if="!isLoading && !successMessage && !errorMessage"
        @submit.prevent="handleSubmit"
        class="space-y-6">
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-600">
            Enter your email
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email address"
            required />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Send Reset Link
        </button>
      </form>

      <!-- Link to Login -->
      <div class="text-center mt-6">
        <p class="text-sm text-gray-600">
          Remember your password?
          <router-link to="/login" class="text-green-500 hover:text-green-600">
            Go to login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// Reactive state variables
const email = ref("");
const isLoading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

// Handle form submission
const handleSubmit = async () => {
  isLoading.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {
    // Send the POST request with the email field in the body
    const response = await axios.post(
      "http://localhost:5000/api/auth/forgot-password", // Check this route matches backend
      { email: email.value },
      {
        headers: {
          "Content-Type": "application/json", // Ensure it's JSON
        },
      }
    );

    // On success, show the success message
    successMessage.value = response.data.message || "Password reset link sent!";
    email.value = ""; // Clear the email input
  } catch (error) {
    // Handle error and display the message
    console.log("Error details:", error);
    if (error.response) {
      errorMessage.value = error.response.data.message || "An error occurred.";
    } else {
      errorMessage.value = "Network error. Please try again later.";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Custom styles for Forgot Password page */
</style>
