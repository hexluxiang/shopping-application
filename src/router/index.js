import { createRouter, createWebHistory } from 'vue-router'
import router from './router'

export default createRouter({
  history: createWebHistory(),
  routes: router.routes
})