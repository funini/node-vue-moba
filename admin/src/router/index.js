import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdite from '../views/CategoryEdite.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdite from '../views/ItemEdite.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdite from '../views/HeroEdite.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdite from '../views/ArticleEdite.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdite from '../views/AdEdite.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdite from '../views/AdminUserEdite.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

  const routes = [
  {path: '/login', name: 'login', component: Login, meta: {isPublic: true}},
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {path:'/categories/create',component:CategoryEdite},
      {path:'/categories/edit/:id',component:CategoryEdite,props:true},
      {path:'/categories/list',component:CategoryList},

      {path:'/items/create',component:ItemEdite},
      {path:'/items/edit/:id',component:ItemEdite,props:true},
      {path:'/items/list',component:ItemList},

      {path:'/heroes/create',component:HeroEdite},
      {path:'/heroes/edit/:id',component:HeroEdite,props:true},
      {path:'/heroes/list',component:HeroList},

      {path:'/articles/create',component:ArticleEdite},
      {path:'/articles/edit/:id',component:ArticleEdite,props:true},
      {path:'/articles/list',component:ArticleList},

      {path:'/ads/create',component:AdEdite},
      {path:'/ads/edit/:id',component:AdEdite,props:true},
      {path:'/ads/list',component:AdList},

      {path:'/admin_user/create',component:AdminUserEdite},
      {path:'/admin_user/edit/:id',component:AdminUserEdite,props:true},
      {path:'/admin_user/list',component:AdminUserList}
      
    ]    
  },
  // {
  //   path: '/',
  //   name: 'item',
  //   component: Item,
  //   children: [
  //     {path:'/items/create',component:ItemEdite},
  //     {path:'/items/edit/:id',component:ItemEdite,props:true},
  //     {path:'/items/list',component:ItemList}
  //   ]    
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router
