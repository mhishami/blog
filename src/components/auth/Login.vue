<template>

  <div class="uk-vertical-align uk-text-center uk-height-1-1 login-margin">
    <div class="uk-vertical-align-middle" style="width: 350px">
      <div class="uk-panel uk-panel-box uk-form">
        <img class="logo uk-margin-bottom" src="../../assets/logo.png"></a>

        <!-- some alert -->
        <div class="uk-alert uk-alert-warning" v-show="error">
          {{ error }}
        </div>
        <div class="uk-form-row">
          <input class="uk-width-1-1 uk-form-large" type="text" name="email" placeholder="Email" v-model="credentials.email"></input>
        </div>
        <div class="uk-form-row">
          <input class="uk-width-1-1 uk-form-large" type="password" name="password" placeholder="Password" v-model="credentials.password"></input>
        </div>
        <div class="uk-form-row">
          <button class="uk-width-1-1 uk-button uk-button-primary uk-button-large"
                  @click="login()"
                  :disabled="is_invalid">
            Login
          </button>
        </div>
        <div class="uk-form-row uk-text-small">
          <a class="uk-link uk-link-muted" v-link="'/register'">Register Instead?</a>
          <a class="uk-link uk-link-muted" @click="deleteAllUsers()">Delete All Users</a>
        </div>
        <div class="uk-form-row uk-text-small">
          <label class="uk-float-left"><input type="checkbox" /> Remember me</label>
          <a class="uk-float-right uk-link uk-link-muted" v-link="'/forgot'">Forgot Password</a>
        </div>
<!--
        <div class="uk-form-row uk-text-small uk-alert-success">
          <p>{{ credentials | json }}</p>
          <p>{{ error | json }}</p>
        </div>
 -->
      </div>
    </div>
  </div>

</template>

<script>
import auth from '../../api/auth'

export default {
  data () {
    return {
      credentials: {
        email: 'mhishami@gmail.com',
        password: 'sasasa12'
      },
      error: ''
    }
  },

  computed: {
    'is_invalid': function () {
      if (this.credentials.email !== '' &&
          this.credentials.password !== '') {
        return false
      }
      return true
    }
  },

  methods: {
    login () {
      var credentials = {
        email: this.credentials.email,
        password: this.credentials.password
      }
      auth.login(this, credentials, '/')
    },
    deleteAllUsers () {
      auth.deleteAllUsers(this)
    }
  }
}
</script>

<style type="text/scss">
.logo {
  width: 120px;
  height: 120px;
}

</style>

