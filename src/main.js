import Vue from 'vue'
import App from './App'

import Home from './components/Home'

import Auth from './components/auth/Auth'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Register from './components/auth/Register'
import Forgot from './components/auth/Forgot'

import Admin from './components/admin/Admin'

// users admin
import Users from './components/admin/Users'
import Settings from './components/admin/Settings'
import Blogs from './components/admin/Blogs'
import Posts from './components/admin/Posts'

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(require('vue-moment'))

export var router = new VueRouter()
router.map({
  '/': {
    component: Home
  },
  '/auth': {
    component: Auth,
    subRoutes: {
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
      },
      '*': {
        component: Login
      }
    }
  },
  '/admin': {
    component: Admin,
    subRoutes: {
      '/users': {
        component: Users
      },
      '/settings': {
        component: Settings
      },
      '/blogs': {
        component: Blogs
      },
      '/posts': {
        component: Posts
      },
      '*': {
        component: Users
      }
    }
  }
})

router.redirect({
  '*': '/',
  '/admin': '/admin/users',
  '/auth': '/auth/login'
})

router.start(App, '#app')
