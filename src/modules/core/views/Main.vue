<template>
  <el-container>
    <el-aside>
      <div style="display: flex;flex-flow: column;justify-content: space-between;height: 100%;">
        <div>
          <header class="logo" style="background:#f6f6f6!important;border-bottom:1px solid #f6f6f6">
            <img class="logo-img" src="@/assets/image/fyex.png" />
          </header>
          <el-menu
            background-color="#3f4144"
            :unique-opened="true"
            text-color="#fff"
            :router="true"
            :default-active="$route.path"
            style="border:none;"
          >
            <el-submenu
              v-for="(item, index) in menuTree[selectTreeIndex].childs"
              :index="index + '-'"
              :key="index"
            >
              <template slot="title">{{item.name}}</template>
              <el-menu-item
                v-for="list in item.childs"
                :key="list.id"
                :index="list.url"
              >{{list.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <div class="copyright">
          <!-- <p>Copyright</p> -->
          <p>企成科技 技术支持</p>
        </div>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <ul class="nav-items">
          <li
            v-for="(item,index) in menuTree"
            :key="item.id"
            :class="{'nav-item--active': index == selectTreeIndex}"
            class="nav-item"
            @click="selectTreeIndex = index"
          >{{item.name}}</li>
        </ul>
        <div class="user">
          <el-dialog
            title="修改密码"
            :visible.sync="visiblePwd"
            :append-to-body="true"
            :before-close="closePwd"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="400px"
            >
            <el-form :model="pwdData" ref="pwdData" label-position="right" label-width="100px">
              <el-form-item label="旧密码" prop="password" :rules="[{ required: true, message: '该字段不能为空'}]">
                <el-input v-model="pwdData.password"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword" :rules="[{ required: true, message: '该字段不能为空'}]">
                <el-input v-model="pwdData.newPassword"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="newPassword" :rules="[{ required: true, message: '该字段不能为空'}]">
                <el-input v-model="pwdData.confirmPassword"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="closePwd()">取 消</el-button>
              <el-button type="primary" @click="successPwd()" :loading="loading">确 定</el-button>
            </span>
          </el-dialog>
          <el-dropdown class="el-dropdown" :hide-on-click="false">
            <span>
              {{user.username}}
              <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item @click.native="digShow = true">修改密码</el-dropdown-item> -->
              <el-dropdown-item @click.native="openPwd">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>    
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      selectTreeIndex: 0,
      menuTree: [{ childs: [] }],
      user: {
        username: ''
      },
      pwdData: {
        confirmPassword: '',
        password: '',
        newPassword: ''
      },
      visiblePwd: false,
      loading: false
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user')) || {}
    this.getMenuTree()
  },
  methods: {
    getMenuTree() {
      this.$http.getMenuTree().then(res => {
        this.menuTree = res.data.data
      })
    },
    logout() {
      this.$confirm('确定退出当前账号吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.logout().then(() => {
            this.$router.replace('/login')
            localStorage.removeItem('user')
            // this.$message.success('退出成功')
          })
        })
        .catch(() => {
          return
        })
    },
    openPwd(row) {
      // this.pwdData.username = row
      this.visiblePwd = true
    },
    closePwd() {
      this.pwdData = {
        confirmPassword: '',
        password: '',
        newPassword: ''
      }
      this.visiblePwd = false
    },
    successPwd() {
      this.$refs.pwdData.validate(valid => {
        if (valid) {
          this.loading = true
          this.updatePwd()
        } else {
          return false
        }
      })
    },
    async updatePwd() {
      try {
        await this.$http.updatePwd(this.pwdData)
        this.loading = false
        this.$message.success('修改成功')
        this.closePwd();
        this.$http.logout().then(() => {
            this.$router.replace('/login')
            localStorage.removeItem('user')
        })
      } catch (err) {
        this.loading = false
        if (/超时/.test(err.data.message)) {
          this.closeLogin(true)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
  .el-aside {
    &::-webkit-scrollbar {
      display: none;
    }
    width: 240px !important;
    position: relative;
    background-color: #26292d;
    color: #fff;
    height: 100vh;
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      background: $--color-primary;
      border-bottom: 1px solid $--color-primary;
      &-img {
        // width: 60%;
        height: 45px;
      }
    }
  }
  .el-header {
    z-index: 1;
    display: flex;
    justify-content: space-between;
    box-shadow: 1px 2px 3px rgba(218, 218, 218, 0.88);
    .nav-items {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #a3a3a3;
      .nav-item {
        margin-right: 30px;
        cursor: pointer;
        &--active {
          color: #26292d;
        }
      }
    }
    .user {
      margin: 20px 0;
    }
  }

  .el-main {
    background: #f5f5f5;
  }
}

.copyright {
  font-size: 14px;
  color: #818996;
  text-align: center;
  padding: 15px 0;
  p {
    margin-top: 10px;
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>