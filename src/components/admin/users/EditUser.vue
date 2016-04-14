<template>

  <div class="uk-margin-top" v-show="is_editing">
    <ul class="uk-breadcrumb">
      <li><a v-link="{ path: '/'}">Home</a></li>
      <li><a v-link="{ path: '/admin'}">Admin</a></li>
      <li><a v-link="{ path: '/admin/users'}">Users</a></li>
      <li class="uk-active">Edit</li>
    </ul>

    <h2>Edit User</h2>
    <pre>{{ user | json }}</pre>

    <button class="uk-button uk-button-primary" @click="updateUser()">Done</button>
  </div>

</template>

<script>
export default {
  data () {
    return {
      user: {},
      is_editing: false
    }
  },

  events: {
    'edit': function (user) {
      this.user = user
      this.is_editing = true
      this.$dispatch('listing', false)
    }
  },

  methods: {
    updateUser () {
      console.log('Done updating user...')
      this.is_editing = false
      this.$dispatch('listing', true)
      this.$router.go('/admin')
    }
  }
}
</script>