<template>
    <div style="display: flex;flex-direction: column;margin-top: 50px;">
        <div>
            <Button style="float: right;padding: 5px 20px;margin: 0 40px;" type="dashed" @click="show_logout">登出
            </Button>
            <Modal v-model="logout_status" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="ios-information-circle"></Icon>
                    <span>登出确认</span>
                </p>
                <div style="text-align:center">
                    <p>你确认吗</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long @click="logout">登出</Button>
                </div>
            </Modal>
        </div>
        <Spin fix v-if="spinShow">
            <Icon type="ios-loading" size=70 class="demo-spin-icon-load"></Icon>
            <div>加载中</div>
        </Spin>
        <div style="display: flex;">
            <div style="display:flex;flex-direction:column;border: 1px solid black;width: 70%;margin: auto;height: 600px;overflow: scroll">
                <div style="display: flex">
                    <div style="display: flex;flex: 1;">
                        <Button @click="add_note" style="margin: 15px auto;padding: 0 30px" type="dashed">
                            <Icon type="md-add" size="25"/>
                        </Button>
                    </div>
                    <div style="width: 150px;margin:15px auto;">
                        <Button style="width: 83px;" @click="deleteAll(checkgroup.length-1)" type="error">删除</Button>
                        <Checkbox
                                :value="checkAll"
                                @click.prevent.native="handleCheckAll">全选
                        </Checkbox>
                    </div>
                </div>
                <div style="display: flex;flex-direction: column;">
                    <CheckboxGroup v-model="checkgroup">
                        <div style="display: flex"
                             v-for="(item,index) in note">
                            <div class="notes" :style="{backgroundColor: color[item.color]}">
                                <div @click="modify(item)" style="flex: 1;text-align: left">
                                    {{item.content}}
                                </div>
                                <div style="width: 100px;">
                                    {{item.modify_date * 1000|changeTime}}
                                </div>
                            </div>
                            <div style="width: 60px;margin-top: 10px;">
                                <Checkbox :label="index">
                                    <Icon size="30" type="md-trash"/>
                                </Checkbox>
                            </div>
                        </div>
                    </CheckboxGroup>

                </div>
                <Modal
                        v-model="add"
                        :title="title"
                        @on-ok="ok"
                        @on-cancel="">
                    <Row>
                        <Col span="12">
                            <ColorPicker v-model="tag_color" :colors="color"/>
                        </Col>
                    </Row>
                    <!--                    <Dropdown style="margin-left: 10px">-->
                    <!--                        <a href="javascript:void(0)">-->
                    <!--                            选择颜色-->
                    <!--                            <Icon type="ios-arrow-down"></Icon>-->
                    <!--                        </a>-->
                    <!--                        <DropdownMenu style="width: 15px;" slot="list">-->
                    <!--                            <DropdownItem v-for="item in color" :style="{backgroundColor: item}">''</DropdownItem>-->
                    <!--                        </DropdownMenu>-->
                    <!--                    </Dropdown>-->
                    <Input type="textarea" :rows="5" v-model="tag_content" size="large" placeholder="请输入标签内容"/>
                </Modal>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import store from '@/store';

    export default {
        name: 'HelloWorld',
        data() {
            return {
                checkAll: false,
                color: ['#FDF191', '#D1E8F6', '#FFFFFF', '#E3F5B5', '#FFD5D5'],
                color_dic: {
                    '#FDF191': 0,
                    '#D1E8F6': 1,
                    '#FFFFFF': 2,
                    '#E3F5B5': 3,
                    '#FFD5D5': 4
                },
                note: '',
                title: '',
                add: false,
                tag_content: '',
                tag_color: '#FDF191',
                uid: '',
                checkgroup: [],
                spinShow: false,
                logout_status: false,
            }
        },
        mounted() {
            this.getnotes();
        },
        methods: {
            modify(item) {
                this.tag_color = this.color[item.color]
                console.log(this.tag_color)
                this.add = true;
                this.title = '修改标签';
                this.tag_content = item.content;
                this.uid = item.uid;
            },
            add_note() {
                this.tag_content = '';
                this.add = true;
                this.title = '新增标签'
            },
            getnotes() {
                axios({
                    method: 'get',
                    url: '/note',
                    params: {
                        name: store.state.name
                    }
                }).then(res => {
                    console.log(res.data.data)
                    this.note = res.data.data
                    this.note.sort((a, b) => {
                        return b['modify_date'] - a['modify_date']
                    })
                })
            },
            show_logout() {
                this.logout_status = true;
            },
            logout() {
                this.spinShow = true
                localStorage.removeItem('name')
                location.reload()
            },
            ok() {
                if (this.tag_content === '') {
                    this.$Notice.open({
                        title: this.title === '修改标签' ? '修改失败' : '新增失败',
                        desc: '标签内容不能为空'
                    });
                } else {
                    console.log(123)
                    const uuidv4 = require('uuid/v4');
                    axios({
                        method: 'post',
                        url: '/note',
                        params: {
                            name: store.state.name,
                            uid: this.uid || uuidv4(),
                            color: this.color_dic[this.tag_color],
                        },
                        data: this.tag_content
                    }).then(res => {
                        this.getnotes();
                    })
                    this.uid = '';
                    this.$Notice.open({
                        title: this.title === '修改标签' ? '修改成功' : '新增成功',
                        desc: this.tag_content
                    });
                }
            },
            handleCheckAll() {
                this.checkgroup = []
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    for (let i = 0; i < this.note.length; i++) {
                        this.checkgroup.push(i)
                    }
                } else {
                    this.checkgroup = [];
                }
            },
            deleteAll(index) {
                if (index !== -1) {
                    axios({
                        method: 'delete',
                        url: '/note',
                        params: {
                            name: store.state.name,
                            uid: this.note[this.checkgroup[index]].uid
                        }
                    }).then(
                        this.deleteAll(index - 1)
                    )
                } else {
                    this.spinShow = true;
                    setTimeout(() => {
                        location.reload()
                    }, 500)
                }
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .notes {
        flex: 1;
        display: flex;
        padding: 10px;
        border: 1px solid black;
        margin: 10px;
    }

    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .demo-spin-col {
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>
