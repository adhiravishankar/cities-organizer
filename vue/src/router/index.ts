import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateMetro from "../views/CreateMetro.vue";
import CreateNeighborhood from "../views/CreateNeighborhood.vue";
import CreateCity from "../views/CreateCity.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/create-metro",
      name: "create-metro",
      component: CreateMetro,
    },
    {
      path: "/create-city",
      name: "create-city",
      component: CreateCity,
    },
    {
      path: "/create-neighborhood",
      name: "create-neighborhood",
      component: CreateNeighborhood,
    },
  ],
});

export default router;
