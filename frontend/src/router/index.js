import { createRouter, createWebHistory } from 'vue-router'
import vNews from '@/views/vNews.vue'
import vArticle from '@/views/vArticle.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'news',
      component: vNews
    },
    {
      path: '/article',
      name: 'article',
      component: vArticle
    }
  ]
})

export default router
