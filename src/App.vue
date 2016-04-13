<template>
  <div class="uk-container uk-container-center uk-margin-top">
    <router-view></router-view>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Menu from './components/Menu'

export default {
  components: {
    Hello,
    Menu
  }
}
</script>

