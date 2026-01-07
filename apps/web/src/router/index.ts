import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('../pages/HomePage.vue') },
  { path: '/posts', name: 'posts', component: () => import('../pages/PostsPage.vue') },
 { 
  path: '/posts/:slug',
  name: 'post-detail',
  component: () => import('../pages/PostDetailPage.vue'),
  props: true,
},  { path: '/about', name: 'about', component: () => import('../pages/AboutPage/AboutPage.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/NotFoundPage.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
