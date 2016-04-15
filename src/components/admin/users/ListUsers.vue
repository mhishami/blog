<template>

  <div class="uk-margin-top" v-show="is_listing">
    <ul class="uk-breadcrumb">
      <li><a v-link="{ path: '/'}">Home</a></li>
      <li><a v-link="{ path: '/admin'}">Admin</a></li>
      <li><a v-link="{ path: '/admin/users'}">Users</a></li>
      <li class="uk-active">List</li>
    </ul>

    <h2>List of Users</h2>
    <table class="uk-table">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Date Created</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(index, user) in users">
          <td>{{ index }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.id }}</td>
          <td>{{ user.realm }}</td>
          <td>{{ user.date_created | moment "calendar" }}</td>
          <td>
            <button class="uk-button uk-button-mini uk-button-primary"
                    @click="editUser(user)">
              Edit
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import admin from '../../../api/admin/index.js'

export default {
  ready () {
    this.getAllUsers()
  },
  data () {
    return {
      users: [],
      is_listing: true
    }
  },
  events: {
    'listing': function (obj) {
      this.is_listing = obj
    }
  },
  methods: {
    getAllUsers () {
      admin.getAllUsers(this)
    },
    editUser (user) {
      this.$dispatch('edit', user)
    }
  }
}
</script>
