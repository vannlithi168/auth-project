<template>
  <div class="flex items-center justify-center mt-10">
    <!-- Form Container -->
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <!-- Form Title -->
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        Verify Your Email
      </h2>

      <!-- Verification Status -->
      <div v-if="isVerifying">
        <p class="text-center text-sm text-gray-600">Verifying...</p>
      </div>
      <div v-if="verificationSuccess" class="text-center text-green-600">
        <p>Email verified successfully!</p>
        <router-link to="/login" class="text-green-500 hover:text-green-600">
          Go to login
        </router-link>
      </div>
      <div v-if="verificationError" class="text-center text-red-600">
        <p>Verification failed. Please check the code or try again later.</p>
      </div>

      <!-- Verification Code Input Form -->
      <form
        v-if="!verificationSuccess && !verificationError"
        @submit.prevent="verifyCode"
        class="space-y-6">
        <!-- Code Field -->
        <div>
          <label for="code" class="block text-sm font-medium text-gray-600">
            Verification Code
          </label>
          <input
            v-model="code"
            type="text"
            id="code"
            class="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your verification code"
            required />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Verify Code
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

// Reactive data
const code = ref(""); // Verification code input from the user
const isVerifying = ref(false); // Loading state for verification process
const verificationSuccess = ref(false); // Whether verification is successful
const verificationError = ref(false); // Whether verification failed

const route = useRoute();
const router = useRouter();

// Function to verify the code
const verifyCode = async () => {
  isVerifying.value = true;
  verificationSuccess.value = false;
  verificationError.value = false;

  try {
    // Send verification code to the backend
    const response = await axios.post(
      "http://localhost:5000/api/auth/verify-email",
      { code: code.value }, // Send the verification code in the request body
      {
        withCredentials: true, // Include cookies if needed (e.g., session cookies)
      }
    );

    if (response.data.success) {
      verificationSuccess.value = true;
    } else {
      verificationError.value = true;
    }
  } catch (error) {
    console.error("Verification failed:", error);
    verificationError.value = true;
  } finally {
    isVerifying.value = false;
  }
};
</script>

<style scoped>
/* Add any custom styles for the page here */
</style>
