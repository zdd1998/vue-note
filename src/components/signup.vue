<template>
    <div>
        <div style="display: flex;flex-direction: column">
            <div style="margin: 100px auto">
                <img src="../assets/icon_app.png" style="vertical-align: center" height="90" width="90"/><span style="font-size: 42px;">小米便签</span><br><br>
                <Input prefix="ios-contact" placeholder="请输入账号" style="width: 400px" v-model="name"/><br><br>
                <Input v-model="password" type="password" password placeholder="请输入密码" style="width: 400px"/><br><br>
                <Input v-model="password_config" type="password" password placeholder="请确认密码" style="width: 400px"/><br><br>
                <Button @click="signup" style="width: 270px">注册</Button>
                <span style="cursor: pointer;margin-left: 30px;" @click="$router.push('/login')">返回登陆</span>
            </div>
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
                password: '',
                password_config : ''
            }
        },
        methods:{
            signup(){
                if(this.password!== this.password_config){
                    this.$Notice.open({
                        title: '注册账号错误',
                        desc: '密码不一致'
                    });
                }else{
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
                        }else{
                            this.$Notice.open({
                                title: '注册账号错误',
                                desc: '账号已经存在'
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