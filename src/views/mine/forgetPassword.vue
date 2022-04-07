<template>
  <div class="covid-page forget-page">
    <header class="page-header">
      <span class="header-back" @click="$router.go(-1)">
        <svg-icon icon-class="gray-btn"></svg-icon>
      </span>
      <div class="header-content">{{$t('forget.title')}}</div>
    </header>
    <van-form validate-first @submit="handleSubmit">
      <van-field
        v-model="forgetPasswordForm.phone"
        type="tel"
        clearable
        :placeholder="$t('register.input_phone')"
        :rules="[{ required: true, message: $t('register.input_phone') }, {validator: validatorPhone, message: $t('register.input_phone_error')}]"
      />
      <van-field
        v-model="forgetPasswordForm.verifyCode"
        label-width="150"
        clearable
        :placeholder="$t('register.input_code')"
        :rules="[{ required: true, message: $t('register.input_code') }, {validator: validatorPhoneCode, message: $t('register.input_code_error')}]"
      >
        <van-button
          slot="button"
          plain
          size="small"
          @click="handleGetVerifyCode"
          type="info"
          :disabled="codeNum > 0"
          :loading="codeLoading"
          :loading-text="$t('register.code_sending')"
        >
          {{codeNum > 0 ? codeNum + $t('register.code_waiting') : $t('register.code_send')}}
        </van-button>
      </van-field>
      <van-field
        v-model="forgetPasswordForm.password"
        type="password"
        clearable
        :placeholder="$t('register.input_password')"
        :rules="[{ required: true, message: $t('register.input_password') }, {validator: validatorPassword, message: $t('register.password_placehold')}]"
      />
      <div class="covid-btns">
        <van-button
          type="info"
          class="covid-btn"
          :loading="submitLoading"
          :loading-text="$t('forget.submiting')"
        >
          {{$t('forget.submit')}}
        </van-button>
      </div>
    </van-form>
    
  </div>
</template>

<script>
export default {
  name: "forgetPassword",
  data() {
    return {
      forgetPasswordForm: {
        phone: null,
        verifyCode: null,
        password: null,
      },
      codeInterval: null,
      codeNum: 0,
      codeLoading: false,
      submitLoading: false,
    };
  },
  created() {},
  methods: {
    validatorPhone(val) {
      return /^1\d{10}$/.test(val);
    },
    validatorPhoneCode(val) {
      return /^\d{4}$/.test(val);
    },
    validatorPassword(val) {
      return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(val);
    },
    handleSubmit() {
      if (this.submitLoading) {
        return;
      }
      this.submitLoading = true;
      this.$http
        .post(`/api/user/resetPassword`, this.forgetPasswordForm)
        .then(response => {
          if (response.data.code === 0) {
            this.$toast({
              mask: false,
              message: response.data.msg
            });
            this.submitLoading = false;
            this.$router.push("/login");
          } else {
            this.submitLoading = false;
          }
        }).catch(error => {
          this.submitLoading = false;
        });
    },
    handleGetVerifyCode() {
      if (!this.forgetPasswordForm.phone) {
        this.$toast({
          mask: false,
          message: this.$t('register.phone_empty')
        });
        return;
      }
      if (this.codeLoading) {
        return;
      }
      this.codeLoading = true;
      this.$http
        .post(`/api/aliyun/send_msg`, {"phone": this.forgetPasswordForm.phone})
        .then(response => {
          if (response.data.code == 0) {
            this.codeNum = 60;
            this.codeInterval = setInterval(()=>{
              if (this.codeNum > 0) {
                this.codeNum--;
              } else {
                clearInterval(this.codeInterval);
                this.codeNum = 0;
              }
            }, 1000)
            this.$toast({
              mask: false,
              message: this.$t('register.send_success')
            });
            this.codeLoading = false;
          } else {
            this.codeLoading = false;
          }
        }).catch(error => {
          this.codeLoading = false;
        });
    }
  },
  destroyed() {
    clearInterval(this.codeInterval);
  }
};
</script>

<style scoped lang="scss">

</style>
