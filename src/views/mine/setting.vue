<template>
  <div class="covid-page setting-page">
    <header class="page-header">
      <span class="header-back" @click="$router.go(-1)">
        <svg-icon icon-class="gray-btn"></svg-icon>
      </span>
      <div class="header-content">{{$t('setting.title')}}</div>
    </header>

    <section class="setting-content">
      <ul class="setting-list">
        <li class="setting-item" v-if="isLogin">
          <span class="setting-msg">{{$t('setting.message')}}</span>
          <van-switch v-model="checked" active-color="#D8182D" size="20px" />
        </li>
        <router-link to="/mine/changePassword" class="setting-item" tag="li" v-if="isLogin">
          <span class="setting-msg">{{$t('password.title')}}</span>
          <van-icon class="icon" name="arrow" />
        </router-link>
        <router-link tag="li" class="setting-item" to="/setting/faq">
          <span class="setting-msg">{{$t('setting.faq')}}</span>
          <van-icon class="icon" name="arrow" />
        </router-link>
        <li class="setting-item" @click="showAgreement = true">
          <span class="setting-msg">{{$t('setting.agreement')}}</span>
          <van-icon class="icon" name="arrow" />
        </li>
        <router-link tag="li" class="setting-item" to="/setting/language">
          <span class="setting-msg">{{$t('setting.language')}}</span>
          <van-icon class="icon" name="arrow" />
        </router-link>
        <router-link tag="li" class="setting-item" to="/setting/aboutAs">
          <span class="setting-msg">{{$t('about.title')}}</span>
          <van-icon class="icon" name="arrow" />
        </router-link>
      </ul>
    </section>
    <div class="covid-btns" v-if="isLogin">
      <van-button
        type="info"
        class="covid-btn"
        @click="logout"
      >
        {{$t('setting.logout')}}
      </van-button>
    </div>
    <van-dialog
      v-if="remoteAgreement != null && remoteAgreement.is_active"
      v-model="showAgreement"
      :showCancelButton="false"
      :title="language === 'th' ? remoteAgreement.title_th : remoteAgreement.title_en"
    >
      <div class="agreement-content" v-html="remoteAgreement.content" v-if="language === 'zh'"></div>
      <div class="agreement-content" v-html="remoteAgreement.content_en" v-if="language === 'en'"></div>
      <div class="agreement-content" v-html="remoteAgreement.content_th" v-if="language === 'th'"></div>
      <div class="agreement-content" v-html="remoteAgreement.content_hk" v-if="language === 'hk'"></div>
    </van-dialog>
  </div>
</template>

<script>
import { checkLogin } from "../../utils/util";
import { getLanguage } from "../../i18n/index";
export default {
  name: "Setting",
  data() {
    return {
      checked: false,
      isLogin: checkLogin(),
      language: getLanguage(),
      showAgreement: false,
      remoteAgreement: null,
    };
  },
  methods: {
    logout () {
      localStorage.removeItem('user');
      this.$router.push("/login");
    },
    checkProperty () {
      this.$http
        .get(`/api/property/all`)
        .then(res => {
          if (res.data.code == 0) {
            res.data.data.forEach(item => {
              if (item.property === 'AGREEMENT') {
                if (item.title_en === '' || item.title_en == null) {
                  item.title_en = item.title;
                }
                if (item.title_hk === '' || item.title_hk == null) {
                  item.title_hk = item.title;
                }
                if (item.title_th === '' || item.title_th == null) {
                  item.title_th = item.title;
                }
                if (item.content_en === '' || item.content_en == null) {
                  item.content_en = item.content;
                }
                if (item.content_hk === '' || item.content_hk == null) {
                  item.content_hk = item.content;
                }
                if (item.content_th === '' || item.content_th == null) {
                  item.content_th = item.content;
                }
                this.remoteAgreement = item;
              }
            });
          }
        })
    },
  },
  created() {
    this.checkProperty();
  },
};
</script>

<style scoped lang="scss">
.setting-page {
  .setting-content {
    padding: 20px 20px 0 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    .setting-list {
      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 20px;
        .icon {
          color: #949497;
          opacity: 0.5;
          font-size: 15px;
        }
        .setting-msg {
          color: #3a3a3a;
          font-size: 15px;
        }
      }
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
