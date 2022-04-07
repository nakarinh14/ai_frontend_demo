<template>
  <div class="covid-page change-page">
    <header class="page-header">
      <span class="header-back" @click="$router.go(-1)">
        <svg-icon icon-class="gray-btn"></svg-icon>
      </span>
      <div class="header-content">{{$t('password.title')}}</div>
    </header>
    <van-form validate-first @submit="handleSubmit">
      <van-field
        v-model="changePasswordForm.old_password"
        type="password"
        clearable
        :placeholder="$t('password.input_origin')"
        :rules="[{ required: true, message: $t('password.input_origin') }]"/>
      <van-field
        v-model="changePasswordForm.new_password"
        type="password"
        clearable
        :placeholder="$t('password.input_new')"
        :rules="[{ required: true, message: $t('password.input_new') }, {validator: validatorPassword, message: $t('register.password_placehold')}]"
      />
      <div class="covid-btns">
        <van-button
          type="info"
          class="covid-btn"
          :loading="submitLoading"
          :loading-text="$t('password.saving')"
        >
          {{$t('password.save')}}
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "changePassword",
  data() {
    return {
      changePasswordForm: {
        old_password: null,
        new_password: null
      },
      submitLoading: false,
    };
  },
  created() {},
  methods: {
    validatorPassword(val) {
      return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(val);
    },
    handleSubmit() {
      if (this.submitLoading) {
        return;
      }
      this.submitLoading = true;
      this.$http
        .post(`/api/user/changePassword`, this.changePasswordForm)
        .then(response => {
          if (response.data.code === 0) {
            this.$toast({
              mask: false,
              message: response.data.msg
            });
            this.$router.push("/mine");
          } else {
            this.submitLoading = false;
          }
        }).catch(error => {
          this.submitLoading = false;
        });
    },
  }
};
</script>

<style scoped lang="scss">

</style>
