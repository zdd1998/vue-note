<template>
    <div style="display: flex;flex-direction: column">
        <div style="margin: auto;height: 100px;">
            <img src="../assets/icon_app.png" style="vertical-align: center" height="90" width="90"/>
            <span style="font-size: 42px;">小米便签</span>
            <div style="width: 200px;">
                <p>上一次编辑：{{data.modify_date * 1000|changeTime}}</p>
                <p>便签创建者：{{data.user}}</p>
            </div>
        </div>
        <div :style="{backgroundColor: color[data.color]}" class="content">
            {{data.content}}
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "showtag",
        data() {
            return {
                param: '',
                uid: '',
                data: '',
                color: ['#FDF191', '#D1E8F6', '#FFFFFF', '#E3F5B5', '#FFD5D5'],
            }
        },
        watch: {
            '$route' (to, from) {
                if (to.name === 'showtag') {
                    console.log(123)     // 在此调用函数
                }
            }
        },
        mounted() {
            console.log(456)
            this.param = this.$route.params.uid;
            console.log(this.param);
            var base64 = require('uuid-base64');
            this.uid = base64.decode(this.param);
            console.log(this.uid);
            this.getnote();
        },
        methods: {
            getnote() {
                axios({
                    method: 'get',
                    url: '/note/' + this.uid,
                }).then(res => {
                    console.log(res.data);
                    this.data = res.data;
                })
            }
        }
    }
</script>

<style scoped>
    .content {
        width: 70%;
        height: 500px;
        border: 1px solid black;
        overflow: scroll;
        margin: 50px auto;
        white-space: pre;
    }
</style>