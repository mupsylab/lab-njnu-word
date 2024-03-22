import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/index.vue"),
    }, {
      path: "/exper/:day",
      name: "jspsych",
      component: () => import("@/views/exper/default.vue"),
    }
  ]
});

export default router
