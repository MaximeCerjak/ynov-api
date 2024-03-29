import { LocalStorage, SessionStorage } from 'quasar'

const isAuthenticated = async (to, from) => {
  const isAuthenticated = LocalStorage.getItem('token') || SessionStorage.getItem('token')
  if (!isAuthenticated && to.name !== 'homepage') {
    return { name: 'homepage' }
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'homepage', component: () => import('pages/IndexPage.vue') },
      { path: 'login', name: 'login', component: () => import('src/components/auth/ConnectPage.vue') },
      { path: 'register', name: 'register', component: () => import('src/components/auth/RegisterPage.vue') },
      { path: 'tuto', name: 'tuto', component: () => import('src/pages/TutoPage.vue') },
      { path: 'tuto/:id', name: 'tuto-params', component: () => import('src/pages/TutoPage.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('src/components/dashboard/DashboardPage.vue') }
    ],
    beforeEnter: isAuthenticated
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
