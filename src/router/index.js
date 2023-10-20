import { createRouter, createWebHistory } from 'vue-router';
import OpeningView from '../views/OpeningView.vue';
import CubesatView from '../views/CubesatView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'opening',
      component: OpeningView
    },
    {
      path: '/cubesat',
      name: 'cubesat',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //  component: () => import('../views/DemoView.vue')
      component: CubesatView
    }
  ]
});

export default router;
