<template>
    <div style="display: flex;flex-direction: column">
        <div style="margin: 100px auto">
            <Input prefix="ios-contact" placeholder="请输入账号" style="width: 400px" v-model="name"/><br><br>
            <Input v-model="password" type="password" password placeholder="请输入密码" style="width: 400px"/><br><br>
            <Button @click="login" style="width: 270px">登陆</Button>
            <span @click="$router.push('/signup')">没有账号？马上注册</span>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import store from '@/store';

    export default {
        data() {
            return {
                name: '',
                password: ''
            }
        },
        mounted() {
            console.log(store.state.name)
        },
        methods: {
            login() {
                axios({
                    method: 'get',
                    url: '/sign_in',
                    params: {
                        name: this.name,
                        password: this.password
                    }
                }).then(res => {
                    if (res.data.code === 0) {
                        console.log(res.data)
                        store.commit('addname', this.name)
                        console.log(store.state.name)
                        this.$router.push('/')
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>