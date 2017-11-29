<template>
  <div class="login">
    <div class="bg">
    </div>
    <Modal class="login-modal" v-model="loginModal" width="360" :closable="false" :mask-closable="false">
      <div>
        <h2 style="margin:10px;color:#abcdef;text-align:center">
          <img :src="require('@/assets/img/logo.png')" alt="" height="50"></h2>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <Form-item prop="username">
            <Input v-model="formValidate.username" placeholder="请输入姓名"></Input>
          </Form-item>
          <Form-item prop="password">
            <Input v-model="formValidate.password" @keyup.native.enter="handleSubmit('formValidate')" type="password" placeholder="请输入密码"></Input>
          </Form-item>

          <Row>
            <Col span="12">
            <Checkbox-group v-model="formValidate.remember">
              <Checkbox label="记住我"></Checkbox>
            </Checkbox-group>
            </Col>
            <Col span="12">
            <!-- <a style="float:right" @click="toRegister">新用户注册</a> -->
            </Col>
          </Row>

        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="modal_loading" @click="handleSubmit('formValidate')">登录
        </Button>
        <small style="text-align: center;display:block" class="subText">@copyright by Zan</small>
      </div>
    </Modal>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  export default {
    name: 'login',
    data () {
      return {
        loginModal: true,
        modal_loading: false,
        formValidate: {
          username: '',
          password: ''
        },
        ruleValidate: {
          username: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码错误', trigger: 'blur'}
          ]

        }
      }
    },
    methods: {
      handleSubmit (name) { // login
        var vm = this
        this.$refs[name].validate((valid) => {
          this.modal_loading = true
          Cookies.set('token', this.formValidate.password)
          var params = this.formValidate
          this.$api.Login(params).then((res) => {
            vm.loading2 = false
            console.log(res)
            if (res.token) {
              this.$Message.success('登录成功!')
              Cookies.set('token', res.token)
              Cookies.set('pwd', res.token + params.password)
              this.$router.push('/index')
            } else {
              this.$Message.error(res.msg)
            }
          })
        })
          // var params = this.formValidate
        //   this.$api.Login(params).then((res) => {
        //   // console.log(res)
        //   // if (res) {
        //   //   this.listData = res
        //   //   this.DateReady = true
        //   //   this.loading2 = false
        //   // } else {
        //   //   this.$Message.error(res.msg)
        //   //   this.loading2 = false
        //   // }
        // })
          // setTimeout(() => {
          //   this.modal_loading = false
          //   if (valid) {
          //     this.$Message.success('登录成功!')
          //     Cookies.set('token', this.formValidate.password)
          //     this.$router.push('/index')
          //   } else {
          //     this.$Message.error('表单验证失败!')
          //     this.$Notice.warning({
          //       title: '登录提示',
          //       desc: '用户名/密码 随意输入...'
          //     })
          //   }
          // }, 2000)
        // })
      },
      toRegister () {
        this.$router.push('/register')
      }
    }
  }
</script>


