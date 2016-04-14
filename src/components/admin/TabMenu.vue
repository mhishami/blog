<template>

  <ul class="uk-tab" data-uk-tab>
      <li class="{{ users }}"><a v-link="'/admin/users'">Users</a></li>
      <li class="{{ settings }}"><a v-link="'/admin/settings'">Settings</a></li>
      <li class="{{ blogs }}"><a v-link="'/admin/blogs'">Blogs</a></li>
      <li class="{{ posts }}"><a v-link="'/admin/posts'">Posts</a></li>
  </ul>

</template>

<script>
export default {

  props: ['users', 'settings', 'blogs', 'posts'],

  components: {
  }
}
</script>