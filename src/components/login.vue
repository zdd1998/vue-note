<template>
    <div style="display: flex;flex-direction: column">
        <div style="margin: 100px auto">
            <img src="../assets/icon_app.png" style="vertical-align: center" height="90" width="90"/><span
                style="font-size: 42px;">小米便签</span><br><br>
            <Input prefix="ios-contact" placeholder="请输入账号" style="width: 400px" v-model="name"/><br><br>
            <Input v-model="password" type="password" password placeholder="请输入密码" style="width: 400px"/><br><br>
            <Button @click="login" style="width: 270px">登陆</Button>
            <span slt style="cursor: pointer" @click="$router.push('/signup')">没有账号？马上注册</span>
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
                if (this.name === '' || this.password === '') {
                    this.$Notice.open({
                        title: '登陆失败',
                        desc: '账号或密码为空'
                    });
                } else {
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
                        } else {
                            this.$Notice.open({
                                title: '登陆失败',
                                desc: '账号或密码错误'
                            });
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>