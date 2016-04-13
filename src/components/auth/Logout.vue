<template>
  <menu></menu>
  <h1>Thanks!</h1>
</template>

<script>
import Menu from '../Menu'

export default {
  ready () {
    // delete the auth
    window.localstorage.deleteItem('auth')
    this.$broadcast('menu', 'logged_out')
  },

  data () {
    return {
    }
  },

  computed: {
  },

  methods: {
  },

  components: {
    Menu
  }
}
</script>

<style type="text/scss">
.logo {
  width: 120px;
  height: 120px;
}
</style>
