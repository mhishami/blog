<template>
  <nav class="uk-navbar uk-margin-large-bottom">
    <a class="uk-navbar-brand uk-hidden-small" href=""><img class="logo" src="../assets/logo.png"></a>
    <ul class="uk-navbar-nav uk-hidden-small">
      <li class="uk-active">
        <a v-link="'/'">Home</a>
      </li>
      <li>
        <a v-link="'/'">Dashboard</a>
      </li>
      <li>
        <a v-link="'/'">Posts</a>
      </li>
    </ul>
    <div class="uk-navbar-content uk-navbar-flip">
      <a v-link="'/login'" class="uk-button uk-button-primary" v-show="not_logged_in">Login</a>
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

    <!-- right menu -->
    <a href="#offcanvas" class="uk-navbar-toggle uk-visible-small" data-uk-offcanvas></a>
    <div class="uk-navbar-brand uk-navbar-center uk-visible-small"><img class="logo" src="../assets/logo.png"></div>
  </nav>

  <div id="offcanvas" class="uk-offcanvas">
    <div class="uk-offcanvas-bar">
      <ul class="uk-nav uk-nav-offcanvas">
        <li class="uk-active">
          <a v-link="'/'">Home</a>
        </li>
        <li>
          <a v-link="'/'">Dashboard</a>
        </li>
        <li>
          <a v-link="'/'">Posts</a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  ready () {
    var auth = JSON.parse(window.localStorage.getItem('auth'))
    this.email = auth.email
    this.not_logged_in = false
  },

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