import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import('@/views/Home.vue'),
    },
    {
      path: "/frameworks",
      name: "frameworks",
      component: () => import('@/views/Frameworks.vue'),
      children: [
        {
          path: ":id",
          name: "frameworkDetail",
          component: () => import('@/views/FrameworkDetail.vue'),
        },
      ],
    },
  ],
});

export default router;
