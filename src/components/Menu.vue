<template>
  <nav class="uk-navbar uk-margin-large-bottom">
    <a class="uk-navbar-brand uk-hidden-small" href=""><img class="logo" src="../assets/logo.png"></a>
    <ul class="uk-navbar-nav uk-hidden-small">
      <li class="{{ home }}">
        <a v-link="{path: '/'}">Home</a>
      </li>
      <li class="{{ admin }}" v-show="!not_logged_in">
        <a v-link="{path: '/admin/users'}">Admin</a>
      </li>
      <li class="{{ dashboard }}">
        <a v-link="{path: '/'}">Dashboard</a>
      </li>
      <li class="{{ posts }}">
        <a v-link="{path: '/'}">Posts</a>
      </li>
    </ul>
    <div class="uk-navbar-flip">
      <div class="uk-navbar-content">
        <form class="uk-search">
          <input class="uk-search-field" type="text" name="s" value="" placeholder="search..."></input>
        </form>
      </div>
      <div class="uk-navbar-content">
        <a v-link="'/auth/login'" class="uk-button uk-button-primary" v-show="not_logged_in">Login</a>
        <div class="uk-button-dropdown" data-uk-dropdown v-show="!not_logged_in">
          <button class="uk-button uk-button-success">
            {{ email }}
            <i class="uk-icon-caret-down"></i>
          </button>
          <div class="uk-dropdown uk-dropdown-small">
            <ul class="uk-nav uk-nav-dropdown">
              <li><a @click="logout()">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- right menu -->
    <a href="#offcanvas" class="uk-navbar-toggle uk-visible-small" data-uk-offcanvas></a>
    <div class="uk-navbar-brand uk-navbar-center uk-visible-small"><img class="logo" src="../assets/logo.png"></div>
  </nav>

  <div id="offcanvas" class="uk-offcanvas">
    <div class="uk-offcanvas-bar">
      <ul class="uk-nav uk-nav-offcanvas">
        <li class="{{ home }}">
          <a v-link="'/'">Home</a>
        </li>
        <li class="{{ dashboard }}">
          <a v-link="'/'">Dashboard</a>
        </li>
        <li class="{{ posts }}">
          <a v-link="'/'">Posts</a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import {router} from '../main'

export default {
  ready () {
    var auth = JSON.parse(window.localStorage.getItem('auth'))
    // console.log('Menu: auth = ' + auth)
    if (auth) {
      this.email = auth.email
      this.not_logged_in = false
    }
  },

  props: ['home', 'admin', 'dashboard'],

  data () {
    return {
      email: '',
      not_logged_in: true
    }
  },

  events: {
    'logged_out': function (obj) {
      console.log('Menu got event....' + obj)
    }
  },

  methods: {
    logout () {
      console.log('Logging out...')
      window.localStorage.removeItem('auth')
      this.not_logged_in = true
      this.email = ''

      // redirect to home
      router.go('/')
    }
  }
}
</script>

<style type="text/scss">
  .logo {
    max-width: 30px;
    max-height: 30px;
  }
</style>