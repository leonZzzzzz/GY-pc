<template>
  <div id="login" class="container">
    <div class="title-top">
      <!-- <div class="logo">
        <img src="@/assets/image/logo_notext.png" alt="">
      </div>-->
      <p>丰盈e鲜管理平台</p>
    </div>
    <section class="content">
      <!-- 登录 开始 -->
      <div>
        <div class="logo">
          <img src="@/assets/image/logo_notext.png" alt />
          <!-- <img src="@/assets/image/fyex-v.png" alt style="margin： -98px auto 0 auto;" /> -->
        </div>
        <!-- 账号登陆 -->
        <el-form :model="model" class="form" :rules="rules" ref="model">
          <el-form-item label="账号" label-width="50px" prop="username">
            <el-input
              type="text"
              v-model="model.username"
              placeholder="请输入账号"
              @keyup.enter.native="login"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="50px" prop="password">
            <el-input
              type="password"
              v-model="model.password"
              placeholder="请输入密码"
              @keyup.enter.native="login"
            ></el-input>
          </el-form-item>
          <el-button type="primary" class="button" :loading="loading" @click="login()">登 录</el-button>
        </el-form>
        <!-- <p class="text-reg">
          没有账号？
          <span @click="jumpPage('/register')">立即注册</span>
        </p>-->
      </div>
      <!-- 登录 结束 -->
    </section>
    <footer class="footer">
      <!-- <p>Copyright 2013-2018 企成科技 版权所有</p> -->
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.$store.commit('updateSession', false)
  },
  methods: {
    apiLogin(data) {
      this.$http
        .login(data)
        .then(res => {
          this.loading = false
          localStorage.setItem('user', JSON.stringify(res.data.data))
          this.$router.replace('/main/index')
        })
        .catch(err => {
          this.loading = false
          console.log('登陆接口失败', err)
        })
    },
    login() {
      this.loading = true
      this.$refs.model.validate(valid => {
        if (valid) {
          this.apiLogin(this.model)
        } else {
          this.loading = false
        }
      })
    },
    jumpPage() {}
  }
}
</script>

<style lang="scss" scoped>
#login {
  position: absolute;
  width: 100%;
  height: 100%;
  // background: #ebeef2;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  .login-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  .title-top {
    position: relative;
    color: #000;
    text-align: center;
    font-family: 'Microsoft YaHei';
    .logo {
      width: 150px;
      // margin: -55px auto 0 auto;
      line-height: 1;
      text-align: center;
      margin: 0 auto;
      img {
        width: 100%;
        transform: scale(2);
      }
    }
    p {
      margin: 30px 0 100px;
      font-size: 34px;
      letter-spacing: 10px;
      color: #000;
    }
  }
  .content {
    position: relative;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 1px 10px 0px #ccc;
    padding: 30px 50px;
    box-sizing: border-box;
    .logo {
      margin: -72px auto 0 auto;
      line-height: 1;
      text-align: center;
      img {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        padding: 5px;
        background: $--color-primary;
      }
    }
    .form {
      width: 300px;
      padding: 30px 0 0;
      clear: both;
      .el-form-item .el-form-item__label {
        line-height: 40px;
      }
      .code-img {
        display: inline-block;
        width: 120px;
        height: 38px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        text-align: center;
        // float: right;
      }
      .get-code {
        display: inline-block;
        width: 120px;
        height: 36px;
        border-radius: 4px;
        text-align: center;
        border: 1px solid #2161ad;
        color: #2161ad;
        cursor: pointer;
      }
      .button {
        width: 100%;
        margin-top: 40px;
      }
    }
    .wechat {
      width: 300px;
      .qrcode {
        width: 230px;
        margin: 30px auto;
        img {
          width: 100%;
        }
      }
      p {
        color: #999;
        font-size: 14px;
        text-align: center;
        line-height: 2;
        margin: 0 auto;
      }
    }
    .text-reg {
      font-size: 14px;
      text-align: center;
      margin-top: 30px;
      color: #999;
      span {
        color: $--color-primary;
        cursor: pointer;
      }
    }
  }
  .footer {
    // position: absolute;
    // bottom: 0;
    // width: 100%;
    padding: 20px 0;
    text-align: center;
    //  color: #fff;
    color: #2161ad;
    font-size: 14px;
  }
}
</style>