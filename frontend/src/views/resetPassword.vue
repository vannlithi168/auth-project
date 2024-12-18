<template>
  <div class="flex justify-center items-center mt-10">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        Reset Your Password
      </h2>

      <!-- Success or Error Message -->
      <div v-if="successMessage" class="text-center text-green-600">
        <p>{{ successMessage }}</p>
      </div>
      <div v-if="errorMessage" class="text-center text-red-600">
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Reset Password Form -->
      <form @submit.prevent="handleSubmit" v-if="!isSubmitting">
        <div class="space-y-6">
          <!-- New Password Field -->
          <div>
            <label
              for="newPassword"
              class="block text-sm font-medium text-gray-600"
              >New Password</label
            >
            <input
              v-model="newPassword"
              type="password"
              id="newPassword"
              class="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter new password"
              required />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            Reset Password
          </button>
        </div>
      </form>

      <!-- Loading Indicator -->
      <div v-if="isSubmitting" class="text-center text-sm text-gray-600">
        Submitting...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

// Reactive state for new password, error messages, and submission status
const newPassword = ref("");
const successMessage = ref("");
const errorMessage = ref("");
const isSubmitting = ref(false);
const route = useRoute();

// Get the token from the URL query
const token = route.params.token; // Assuming the token is passed in the URL like /reset-password/:token

// Handle the password reset form submission
const handleSubmit = async () => {
  isSubmitting.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {
    // Send the reset request with the token and new password
    const response = await axios.post(
      `http://localhost:5000/api/auth/reset-password/${token}`,
      { password: newPassword.value },
      { headers: { "Content-Type": "application/json" } }
    );

    // Handle successful reset
    successMessage.value =
      response.data.message || "Password reset successfully!";
  } catch (error) {
    // Handle error
    if (error.response) {
      errorMessage.value =
        error.response.data.message || "Failed to reset password";
    } else {
      errorMessage.value = "Network error, please try again later";
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Custom styles (if any) */
</style>
