import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import { createPinia } from "pinia";
import { useAuthStore } from "@/stores/authStore.js";

const app = createApp(App);

app.use(router);
// Create Pinia store
const pinia = createPinia();
app.use(pinia);

// Call the loadFromLocalStorage action on app startup to restore data from localStorage
const authStore = useAuthStore();
authStore.loadFromLocalStorage();
app.mount("#app");
