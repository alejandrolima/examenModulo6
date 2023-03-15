import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../components/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../components/AboutView.vue')
  },
  {
    path: '/dron',
    name: 'dron',
    component: () => import(/* webpackChunkName: "about" */ '../components/drones/DronView.vue')
  },
  {
    path: '/categoria',
    name: 'categoria',
    component: () => import(/* webpackChunkName: "about" */ '../components/drones/CategoriaView.vue')
  },
  {
    path: '/producto',
    name: 'producto',
    component: () => import(/* webpackChunkName: "about" */ '../components/drones/ProductoView.vue')
  }     
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
