<template>
  <menu admin="uk-active"></menu>
  <tab-menu settings="uk-active"></tab-menu>

  <h2>Settings</h2>
  <router-view></router-view>
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