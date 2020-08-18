import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import CategoryEdite from '../views/CategoryEdite.vue'
import CategoryList from '../views/CategoryList.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {path:'/categories/create',component:CategoryEdite},
      {path:'/categories/edit/:id',component:CategoryEdite,props:true},
      {path:'/categories/list',component:CategoryList}
    ]
    
  },
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

export default router
