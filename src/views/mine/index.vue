<template>
  <div class="covid-page mine-layout">
    <header class="page-header">
      <router-link class="header-link" to="/index" tag="span">
        <img src="../../assets/icons/tabbar/home_blank.png" class="header-icon"/>
      </router-link>
    </header>
    <section class="mine-header">
      <img src="../../assets/image/setting/header.png" class="header-img" />
      <div class="login-regist" v-if="!isLogin">
        <router-link to="/login" class="order-item" tag="span">{{$t('common.login')}}</router-link>
        <router-link to="/register" class="order-item" tag="span">/{{$t('common.register')}}</router-link>
      </div>
      <ul class="user-info" v-if="isLogin">
        <li class="user-name">{{username}}</li>
      </ul>
    </section>
    <section class="mine-content">
      <ul class="options-list">
        <router-link to="/mine/history" class="option-item" tag="li">
          <div class="item-info">
            <svg-icon class="incon" icon-class="shipping-address"></svg-icon>
            <span>{{$t('mine.history')}}</span>
          </div>
          <van-icon name="arrow" color="#DBDBDB" />
        </router-link>
        <router-link to="/mine/messageCenter" class="option-item" tag="li" v-if="isLogin">
          <div class="item-info">
            <svg-icon class="incon" icon-class="message-center"></svg-icon>
            <span>{{$t('mine.message_center')}}</span>
          </div>
          <van-icon color="#DBDBDB" name="arrow" />
        </router-link>
        <router-link to="/mine/setting" class="option-item" tag="li">
          <div class="item-info">
            <svg-icon class="incon" icon-class="setting"></svg-icon>
            <span>{{$t('mine.setting')}}</span>
          </div>
          <van-icon color="#DBDBDB" name="arrow" />
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script>
import { checkLogin, getStore } from "../../utils/util";

export default {
  name: "",
  data() {
    return {
      isLogin: checkLogin(),
      username: getStore('username')
    };
  },
  created() {},
  computed: {},
  mounted() {
    this.$eventBus.$emit("changeTag", 3);
  },
  methods: {

  }
};
</script>

<style scoped lang="scss">
.index .covid-page.router-view.mine-layout {
  background: linear-gradient(#1989fa, #ffffff);
  .mine-header {
    display: flex;
    padding-left: 24px;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    padding-bottom: 20px;
    .header-img {
      width: 70px;
      height: 70px;
    }
    .user-info {
      padding-left: 16px;
      font-size: 15px;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }

    .login-regist {
      font-size: 15px;
      color: #fff;
      padding-left: 16px;
    }
  }
  .mine-content {
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 8px;
    padding: 0 16px;
    margin-top: 18px;
    .options-list {
      padding-top: 20px;
      .option-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        padding-bottom: 22px;
        .item-info {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 15px;
          color: #888;
          .incon {
            padding-right: 16px;
          }
          .header-img {
            width: 50px;
            height: 50px;
            padding-right: 16px;
          }
        }
      }
    }
  }
}
</style>
