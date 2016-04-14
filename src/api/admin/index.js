
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

  updateUserDetails (context, user, image) {
    var data = {
      id: user.id,                // req
      email: user.email,          // req
      password: user.password,    // req
      realm: user.realm,          // req
      first_name: user.first_name,
      last_name: user.last_name,
      updated_at: new Date(),
      image: image
    }
    console.log('Updating user: ' + JSON.stringify(data))
    context.$http.post(UPDATE_USER, data, this.options).then(function (resp) {
      console.log('Response: ' + JSON.stringify(resp.data))
    }, function (error) {
      console.log('Error: ' + JSON.stringify(error))
    })
  }
}
