<template>

  <div class="uk-margin-top" v-show="is_editing">
    <ul class="uk-breadcrumb">
      <li><a v-link="{ path: '/'}">Home</a></li>
      <li><a v-link="{ path: '/admin'}">Admin</a></li>
      <li><a v-link="{ path: '/admin/users'}">Users</a></li>
      <li class="uk-active">Edit</li>
    </ul>

    <div class="uk-grid">
      <div class="uk-width-medium-2-3 uk-row-first">
        <!-- Change User Details -->
        <div class="uk-panel uk-panel-header">
          <h3 class="uk-panel-title">Edit User</h3>
          <form class="uk-form uk-form-stacked" method="post" >
            <div class="uk-form-row">
              <label class="uk-form-label">First Name</label>
              <div class="uk-form-controls">
                <input class="uk-width-1-1" type="text" name="first_name" v-model="user.first_name"></input>
              </div>
            </div>
            <div class="uk-form-row">
              <label class="uk-form-label">Last Name</label>
              <div class="uk-form-controls">
                <input class="uk-width-1-1" type="text" name="last_name" v-model="user.last_name"></input>
              </div>
            </div>
            <div class="uk-form-row">
              <label class="uk-form-label">Email</label>
              <div class="uk-form-controls">
                <input class="uk-width-1-1" type="text" name="email" v-model="user.id" readonly=""></input>
              </div>
            </div>
            <div class="uk-form-row">
              <button class="uk-button uk-button-primary uk-float-right"
                      @click="updateDetails(user)"
                      :disabled="when_profile_not_changed">
                Update Details
              </button>
            </div>
          </form>
        </div>

        <!-- Change Password -->
        <div class="uk-panel uk-panel-header">
          <h3 class="uk-panel-title">Change Password</h3>
          <form class="uk-form uk-form-stacked" method="post" v-on:submit.prevent="">
            <div class="uk-form-row">
              <label class="uk-form-label">New Password</label>
              <div class="uk-form-controls">
                <input class="uk-width-1-1" type="password" name="password" v-model="user.password"></input>
              </div>
            </div>
            <div class="uk-form-row">
              <label class="uk-form-label">Repeat New Password</label>
              <div class="uk-form-controls">
                <input class="uk-width-1-1" type="password" name="password2" value="somepass"
                       placeholder="Password, again" v-model="user.password2"></input>
              </div>
            </div>
            <div class="uk-form-row">
              <button class="uk-button uk-button-primary uk-float-right"
                      @click="changePassword(user)"
                      :disabled="is_pass_invalid">
                Change Password
              </button>
            </div>
            <div class="uk-form-row" v-show="debug">
              <div class="uk-panel">
                <pre>{{ user | json }}</pre>
                <pre>{{ image | json }}</pre>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="uk-width-medium-1-3">
        <div class="uk-panel uk-panel-box uk-text-center">
          <!-- Make a file upload -->
          <div class="uk-placeholder uk-form-file">
            <div v-if="!image">
              <h5>Upload Image</h5>
              <i class="uk-icon-camera"></i> <input type="file" accept="image/*" @change="onFileChange" />
            </div>
            <div v-else>
              <img v-bind:src="image" class="uk-border-circle" width="90px" height="90px" />
              <br/>
              <button class="uk-button uk-button-mini uk-button-success" @click="removeImage">Change Image</button>
            </div>
          </div>
          <h3>{{ user.first_name }} {{ user.last_name }}</h3>
          <br>
          Role: {{ user.realm }}
          <br>
          Created: {{ user.created_at | moment "calendar"}}
          <br>
          Updated: {{ user.updated_at | moment "calendar"}}
          <p>
            <a>{{ user.email }}</a>
          </p>
          <p>
            <button class="uk-button uk-button-large uk-button-success"
                    @click="cancel()">
              Cancel Update
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import admin from '../../../api/admin/index'

