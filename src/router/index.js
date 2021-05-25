import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import User from '../views/sys/User.vue'
import Role from '../views/sys/Role.vue'
import Menu from '../views/sys/Menu.vue'
import axios from "../axios"
import store from "../store"
import el from "element-ui/src/locale/lang/el";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/index',
        name: 'Index',
        component: Index

      },
      {
        path: '/userCenter',
        name: 'UserCenter',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserCenter.vue')

      },
      {
        path: '/sys/users',
        name: 'SysUser',
        component: User

      },
      {
        path: '/sys/roles',
        name: 'SysRole',
        component: Role

      },
      {
        path: '/sys/menus',
        name: 'SysMenu',
        component: Menu

      }
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {

  axios.get("/sys/menu/nav", {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  }).then(res => {
    console.log(res.data.data)
    store.commit("setMenuList",res.data.data.nav)
    store.commit("setPermList",res.data.data.authoritys)
    console.log(store.state.menus.menuList)
  })
  next()
})


export default router
