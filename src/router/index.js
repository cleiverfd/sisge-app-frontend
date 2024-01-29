import { createRouter, createWebHistory } from 'vue-router'

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
      children: [
        {
          path: '', // Ruta sin nombre, se corresponderá con '/home'
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/proceeding/add', // Ruta hija directa de '/home'
          name: 'proceeding-add',
          component: () => import('../modules/proceeding/AddProceeding.vue'),
        },
        {
          path: '/proceeding/search', // Ruta hija directa de '/home'
          name: 'proceeding-search',
          component: () => import('../modules/proceeding/SearchProceeding.vue'),
        },
        // Otras rutas hijas de '/home' si las tienes
      ]
    },
    // {
    //   path: '/proceeding/add',
    //   name: 'proceeding-add',
    //   component: () => import('../modules/proceeding/AddProceeding.vue')
    // }

  ]
})

export default router
