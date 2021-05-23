<template>
  <el-row type="flex" class="row-bg" justify="center">
    <!-- 左侧部分   -->
    <el-col :xl="6" :lg="7">
      <h2>欢迎来到晓雨的毕设</h2>
      <el-image :src="require('@/assets/logo.png')" style="height: 280px;width: 280px"></el-image>
      <p>努力不一定成功 但放弃一定失败</p>
    </el-col>
    <!-- 中间部分 下滑分割线  -->
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>

    <el-col :xl="6" :lg="7">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
        <el-form-item label="用户名" prop="username" style="width: 380px">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 380px">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" style="width: 380px ">
          <el-input v-model="loginForm.code" style="width: 152px;float: left"></el-input>
          <el-image :src="captchaImg"  class="captchaImg"></el-image>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">立即创建</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        token: ''

      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ],
        code: [
          {type: 'date', required: true, message: '请填写验证码', trigger: 'change'},
          {min: 5, max: 5, message: '长度在 为 5 个字符', trigger: 'blur'}
        ]
      },
      captchaImg: null
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login', this.loginForm).then(res => {

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCaptcha() {
      this.$axios.get('/captcha').then(res => {
        console.log("/captcha")
        console.log(res)
        console.log(res.data.data.token)
        console.log(res.data.data.captchaImg)
        this.loginForm.token = res.data.data.token
        this.captchaImg = res.data.data.captchaImg
      })
    }
  },
  created() {
    this.getCaptcha()
  }
}
</script>

<style scoped>
.el-row {
  background-color: #78847e;
  height: 100%;
  display: flex;
  align-items: center;
}
.row-bg>.el-col>.el-form>.el-form-item> .el-form-item__content{
  display: flex !important;
}
.el-divider {
  height: 200px;
}

.captchaImg {
  float: left;
  margin-left: 8px;
  border-radius: 4px;

}


</style>