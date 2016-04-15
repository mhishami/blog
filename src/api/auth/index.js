
import {router} from '../../main'

const HASH = require('hashit')
const SECRET_KEY = '9e408b35-f84c-4135-97be-c73c2cee1fbe'
const USER_URL = 'http://localhost:8983/solr/users'
const EMAIL_QUERY = USER_URL + '/select?wt=json&indent=on&q=id:'
const UPDATE_SINGLE_URL = USER_URL + '/update/json/docs?commit=true'
const INVALID_PASSWD = 'Invalid username, or password'

export default {
  user: {
    authenticated: false
  },

  options () {
    return [{
      headers: [{
        'Content-Type': 'application/json'
      }]
    }]
  },

  login (context, creds, redirect) {
    // console.log('Loggin in user ' + JSON.stringify(creds.email))
    context.$http.get(EMAIL_QUERY + '"' + creds.email + '"').then(function (resp) {
      // success
      // console.log('resp.data: ' + resp.data)
      if (resp.data !== undefined) {
        var found = resp.data.response.numFound
        if (found) {
          // console.log('Response: ' + JSON.stringify(resp.data.response.docs))
          var hashpass = resp.data.response.docs[0].password
          var pass = HASH(creds.password, SECRET_KEY)

          if (pass === hashpass) {
            // ok, good
            // console.log('User password is good...')
            window.localStorage.setItem('auth', JSON.stringify({email: creds.email}))
            router.go(redirect)
          } else {
            context.error = INVALID_PASSWD
          }
        } else {
          context.error = 'User not found!, Please register yourself'
        }
      } else {
        context.error = 'User not found!, Please register yourself'
      }
    }, function (error) {
      // failed
      console.log('Error: ' + JSON.stringify(error))
      context.error = INVALID_PASSWD
    })
  },

  register (context, creds, redirect) {
    // console.log('Checking user status...' + JSON.stringify(creds.email))
    context.$http.get(EMAIL_QUERY + '"' + creds.email + '"').then(function (resp) {
      // console.log('user_has_registered: ' + JSON.stringify(resp.data.response))
      if (resp.data.response.numFound === 0) {
        // ok, we can register the user
        var userdata = {
          id: creds.email,
          password: HASH(creds.password, SECRET_KEY),
          realm: 'user',
          first_name: '',
          last_name: '',
          contact: '',
          date_created: new Date(),
          date_updated: new Date()
        }

        // console.log('Registering user ' + JSON.stringify(creds))
        context.$http.post(UPDATE_SINGLE_URL, userdata, this.options).then(function (resp) {
          // console.log('Registration Response: ' + JSON.stringify(resp.data))
          if (resp.data.responseHeader.status === 0) {
            // ok, registering is a success
            router.go(redirect)
          }
        }, function (error) {
          console.log('Error: ' + JSON.stringify(error))
          context.error = 'Unable to register user at the moment. Pls try again'
        })
      } else {
        context.error = 'User has already registered'
      }
    }, function (error) {
      console.log('Error in querying user status: ' + JSON.stringify(error))
    })
  },

  deleteAllUsers (context) {
    var query = USER_URL + '/select?wt=json&indent=on&q=*:*'
    context.$http.get(query).then(function (resp) {
      var docs = resp.data.response.docs
      var ids = []
      for (var i = docs.length - 1; i >= 0; i--) {
        ids.push(docs[i].id)
      }
      var query2 = USER_URL + '/update?commit=true'
      context.$http.post(query2, {delete: ids}, this.options).then(function (resp) {
        console.log('Response: ' + JSON.stringify(resp.data))
      })
    })
  }

}
