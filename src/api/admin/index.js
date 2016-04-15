
const USER_URL = 'http://localhost:8983/solr/users'
const GET_ALL_USERS = USER_URL + '/select?wt=json&q=*:*'
const UPDATE_USER = USER_URL + '/update/json/docs?commit=true&wt=json'

export default {

  options () {
    return [{
      headers: [{
        'Content-Type': 'application/json'
      }]
    }]
  },

  getAllUsers (context) {
    context.$http.get(GET_ALL_USERS).then(function (resp) {
      // console.log('Resp: ' + JSON.stringify(resp.data.response.docs))
      context.users = resp.data.response.docs
    })
  },

  updateUserDetails (context, user) {
    console.log('User: ' + JSON.stringify(user))
    user.updated_at = new Date()
    delete user._version_   // this will be created again

    console.log('Updated user: ' + JSON.stringify(user))
    context.$http.post(UPDATE_USER, user, this.options).then(function (resp) {
      console.log('Response: ' + JSON.stringify(resp.data))
    }, function (error) {
      console.log('Error: ' + JSON.stringify(error))
    })
  }
}
