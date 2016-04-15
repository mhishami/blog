<template>
  <menu admin="uk-active"></menu>
  <tab-menu blogs="uk-active"></tab-menu>

  <h2>Blogs</h2>
  <button class="uk-button uk-button-success" @click="modalOpen()"></button>
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
  },

  methods: {
    modalOpen () {
    }
  }
}
</script>