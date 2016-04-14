
const USER_URL = 'http://localhost:8983/solr/users'
const GET_ALL_USERS = USER_URL + '/select?wt=json&q=*:*'

export default {
  getAllUsers (context) {
    context.$http.get(GET_ALL_USERS).then(function (resp) {
      // console.log('Resp: ' + JSON.stringify(resp.data.response.docs))
      context.users = resp.data.response.docs
    })
  }
}
