<template>
  <div class="covid-page home-layout">
    <header class="page-header">
<!--      <div style="align-items: center; display: flex">-->
<!--        <router-link class="header-link" to="/index" tag="span">-->
<!--          <img src="../../assets/icons/tabbar/home_active.png" class="header-icon"/>-->
<!--        </router-link>-->
<!--        <a class="header-link" style="margin-left: 10px" href="http://aimomics.org/">-->
<!--          <img src="../../assets/image/logo.png" class="header-logo"/>-->
<!--        </a>-->
<!--        <img style="margin-left: -13px" src="../../assets/image/demo_aietech_logo.png" class="header-logo1"/>-->
<!--      </div>-->
      <div style="display: flex; align-items: center">
        <router-link class="header-link" to="/index" tag="span">
          <img src="../../assets/icons/tabbar/home_active.png" class="header-icon"/>
        </router-link>
        <a class="header-link" style="margin-left: 0.3rem" href="http://aimomics.org/">
          <img src="../../assets/image/logo.png" class="header-logo"/>
        </a>
        <img src="../../assets/image/demo_aietech_logo.png" class="header-logo1"/>
      </div>
      <router-link class="header-link" to="/mine" tag="span">
        <img src="../../assets/icons/tabbar/mine_active.png" class="header-icon"/>
      </router-link>
    </header>
    <van-notice-bar
      left-icon="volume-o"
      color="#1989fa" background="#faf9ff"
      v-if="language === 'zh' && remoteBanner != null"
    >
      {{ remoteBanner.title }}: {{ remoteBanner.content }}
    </van-notice-bar>
    <van-notice-bar
      left-icon="volume-o"
      color="#1989fa" background="#faf9ff"
      v-if="language === 'en' && remoteBanner != null"
    >
      {{ remoteBanner.title_en }}: {{ remoteBanner.content_en }}
    </van-notice-bar>
    <van-notice-bar
      left-icon="volume-o"
      color="#1989fa" background="#faf9ff"
      v-if="language === 'hk' && remoteBanner != null"
    >
      {{ remoteBanner.title_hk }}: {{ remoteBanner.content_hk }}
    </van-notice-bar>
    <van-notice-bar
      left-icon="volume-o"
      color="#1989fa" background="#faf9ff"
      v-if="language === 'th' && remoteBanner != null"
    >
      {{ remoteBanner.title_th }}: {{ remoteBanner.content_th }}
    </van-notice-bar>
    <div class="home-title">
      {{$t('home.title')}}
    </div>
    <div class="home-tip">
      THAILAND USE ONLY
    </div>
    <div class="home-content">
      <b style="font-size: 0.40rem; color: #f8ec0b">
        {{ $t('order.high_risk_tip_0') }}
      </b>
      <span style="font-size: 0.30rem; color: #f8ec0b; margin-top: 0.35em">
        {{ $t('home.caution_intro') }}
      </span>
      <van-button size="normal" class="home-button home-button-white" v-show="agreementChecked" v-if="!uploadNeedLogin || isLogin" @click="handleSingle">{{$t('home.single')}}</van-button>
      <van-button size="normal" class="home-button" v-show="agreementChecked" v-if="!uploadNeedLogin || isLogin" @click="handleMulti">{{$t('home.multi')}}</van-button>
      <van-button size="normal" class="home-button" v-show="showAgreement || !agreementChecked" @click="handleShowAgree">{{$t('setting.agreement')}}</van-button>
      <div class="home-tip-text">
        {{$t('home.alert')}}<br/>
        {{$t('home.alert_1')}}<br/><br/>
        {{$t('home.alert_2')}}<br/><br/>
        {{$t('home.alert_3')}}
      </div>
    </div>
    <a href="http://www.aimomics.org" class="home-link">{{$t('home.cooperate')}} WWW.AIMOMICS.ORG</a>
    <van-dialog
      v-if="remoteAgreement != null && remoteAgreement.is_active"
      v-model="showAgreement"
      :showCancelButton="true"
      :cancelButtonText="$t('home.cancel')"
      :confirmButtonText="$t('home.agree')"
      :title="language === 'zh' ? remoteAgreement.title : language === 'en' ? remoteAgreement.title_en : remoteAgreement.title_th"
      :beforeClose="handleClose"
    >
      <div class="agreement-content" v-html="remoteAgreement.content" v-if="language === 'zh'"></div>
      <div class="agreement-content" v-html="remoteAgreement.content_en" v-if="language === 'en'"></div>
      <div class="agreement-content" v-html="remoteAgreement.content_hk" v-if="language === 'hk'"></div>
      <div class="agreement-content" v-html="remoteAgreement.content_th" v-if="language === 'th'"></div>
    </van-dialog>
    <van-dialog v-model="showIpDisable" :showCancelButton="false" :showConfirmButton="false">
      <div class="dialog-content">{{$t('home.check_ip_enable')}}</div>
    </van-dialog>
  </div>
