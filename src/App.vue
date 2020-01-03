<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  methods:{
    login(){
      axios({
        method: 'get',
        url: '/sign_in',
        params: {
          name: '',
          password: ''
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
</style>
