<template>
  <menu admin="uk-active"></menu>
  <tab-menu users="uk-active"></tab-menu>

  <list-users></list-users>
  <edit-user></edit-user>

</template>

<script>
import Menu from '../Menu'
import TabMenu from './TabMenu'
import ListUsers from './users/ListUsers'
import EditUser from './users/EditUser'

export default {
  data () {
    return {
      is_edit: false
    }
  },
  components: {
    TabMenu, Menu, ListUsers, EditUser
  },
  events: {
    'edit': function (user) {
      this.$broadcast('edit', user)
      return true
    },
    'listing': function (obj) {
      this.$broadcast('listing', obj)
    },
    'editing': function (obj) {
      this.$broadcast('editing', obj)
    }
  }
}
</script>