export default {
  data () {
    return {
      user: {},
      debug: true,
      is_editing: false,
      image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTIwcHgiIGhlaWdodD0iMTIwcHgiIHZpZXdCb3g9IjAgMCAxMjAgMTIwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMjAgMTIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxyZWN0IGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIi8+DQo8Zz4NCgk8cGF0aCBmaWxsPSIjRTBFMEUwIiBkPSJNMTA5LjM1NCw5OS40NzhjLTAuNTAyLTIuODA2LTEuMTM4LTUuNDA0LTEuOTAzLTcuODAxYy0wLjc2Ny0yLjM5Ny0xLjc5Ny00LjczMi0zLjA5My03LjAxMQ0KCQljLTEuMjk0LTIuMjc2LTIuNzc4LTQuMjE3LTQuNDU1LTUuODIzYy0xLjY4MS0xLjYwNC0zLjcyOS0yLjg4Ny02LjE0OC0zLjg0NmMtMi40MjEtMC45NTgtNS4wOTQtMS40MzgtOC4wMTctMS40MzgNCgkJYy0wLjQzMSwwLTEuNDM3LDAuNTE2LTMuMDIsMS41NDVjLTEuNTgxLDEuMDMyLTMuMzY3LDIuMTgyLTUuMzU1LDMuNDVjLTEuOTksMS4yNzEtNC41NzgsMi40MjEtNy43NjUsMy40NTENCgkJQzY2LjQxLDgzLjAzNyw2My4yMSw4My41NTIsNjAsODMuNTUyYy0zLjIxMSwwLTYuNDEtMC41MTUtOS41OTgtMS41NDZjLTMuMTg4LTEuMDMtNS43NzctMi4xODEtNy43NjUtMy40NTENCgkJYy0xLjk5MS0xLjI2OS0zLjc3NC0yLjQxOC01LjM1NS0zLjQ1Yy0xLjU4Mi0xLjAyOS0yLjU4OC0xLjU0NS0zLjAyLTEuNTQ1Yy0yLjkyNiwwLTUuNTk4LDAuNDc5LTguMDE3LDEuNDM4DQoJCWMtMi40MiwwLjk1OS00LjQ3MSwyLjI0MS02LjE0NiwzLjg0NmMtMS42ODEsMS42MDYtMy4xNjQsMy41NDctNC40NTgsNS44MjNjLTEuMjk0LDIuMjc4LTIuMzI2LDQuNjEzLTMuMDkyLDcuMDExDQoJCWMtMC43NjcsMi4zOTYtMS40MDIsNC45OTUtMS45MDYsNy44MDFjLTAuNTAyLDIuODAzLTAuODM5LDUuNDE1LTEuMDA2LDcuODM1Yy0wLjE2OCwyLjQyMS0wLjI1Miw0LjkwMi0wLjI1Miw3LjQ0DQoJCWMwLDEuODg0LDAuMjA3LDMuNjI0LDAuNTgyLDUuMjQ3aDEwMC4wNjNjMC4zNzUtMS42MjMsMC41ODItMy4zNjMsMC41ODItNS4yNDdjMC0yLjUzOC0wLjA4NC01LjAyLTAuMjUzLTcuNDQNCgkJQzExMC4xOTIsMTA0Ljg5MywxMDkuODU3LDEwMi4yOCwxMDkuMzU0LDk5LjQ3OHoiLz4NCgk8cGF0aCBmaWxsPSIjRTBFMEUwIiBkPSJNNjAsNzguMTZjNy42MiwwLDE0LjEyNi0yLjY5NiwxOS41Mi04LjA4OGM1LjM5Mi01LjM5Myw4LjA4OC0xMS44OTgsOC4wODgtMTkuNTE5DQoJCXMtMi42OTYtMTQuMTI2LTguMDg4LTE5LjUxOUM3NC4xMjYsMjUuNjQzLDY3LjYyLDIyLjk0Niw2MCwyMi45NDZzLTE0LjEyOCwyLjY5Ny0xOS41MTksOC4wODkNCgkJYy01LjM5NCw1LjM5Mi04LjA4OSwxMS44OTctOC4wODksMTkuNTE5czIuNjk1LDE0LjEyNiw4LjA4OSwxOS41MTlDNDUuODcyLDc1LjQ2NCw1Mi4zOCw3OC4xNiw2MCw3OC4xNnoiLz4NCjwvZz4NCjwvc3ZnPg0K'
    }
  },
  computed: {
    'is_pass_invalid': function () {
      if ((this.user.password === this.user.password2) &&
          this.user.password2 !== undefined) {
        return false
      }
      return true
    },
    'when_profile_not_changed': function () {
      if (this.user.first_name === undefined &&
          this.user.last_name === undefined) {
        return true
      }
      return false
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
    updateDetails (user) {
      admin.updateUserDetails(this, user)
      // this.done()
    },
    changePassword (user) {
    },
    done () {
      this.is_editing = false
      this.$dispatch('listing', true)
      // this.$router.go('/admin')
    },
    cancel () {
      this.first_name = ''
      this.last_name = ''
      this.done()
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },
    createImage (file) {
      var reader = new window.FileReader()
      reader.onload = (e) => {
        this.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage () {
      this.image = ''
    }
  }
}
</script>
