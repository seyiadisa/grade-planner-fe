import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/upload-result',
      name: 'upload-result',
      component: () => import('../views/UploadResultView.vue')
    },
    {
      path: '/upload-course',
      name: 'upload-course',
      component: () => import('../views/UploadCourseView.vue')
    }
  ]
})

export default router
