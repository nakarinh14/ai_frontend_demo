<template>
  <div class="covid-page login-layout">
    <header class="page-header">
      <span class="header-back" @click="$router.go(-1)">
        <svg-icon icon-class="gray-btn"></svg-icon>
      </span>
      <router-link class="header-link" to="/register" tag="span">{{$t('common.register')}}</router-link>
    </header>
    <div class="page-logo">
      <img src="../../assets/image/setting/logo.png" />
    </div>
    <van-form validate-first @submit="handleUserLogin">
      <van-field
        v-model="loginForm.phone"
        type="tel"
        clearable
        :placeholder="$t('login.input_phone')"
        :rules="[{ required: true, message: $t('login.input_phone') }]"
      />
      <van-field
        v-model="loginForm.password"
        type="password"
        clearable
        :placeholder="$t('login.input_password')"
        :rules="[{ required: true, message: $t('login.input_password') }]"
      />
      <div class="login-register-btns">
        <van-button
          type="info"
          class="login-btn"
          :loading="submitLoading"
          :loading-text="$t('login.logining')"
        >
          {{$t('common.login')}}
        </van-button>
      </div>
    </van-form>
    <router-link class="login-forget" to="/mine/forgetPassword" tag="span">{{$t('login.forget')}}</router-link>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        phone: "",
        password: ""
      },
      submitLoading: false
    };
  },
  created() {},
  methods: {
    handleUserLogin() {
      if (this.submitLoading) {
        return;
      }
      this.submitLoading = true;
      this.$http
        .post(`/api/user/phone/login`, this.loginForm)
        .then(response => {
          if (response.data.code == 0) {
            this.$toast({
              mask: false,
              message: this.$t('login.success')
            });
            localStorage.setItem('user', JSON.stringify(response.data.data))
            this.submitLoading = false;
            this.$router.push("/mine");
          } else {
            this.submitLoading = false;
          }
        }).catch(error => {
          this.submitLoading = false;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.login-layout {
  .login-info {
    padding: 0 34px;
    .info-list {
      position: relative;
      .forget-pwd {
        position: absolute;
        bottom: -30px;
        left: 15px;
        color: #1989fa;
        font-size: 11px;
        display: flex;
        justify-content: center;
        align-items: center;
        .svg-icon {
          padding-right: 4px;
          width: 12px;
          height: 12px;
        }
      }
    }
  }
  .page-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 32px;
    margin-bottom:32px;
  }
  .login-register-btns {
    text-align: center;
    padding-top: 60px;
    .login-btn {
      display: inline-block;
      width: 275px;
      height: 44px;
      line-height: 44px;
      color: white;
      font-size: 17px;
      border-radius: 4px;
    }
  }
  .login-forget{
    width:200px;
    text-align: center;
    color:#8a8a8a;
    font-size: 14px;
    margin:0 auto;
    margin-top:10px;
    display: block;
  }
}
</style>
