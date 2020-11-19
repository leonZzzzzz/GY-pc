<template>
  <div>
    <div class="bg-img">
      <div class="password-box">
        <input type="password" v-model.trim="password" placeholder="请输入管理密码" />
        <div class="btn" @click="validPassword">开启</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    validType: String,
    id: String,
  },
  data() {
    return {
      password: '',
    }
  },
  methods: {
    validPassword() {
      if (this.password == "") {
        this.$message.error("请输入密码");
        return;
      }
      this.loading = true;
      let data = {
        id: this.id || this.$route.query.id,
        password: this.password
      };
      this.$emit('open', data)
      // this.$http[this.validType](data).then(res => {
      //   this.$emit('open')
      // })
    },
  }
}
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url('http://athena-1255600302.cosgz.myqcloud.com/attachments/bg-lottery.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
//  输入密码
.password-box {
  // width: 500px;
  // position: relative;
  // z-index: 101;
  input {
    position: relative;
    display: block;
    width: 300px;
    height: 32px;
    margin: 20px auto;
    line-height: 32px;
    font-size: 20px;
    color: #fff;
    text-indent: 15px;
    border-radius: 15px;
    padding: 5px 0;
    outline: 0 none;
    border: 2px solid transparent;
    background-color: rgba(0, 0, 0, 0.51);
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.46) inset,
      1px 2px 2px rgba(255, 255, 255, 0.61);
  }
  .btn {
    width: 300px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    cursor: pointer;
    border-radius: 12px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.37);
    background: -webkit-gradient(
      linear,
      50% 0%,
      50% 100%,
      color-stop(0%, rgba(255, 255, 255, 0.45)),
      color-stop(100%, rgba(218, 218, 218, 0))
    );
    &:hover {
      background: -webkit-gradient(
        linear,
        50% 0%,
        50% 100%,
        color-stop(0%, rgba(255, 255, 255, 0.45)),
        color-stop(100%, rgba(218, 218, 218, 0.3))
      );
    }
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.36);
    margin: 0 auto;
  }
}
</style>
