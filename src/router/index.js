import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "jspsych",
      component: () => import("@/views/exper/default.vue"),
    }
  ]
});

export default router
