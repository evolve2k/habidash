new Vue({
  el: '#app',
  data () {
    return {
      user: '',
      group: '',
      party: '',
      members: '',
      loading: true,
      errored: false,
      uuid: '',
      token: ''
    }
  },
  
  mounted () {
    this.author_uuid_project = '1eb4b652-00a0-467a-b70b-adba9bdb7edf-habidash';
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
      .get('/groups?type=party')
      .then(response => (this.group = response.data.data[0]))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false);
    instance
      .get('/groups/' + '2cf94783-4a9d-41ef-9102-40ba4bbba34d')
      .then(response => (this.party = response.data.data.chat[0].text))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false);
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

  