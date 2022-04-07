<template>
  <div class="covid-page register-page">
    <header class="page-header">
      <span class="header-back" @click="$router.go(-1)">
        <svg-icon icon-class="gray-btn"></svg-icon>
      </span>
      <router-link class="header-link" to="/login" tag="span">{{$t('common.login')}}</router-link>
    </header>
    <div class="page-logo">
      <img src="../../assets/image/setting/logo.png" />
    </div>
    <van-form validate-first @submit="handleSubmit">
      <van-field
        v-model="phoneRegisterForm.phone"
        type="tel"
        clearable
        :placeholder="$t('register.input_phone')"
        :rules="[{ required: true, message: $t('register.input_phone') }, {validator: validatorPhone, message: $t('register.input_phone_error')}]"
      />
      <van-field
        v-model="phoneRegisterForm.verifyCode"
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
        v-model="phoneRegisterForm.password"
        type="password"
        clearable
        :placeholder="$t('register.input_password')"
        :rules="[{ required: true, message: $t('register.input_password') }, {validator: validatorPassword, message: $t('register.password_placehold')}]"
      />
      <van-field
        v-model="phoneRegisterForm.code"
        :placeholder="$t('register.input_invite')"
        clearable
        :rules="[{ required: true, message: $t('register.input_invite') }]"/>
      <div class="register-agreement">
        <van-checkbox v-model="agreementChecked" shape="square"></van-checkbox>
        <span @click="showAgreement = true">{{$t('register.agree')}}</span>
      </div>
      <div class="login-register-btns">
        <van-button
          type="info"
          class="login-btn"
          :loading="submitLoading"
          :loading-text="$t('register.registering')"
        >
          {{$t('common.register')}}
        </van-button>
      </div>
    </van-form>
    <van-dialog v-model="showAgreement" :showCancelButton="false" :title="$t('register.agreement')">
      <div class="agreement-content" v-html="AGREEMENT_zh" v-if="language === 'zh'"></div>
      <div class="agreement-content" v-html="AGREEMENT_hk" v-if="language === 'hk'"></div>
      <div class="agreement-content" v-html="AGREEMENT_en" v-if="language === 'en'"></div>
    </van-dialog>
  </div>
</template>

<script>
import { AGREEMENT_zh, AGREEMENT_en, AGREEMENT_hk } from "../../utils/agreement";
import { getLanguage } from "../../i18n/index";
export default {
  name: "register",
  data() {
    return {
      phoneRegisterForm: {
        phone: null,
        verifyCode: null,
        password: null,
        code: null
      },
      codeInterval: null,
      codeNum: 0,
      codeLoading: false,
      submitLoading: false,
      showAgreement: false,
      agreementChecked: false,
      AGREEMENT_zh,
      AGREEMENT_en,
      AGREEMENT_hk,
      language: getLanguage(),
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
      if (!this.agreementChecked) {
        this.$toast({
          mask: false,
          message: this.$t('register.agreement_checked')
        });
        return;
      }
      if (this.submitLoading) {
        return;
      }
      this.submitLoading = true;
      this.$http
        .post(`/api/user/phone/register`, this.phoneRegisterForm)
        .then(response => {
          if (response.data.code === 0) {
            localStorage.setItem('user', JSON.stringify(response.data.data))
            this.submitLoading = false;
            this.$toast({
              mask: false,
              message: this.$t('register.success')
            });
            this.$router.push("/mine");
          } else {
            this.submitLoading = false;
          }
        }).catch(error => {
          this.submitLoading = false;
        });
    },
    handleGetVerifyCode() {
      if (!this.phoneRegisterForm.phone) {
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
        .post(`/api/aliyun/send_msg`, {"phone": this.phoneRegisterForm.phone})
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
    },
  },
  destroyed() {
    clearInterval(this.codeInterval);
  }
};
</script>

<style scoped lang="scss">
.register-page {
  .page-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 32px;
    margin-bottom:32px;
  }
  .register-agreement{
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:20px auto;
    span{
      font-size:13px;
      color:#1989fa;
      text-decoration: underline;
      margin-left:10px;
    }
  }
  .login-register-btns {
    text-align: center;
    padding-top: 40px;
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
}
.agreement-content{
  width:100%;
  font-size:14px;
  padding:10px;
  height:400px;
  overflow-y:auto;
  color:#8a8a8a;
}
</style>
