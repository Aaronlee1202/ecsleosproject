import { createRouter, createWebHistory } from 'vue-router';
import PrologueView from '../views/PrologueView.vue';
import DemoView from '../components/common/planetModule.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'prologue',
      component: PrologueView
    },
    {
      path: '/demo',
      name: 'demo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //  component: () => import('../views/DemoView.vue')
      component: DemoView
    }
  ]
});

export default router;
