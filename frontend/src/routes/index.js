import { createRouter, createWebHistory } from "vue-router";
import homePage from "@/views/homePage.vue";
import loginPage from "@/views/loginPage.vue";
import profilePage from "@/views/profilePage.vue";
import registerPage from "@/views/registerPage.vue";
import verifyPage from "@/views/verifyPage.vue";
import forgetPassword from "@/views/forgetPassword.vue";
import resetPassword from "@/views/resetPassword.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home-Page",
      component: homePage,
    },
    {
      path: "/login",
      name: "Login-Page",
      component: loginPage,
    },
    {
      path: "/register",
      name: "Register",
      component: registerPage,
    },
    {
      path: "/verify-email",
      name: "Verify Email",
      component: verifyPage,
    },
    {
      path: "/profile",
      name: "Profile",
      component: profilePage,
    },

    {
      path: "/forgot-password",
      name: "Forgot Password",
      component: forgetPassword,
    },
    {
      path: "/reset-password",
      name: "Reset Password",
      component: resetPassword,
    },
  ],
});

export default router;
