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
            v-model="credentials.email" disabled="true"></input>
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
                 @click="doReset()"
                 :disabled="is_invalid">
            Reset
          </button>
        </div>
        <div class="uk-form-row uk-text-small">
          <a class="uk-link uk-link-muted" v-link="'/login'">Login Instead?</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      credentials: {
        email: 'mhishami@gmail.com',
        password: '',
        password2: ''
      }
      error: ''
    }
  },

  computed: {
    'is_invalid': function () {
      if (this.email !== '' && /\S+@\S+\.\S+/.test(this.email)) {
        return false
      }
      return true
    }
  },

  methods: {
    doReset () {

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

