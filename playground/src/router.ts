import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Internal from "./pages/Internal.vue";
import External from "./pages/External.vue";
import Prevent from "./pages/Prevent.vue";
import Analytics from "./pages/Analytics.vue";
import Confirm from "./pages/Confirm.vue";
import FormGuard from "./pages/FormGuard.vue";
import Security from "./pages/Security.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Home },
    { path: "/internal", component: Internal },
    { path: "/external", component: External },
    { path: "/prevent", component: Prevent },
    { path: "/analytics", component: Analytics },
    { path: "/confirm", component: Confirm },
    { path: "/form-guard", component: FormGuard },
    { path: "/security", component: Security },
  ],
});
