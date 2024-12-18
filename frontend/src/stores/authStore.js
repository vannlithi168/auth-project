// src/stores/authStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    errorMessage: null,
    loading: false,
  }),

  actions: {
    loadFromLocalStorage() {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (user && token) {
        this.user = user;
        this.token = token;
        this.isAuthenticated = true;
      }
    },

    async login({ email, password }) {
      this.loading = true;
      this.errorMessage = null;
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email,
            password,
          }
        );

        this.user = response.data.user;
        this.token = response.data.token;
        this.isAuthenticated = true;

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("token", this.token);

        this.loading = false;
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Login failed";
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      // Remove from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Make sure this update reflects immediately
      // If you use a router, navigate to the login page after logout
    },

    async register({ name, email, password }) {
      this.loading = true;
      this.errorMessage = null;

      try {
        // Send user data to backend API for registration
        const response = await axios.post(
          "http://localhost:5000/api/auth/signup",
          {
            name,
            email,
            password,
          }
        );

        this.loading = false;
        return response.data; // Optionally return the response to handle it in the component (like redirecting)
      } catch (error) {
        this.loading = false;
        // Handle errors, e.g., email already taken or server issue
        this.errorMessage =
          error.response?.data?.message || "Registration failed";
      }
    },
  },
});