</template>

<script>
import { checkLogin, getUrlKey } from "../../utils/util";
import { getLanguage } from "../../i18n/index";
export default {
  name: "home",
  data() {
    return {
      isLogin: checkLogin(),
      language: getLanguage(),
      showAgreement: !checkLogin(),
      agreementChecked: checkLogin(),
      uploadNeedLogin: false,
      ip_enable: true,
      showIpDisable: false,
      remoteBanner: null,
      remoteAgreement: null,
    };
  },
  created() {
    this.checkProperty();
    this.checkIpEnable();
    this.$http.post(`/api/record/send`, { event: 'open-demo-direct',  message: '进入Demo首页', user_name: localStorage.getItem('uuid') || null });
    const fromRegion = getUrlKey('fromRegion');
    if (fromRegion != null) {
      localStorage.setItem('region', fromRegion);
    } else {
      localStorage.removeItem('region');
    }
  },
  methods: {
    checkProperty () {
      this.$http
        .get(`/api/property/all`)
        .then(res => {
          if (res.data.code == 0) {
            res.data.data.forEach(item => {
              if (item.property === 'UPLOAD_NEED_LOGIN') {
                this.uploadNeedLogin = item.is_active;
              } else if (item.property === 'BANNER' && item.is_active) {
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
                this.remoteBanner = item;
              }  else if (item.property === 'AGREEMENT') {
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
    // 检测ip为境内
    checkIpEnable () {
      this.$http
        .get(`/api/order/check_ip_enable`)
        .then(res => {
          if (res.data.code == 0) {
            this.ip_enable = res.data.data.enable;
          }
        })
    },
    handleLogin () {
      this.$router.push("/login");
    },
    handleSingle () {
      if (!this.ip_enable) {
        this.showIpDisable = true;
      } else {
        this.$router.push("/single");
      }
    },
    handleMulti () {
      if (!this.ip_enable) {
        this.showIpDisable = true;
      } else {
        this.$router.push("/multi");
      }
    },
    handleShowAgree () {
      this.showAgreement = true;
    },
    handleClose(action, done) {
      if (action === 'confirm') {
        this.agreementChecked = true;
      }
      done();
    }
  }
};
</script>

<style scoped lang="scss">
body{
  overflow-x: hidden;
}
.home-layout {
  background: #ffffff;
  width: 100%;
  overflow-x: hidden;
  position: relative;
  &:after{
    position:absolute;
    left:-30%;
    right:0;
    bottom:0;
    content:"";
    z-index:1;
    height:83%;
    width:160%;
    border-radius:50% 50% 0 0;
    background: linear-gradient(#1989fa, #88bcf0);
  }
  .home-title {
    width: 100%;
    height: 16px;
    font-size: 15px;
    color: #1989fa;
    text-align: center;
    margin-top: 8px;
    z-index:10;
  }
  .home-tip{
    width: 100%;
    height: 20px;
    font-size: 9px;
    color: #1989fa;
    text-align: center;
    margin-top:4px;
    z-index:10;
  }
  .home-content{
    width:100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    z-index:100;
    position: relative;
    margin-top:80px;
    .home-button{
      width:200px;
      height:30px;
      border-radius: 15px;
      color:#ffffff;
      background: none;
      margin-top:30px;
      &.home-button-white{
        color:#1989fa;
        background: #ffffff;
        box-shadow: 0px 10px 10px rgba(0,0,0,0.4)
      }
    }
    .home-tip-text{
      width:100%;
      max-height: 45vh;
      overflow: auto;
      font-size: 12px;
      color: #ffffff;
      text-align: left;
      margin-top:30px;
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
.dialog-content{
  width:100%;
  font-size:14px;
  padding:20px;
  height:auto;
  color:#8a8a8a;
}
.home-link {
  color: #ffffff;
  font-size: 10px;
  font-family: PingFang SC, microsoft yahei;
  width: 180px;
  height: 20px;
  line-height: 20px;
  position: absolute;
  display: block;
  left: calc(50% - 90px);
  bottom: 20px;
  z-index: 10;
}
</style>

<style lang="scss">
.van-notice-bar {
  font-size: 12px;
  line-height: 16px;
  height: 16px;
}

</style>
