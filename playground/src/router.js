import { createRouter, createWebHistory } from 'vue-router'

import SearchFilters from './pages/SearchFilters.vue'
import TagFilters from './pages/TagFilters.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/search',
    },
    {
      path: '/search',
      name: 'search',
      component: SearchFilters,
    },
    {
      path: '/tag',
      name: 'tag',
      component: TagFilters,
    },
  ],
})
