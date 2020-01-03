<template>
    <div>
        <input type="text" v-model="name">
        <input type="text" v-model="password">
        <button @click="signup">注册</button>
        <span @click="$router.push('/login')">返回登陆</span>
    </div>
</template>

<script>
    import axios from 'axios';
    import store from '@/store';
    export default {
        data() {
            return {
                name: '',
                password: '',
            }
        },
        methods:{
            signup(){
                axios({
                    method: 'get',
                    url: '/sign_up',
                    params: {
                        name: this.name,
                        password: this.password
                    }
                }).then(res => {
                    if(res.data.code===0){
                        console.log(res.data)
                        this.$router.push('/login')
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>