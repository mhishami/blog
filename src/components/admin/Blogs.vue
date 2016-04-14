<template>
  <menu admin="uk-active"></menu>
  <tab-menu blogs="uk-active"></tab-menu>

  <h2>Blogs</h2>
</template>

<script>
import TabMenu from './TabMenu'
import Menu from '../Menu'

export default {
  ready () {
    console.log('Settings: ready...')
  },

  components: {
    TabMenu, Menu
  }
}
</script>