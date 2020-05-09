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
    this.uuid = localStorage.uuid;
    axios
      .get('https://habitica.com/api/v3/status')
      .then(response => (this.info = response.data.data))
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

  