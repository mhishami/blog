<template>
  <menu admin="uk-active"></menu>
  <tab-menu users="uk-active"></tab-menu>

  <h2>List of Users</h2>
  <table class="uk-table">
  <thead>
    <tr>
      <th>id</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Date Created</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="user in users">
      <td>{{ user.id }}</td>
      <td>{{ user.first_name }}</td>
      <td>{{ user.last_name }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.realm }}</td>
      <td>{{ user.date_created | moment "calendar" }}</td>
      <td>
        <button class="uk-button uk-button-mini uk-button-primary">Edit</button>
      </td>
    </tr>
  </tbody>
  </table>
</template>

<script>
import admin from '../../api/admin/index.js'

import TabMenu from './TabMenu'
import Menu from '../Menu'

export default {
  ready () {
    console.log('initing users...')
    this.getAllUsers()
  },

  data () {
    return {
      users: []
    }
  },

  methods: {
    getAllUsers () {
      admin.getAllUsers(this)
    }
  },

  components: {
    TabMenu, Menu
  }
}
</script>