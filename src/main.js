import Vue from 'vue'
import App from './App'

import Home from './components/Home'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Register from './components/auth/Register'
import Forgot from './components/auth/Forgot'

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
Vue.use(VueResource)
Vue.use(VueRouter)

export var router = new VueRouter()
router.map({
  '/': {
    component: Home
  },
  '/login': {
    component: Login
  },
  '/register': {
    component: Register
  },
  '/forgot': {
    component: Forgot
  },
  '/logout': {
    component: Logout
  }
})

router.redirect({
  '*': '/'
})

router.start(App, '#app')
