import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Internal from "./pages/Internal.vue";
import External from "./pages/External.vue";
import Prevent from "./pages/Prevent.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Home },
    { path: "/internal", component: Internal },
    { path: "/external", component: External },
    { path: "/prevent", component: Prevent },
  ],
});
