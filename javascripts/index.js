new Vue({
  el: '#app',
  data () {
    return {
      info: '',
      loading: true,
      errored: false,
      uuid: '',
      token: ''
    }
  },
  
  mounted () {
    this.author_uuid_project = '1eb4b652-00a0-467a-b70b-adba9bdb7edf-habidash'
    this.uuid = localStorage.uuid;
    this.token = localStorage.token;
    const instance = axios.create({
      baseURL: 'https://habitica.com/api/v3',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json',
        'x-api-user': this.uuid,
        'x-api-key': this.token,
        'x-client': this.author_uuid_project,
      }
    });
    

    instance
      .get('/groups?type=party,guilds')
      .then(response => (this.info = response))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    },
    watch: {
      uuid(newUuid) {
        localStorage.uuid = newUuid;
      },
      token(newToken) {
        localStorage.token = newToken;
      }
    }
  })

  