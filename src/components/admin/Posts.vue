<template>
  <menu admin="uk-active"></menu>
  <tab-menu posts="uk-active"></tab-menu>

  <h2>Posts</h2>
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