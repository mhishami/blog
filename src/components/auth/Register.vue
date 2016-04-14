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
          <input class="uk-width-1-1 uk-form-large" type="text" name="email" placeholder="Email"
            v-model="credentials.email"></input>
        </div>
        <div class="uk-form-row">
          <input class="uk-width-1-1 uk-form-large" type="password" name="pasword" placeholder="Password"
            v-model="credentials.password"></input>
        </div>
        <div class="uk-form-row">
          <input class="uk-width-1-1 uk-form-large" type="password" name="password2" placeholder="Password, again"
            v-model="credentials.password2"></input>
        </div>
        <div class="uk-form-row">
          <button class="uk-width-1-1 uk-button uk-button-primary uk-button-large"
                  @click="register()"
                  :disabled="is_invalid">
            Register
          </button>
        </div>
        <div class="uk-form-row uk-text-small">
          <a class="uk-link uk-link-muted" v-link="'/auth/login'">Login Instead?</a>
        </div>
<!--
        <div class="uk-form-row uk-text-small">
          {{ credentials | json }}
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
        password: 'sasasa12',
        password2: 'sasasa12'
      },
      error: ''
    }
  },

  computed: {
    'is_invalid': function () {
      if (this.credentials.email !== '' &&
          this.credentials.password2 !== '' &&
          this.credentials.password !== '') {
        // check is passwords are the same
        if (this.credentials.password === this.credentials.password2) {
          // check for password length
          if (this.credentials.password2.length < 8) {
            this.error = 'Password is too short. Must be more than 8 characters'
            return true
          }

          // then check for valid email
          if (/\S+@\S+\.\S+/.test(this.credentials.email)) {
            // email is valid
            this.error = ''
            return false
          } else {
            this.error = 'Invalid email address'
            return true
          }
        }

        // else return ok, enable the register button
        this.error = 'Passwords are not the same'
        return true
      }
      return true
    }
  },

  methods: {
    register () {
      var credentials = {
        email: this.credentials.email,
        password: this.credentials.password,
        password2: this.credentials.password2
      }
      auth.register(this, credentials, '/login')
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

