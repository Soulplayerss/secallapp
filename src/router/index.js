import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children:[
      {path:'/',component: () => import('../views/Goods.vue')},
      {path:'/goods',name:'Goods',component: () => import('../views/Goods.vue')},
      {path:'/evaluation',name:'Evaluation',component: () => import('../views/Evaluation.vue')},
      {path:'/merchants',name:'Merchants',component: () => import('../views/Merchants.vue')},
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
