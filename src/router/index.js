import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../modules/auth/AuthLogin.vue')
    },
    {
      path: '/home',
      component: () => import('../components/dashboard/DashboardApp.vue'),
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '', 
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/proceeding/add', 
          name: 'proceeding-add',
          component: () => import('../modules/proceeding/AddProceeding.vue'),
        },
        {
          path: '/proceeding/search', 
          name: 'proceeding-search',
          component: () => import('../modules/proceeding/SearchProceeding.vue'),
        },
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.token) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
