<template>
  <div class="covid-page order-layout">
    <header class="page-header">
      <router-link class="header-link" to="/index" tag="span">
        <img src="../../assets/icons/tabbar/home_active.png" class="header-icon"/>
      </router-link>
      <div style="display: flex; align-items: center">
        <a class="header-link" style="margin-left: 10px" href="http://aimomics.org/">
          <img src="../../assets/image/logo.png" class="header-logo"/>
        </a>
        <img src="../../assets/image/demo_aietech_logo.png" class="header-logo1"/>
      </div>
      <router-link class="header-link" to="/mine" tag="span">
        <img src="../../assets/icons/tabbar/mine_active.png" class="header-icon"/>
      </router-link>
    </header>
    <div class="order-title">
      {{$t('home.title')}}
    </div>
    <div class="order-tip" v-show="language != 'en'">
      COVID-19 AIETECH EYE TEST
    </div>
    <div class="order-content" v-if="step == 0">
      <div class="order-help">
        {{$t('order.step_0_title')}}
      </div>
      <van-button size="normal" style="margin-top:30px;" class="order-button" v-if="uploadNeedLogin && !isLogin" @click="handleLogin">{{$t('order.step_0_login')}}</van-button>
      <van-uploader :after-read="handleInput" accept="image/*" capture="user" class="order-uploader" style="margin-top:30px;" v-if="max_test_enable && ip_enable && (!uploadNeedLogin || isLogin)">
        <van-button size="normal" class="order-button order-button-white">{{$t('order.step_0_camera')}}</van-button>
      </van-uploader>
      <van-button size="normal" class="order-button order-button-white" style="margin-top:30px;" @click="handleCheck" v-if="(!max_test_enable || !ip_enable) && (!uploadNeedLogin || isLogin)">{{$t('order.step_0_camera')}}</van-button>
      <van-uploader :after-read="handleInput" accept="image/*" class="order-uploader" v-if="max_test_enable && ip_enable && (!uploadNeedLogin || isLogin)">
        <van-button size="normal" class="order-button">{{$t('order.step_0_choose')}}</van-button>
      </van-uploader>
      <van-button size="normal" class="order-button" style="margin-top:30px;" @click="handleCheck" v-if="(!max_test_enable || !ip_enable) && (!uploadNeedLogin || isLogin)">{{$t('order.step_0_choose')}}</van-button>
      <div class="order-tip-text" style="margin-top: 30px;">
        {{$t('home.alert')}}<br/>
        {{$t('order.tip_0')}}<br/><br/>
        {{$t('multi.tip_1')}}<br/><br/>
        {{$t('multi.tip_2')}}<br/><br/>
        {{$t('multi.tip_3')}}<br/><br/>
        {{$t('multi.tip_4')}}<br/>
      </div>
    </div>
    <div class="order-content" v-if="step == 1">
      <div class="order-reset">
        <van-uploader :after-read="handleInput" accept="image/*" capture="user" class="order-uploader">
          <van-button size="normal" class="order-button">{{$t('order.step_1_camera')}}</van-button>
        </van-uploader>
        <van-uploader :after-read="handleInput" accept="image/*" class="order-uploader">
          <van-button size="normal" class="order-button">{{$t('order.step_1_choose')}}</van-button>
        </van-uploader>
      </div>
      <div class="order-clip" id="clipArea"></div>
      <van-button size="normal" class="order-button order-button-white" @click="handleNext">{{$t('order.step_1_next')}}</van-button>
      <div class="order-example-text">
        {{$t('order.step_1_tip_0')}}<br/>
        {{$t('order.step_1_tip_1')}}
      </div>
      <img src="../../assets/image/eye.jpg" class="order-example"/>
    </div>
    <div class="order-content" v-if="step == 2">
      <div class="order-help">
        {{$t('order.step_2_title')}}
      </div>
      <img :src="uploadImage" class="order-preview-image"/>
      <div class="order-prview-text">
        {{$t('order.step_2_tip_1')}}
        <br/><br/>
        {{$t('order.step_2_tip_2')}}
      </div>
      <img src="../../assets/image/eye.jpg" class="order-example"/>
      <div class="order-preview-buttons">
        <van-button size="normal" icon="success" class="order-button order-button-white" @click="handleUpload">{{$t('order.step_2_test')}}</van-button>
        <van-button size="normal" icon="cross" class="order-button" @click="handleBack">{{$t('order.step_2_back')}}</van-button>
      </div>
    </div>
    <div class="order-content" v-if="step == 3">
      <div class="order-help">
        {{$t('order.step_3_title')}}
      </div>
      <van-circle v-model="currentCircle" :rate="99" :speed="20" :text="text" :stroke-width="80" layer-color="#eeeeee" :color="gradientColor" size="150" style="margin-top:20px;"/>
    </div>
    <div class="order-content" v-if="step == 4">
      <div class="order-help" style="margin-top:40px;">
        {{$t('order.step_4_title')}}
      </div>
      <van-button size="normal" class="order-button" style="margin-top:20px;" @click="handleBack">{{$t('order.step_5_rePredict')}}</van-button>
    </div>
    <div class="order-content" v-if="step == 5 && extra_order_tip != null">
      <van-form @submit="handleSubmitExtra">
        <van-cell-group v-for="(item, index) in extra_order_tip" :key="item.title" >
          <van-field
            v-if="item.type === 0"
            v-model="extra_order_tip_form[index]"
            :label="language === 'zh' ? item.title : language === 'hk' ? item.title_hk : item.title_en"
            type="text"
            clearable
            :rules="[{ required: true, message: $t('order.not_empty')}]"
          />
          <van-field
            readonly
            clickable
            v-if="item.type === 1"
            v-model="extra_order_tip_form[index]"
            :label="language === 'zh' ? item.title : language === 'hk' ? item.title_hk : item.title_en"
            :rules="[{ required: true, message: $t('order.not_empty')}]"
            @click="orderTipOnOpen($event, index)"
          />
        </van-cell-group>
        <van-popup v-model="extra_order_tip_show" round position="bottom">
            <van-picker
              show-toolbar
              :columns="extra_order_tip_columns"
              @confirm="orderTipOnConfirm($event)"
              @cancel="extra_order_tip_show = false"
            />
          </van-popup>
        <div class="covid-btns">
          <van-button
            type="info"
            class="covid-btn"
            :loading="handleSubmitExtraLoading"
            :loading-text="$t('password.saving')"
          >
            {{$t('password.save')}}
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="order-content" v-if="step == 6">
      <div class="order-result">
        <div class="result-item" v-if="!isNormalUser">
          <span class="result-label">{{result_healthy.label}}</span>
          <van-circle v-model="result_healthy.prob" :rate="result_healthy.prob" :text="result_healthy.prob + '%'" :speed="40" stroke-linecap="square" :stroke-width="100" layer-color="#eeeeee" :color="gradientColorHealthy" size="100"/>
        </div>
        <div class="result-item">
          <span class="result-title">COVID-19</span>
          <span class="result-label" v-if="cv19_low_risk">{{$t('order.step_5_low')}}</span>
          <span class="result-label result-label-high" v-if="!cv19_low_risk">{{$t('order.step_5_high')}}</span>
          <van-circle v-model="result_cv19.prob" :rate="result_cv19.prob" :text="result_cv19.prob + '%'" :speed="40" stroke-linecap="square" :stroke-width="100" layer-color="#eeeeee" :color="gradientColorCV19" size="150"/>
          <div class="dialog-content" v-if="!cv19_low_risk">
            <span style="color: red; font-weight: bold;">{{$t('order.high_risk_tip_0')}}</span>
            <span style="color: red;">{{$t('order.high_risk_tip_1')}}</span>
          </div>
        </div>
        <div class="result-item" v-if="!isNormalUser">
          <span class="result-label">{{result_pulmonary.label}}</span>
          <van-circle v-model="result_pulmonary.prob" :rate="result_pulmonary.prob" :text="result_pulmonary.prob + '%'" :speed="40" stroke-linecap="square" :stroke-width="100" layer-color="#eeeeee" :color="gradientColorCV19" size="100"/>
        </div>
        <div class="result-item" v-if="!isNormalUser">
          <span class="result-label">{{result_ocular.label}}</span>
          <van-circle v-model="result_ocular.prob" :rate="result_ocular.prob" :text="result_ocular.prob + '%'" :speed="40" stroke-linecap="square" :stroke-width="100" layer-color="#eeeeee" :color="gradientColorCV19" size="100"/>
        </div>
      </div>
      <van-button size="normal" class="order-button" @click="handleBack">{{$t('order.step_5_rePredict')}}</van-button>
      <div class="order-result-tip" v-if="!cv19_low_risk">{{$t('order.step_6_tip')}}</div>
      <a class="order-result-tip-a" v-if="!cv19_low_risk" href="mailto: service@aimomics.org">service@aimomics.org</a>

    </div>
    <van-dialog v-model="showIpDisable" :showCancelButton="false" :showConfirmButton="false">
      <div class="dialog-content">{{$t('home.check_ip_enable')}}</div>
    </van-dialog>
    <van-dialog v-model="showMaxTestDisable" :showCancelButton="false" :showConfirmButton="false">
      <div class="dialog-content">{{$t('home.check_max_test')}}</div>
    </van-dialog>
<!--    <van-dialog v-model="showHighRisk" className="high-risk-dialog" :showCancelButton="false" :showConfirmButton="true" :confirmButtonText="$t('order.high_risk_tip_confirm')">-->
<!--      <div class="dialog-content">-->
<!--        <span style="color: red; font-weight: bold;">{{$t('order.high_risk_tip_0')}}</span>-->
<!--        {{$t('order.high_risk_tip_1')}}-->
<!--      </div>-->
<!--    </van-dialog>-->
  </div>
</template>

<script>
import { checkLogin, isNormalUser, dataURLtoFile } from "../../utils/util";
import { getLanguage } from "../../i18n/index";
import * as imageConversion from 'image-conversion';
import PhotoClip from 'photoclip';
import EXIF from 'exif-js';
export default {
  name: 'home',
  data () {
    return {
      submitLoading: false,
      submitSuccess: false,
      uploadNeedLogin: false,
      isLogin: checkLogin(),
      language: getLanguage(),
      isNormalUser: isNormalUser(),
      step: 0,
      uploadImage: null,
      currentCircle:0,
      circleInterval: null,
      photo_clip: null,
      gradientColor: {
        '0%': '#3fecff',
        '100%': '#6149f6',
      },
      gradientColorHealthy: {
        '0%': '#07c160',
        '50%': '#ff976a',
        '100%': '#ee0a24',
      },
      gradientColorCV19: {
        '0%': '#07c160',
        '50%': '#ff976a',
        '100%': '#ee0a24',
      },
      maxImageSize: 4 * 1024 * 1024,
      result_healthy: {"label": "Healthy", "prob": "0"},
      result_cv19: {"label": "CV19", "prob": "0"},
      result_pulmonary: {"label": "Pulmonary", "prob": "0"},
      result_ocular: {"label": "Ocular", "prob": "0"},
      ip_enable: true,
      max_test_enable: true,
      showIpDisable: false,
      showMaxTestDisable: false,
      showHighRisk: false,
      extra_order_tip: null,
      extra_order_tip_form: [],
      extra_order_tip_show: false,
      extra_order_tip_columns: [],
      handleSubmitExtraLoading: false,
      needSubmitForm: false,
      order_id: null,
      cur_select_index: 0,
    }
  },
  computed: {
    text() {
      return this.currentCircle.toFixed(0) + '%';
    },
    cv19_low_risk() {
      if (parseFloat(this.result_cv19.prob) >= 50) {
        return false
      } else {
        return true
      }
    },
  },
  created() {
    this.checkNeedLogin();
    this.checkIpEnable();
    this.checkMaxTest();
  },
  methods: {
    checkNeedLogin () {
      this.$http
        .get(`/api/property/all`)
        .then(response => {
          if (response.data.code == 0) {
            response.data.data.forEach(item => {
              if (item.property == 'UPLOAD_NEED_LOGIN') {
                this.uploadNeedLogin = item.is_active;
              } else if (item.property == 'ORDER_TIP') {
                if (item.extra !== '' && item.extra != null) {
                  const temp = JSON.parse(item.extra);
                  temp.forEach((item, index) => {
                    item.options = item.options != null ? item.options.split(';') : [];
                    item.options_hk = item.options_hk != null ? item.options_hk.split(';') : [];
                    item.options_en = item.options_en != null ? item.options_en.split(';') : [];
                    this.extra_order_tip_form[index] = null;
                  })
                  this.extra_order_tip = temp;
                }
                if (item.is_active) {
                  this.needSubmitForm = true;
                } else {
                  this.needSubmitForm = false;
                }
              }
            });
          }
        })
    },
    orderTipOnOpen (_, index) {
      this.extra_order_tip_columns = this.language === 'zh' ? this.extra_order_tip[index].options : this.language === 'hk' ? this.extra_order_tip[index].options_hk : this.extra_order_tip[index].options_en;
      this.cur_select_index = index;
      this.extra_order_tip_show = true;
    },
    orderTipOnConfirm (val) {
      this.extra_order_tip_form[this.cur_select_index] = val;
      this.extra_order_tip_columns = [];
      this.extra_order_tip_show = false;
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
    // 检测测试过多
    checkMaxTest () {
      this.$http
        .get(`/api/order/check_max_test`)
        .then(res => {
          if (res.data.code == 0) {
            this.max_test_enable = res.data.data.enable;
          }
        })
    },
    handleCheck (e) {
      e.preventDefault();
      if (!this.ip_enable) {
        this.showIpDisable = true;
      } else if (!this.max_test_enable) {
        this.showMaxTestDisable = true;
      }
    },
    handleInput (file) {
      this.step = 1;
      setTimeout(()=>{
        if (this.photo_clip != null) {
          this.photo_clip.destroy();
        }
        let that = this;
        EXIF.getData(file.file,  function() {
          EXIF.getAllTags(this);
          let orient = EXIF.getTag(this, 'Orientation');
          that.photo_clip = new PhotoClip('#clipArea', {
            size: [285, 75],
            outputSize: [950, 250],
            maxZoom: 2,
            rotateFree: true,
            outputQuality: 0.96,
            lrzOption: {
              width: 3000,
              height: 2000,
              quality: 1
            }
          });
          that.photo_clip.load(file.file);
          if (orient === 6) {
            setTimeout(() => {
              that.photo_clip.rotate(-90, 0);
            }, 1000)
          }
        })
      })
    },
    handleNext() {
      this.step = 2
      this.uploadImage = this.photo_clip.clip()
      this.photo_clip.destroy();
      this.photo_clip = null;
    },
    handleBack() {
      this.step = 0
      this.photo_clip.destroy();
      this.photo_clip = null;
      this.checkMaxTest();
      this.checkIpEnable();
    },
    handleUpload () {
      if (this.submitLoading) {
        return;
      }
      this.submitLoading = true;
      this.submitSuccess = false;
      this.currentCircle = 0;
      this.step = 3;
      let file = dataURLtoFile(this.uploadImage, 'covid.jpg');
      this.circleInterval = setInterval(() => {
        if (this.currentCircle < 99) {
          this.currentCircle++;
        } else if (this.currentCircle >= 99 && this.submitSuccess) {
          this.currentCircle = 100;
          if (this.needSubmitForm) {
            this.step = 5;
          } else {
            this.step = 6;
          }
          clearInterval(this.circleInterval);
        }
      },50)

      let formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append('type', '1')
      if (localStorage.getItem('uuid') != null) {
        formData.append('uuid', localStorage.getItem('uuid'));
      }
      if (localStorage.getItem('region') != null) {
        formData.append('region', localStorage.getItem('region'));
      }
      if (file.size > this.maxImageSize) {
        imageConversion.compressAccurately(file, this.maxImageSize / 1024).then(res=>{
          //The res in the promise is a compressed Blob type (which can be treated as a File type) file;
          formData.append('img0', res); //接口需要传的参数
          this.upload(formData);
        })
      } else {
        formData.append('img0', file); //接口需要传的参数
        this.upload(formData);
      }
    },
    upload(formdata) {
      this.$http
        .post(`/api/order/check`, formdata, {timeout: 120000})
        .then(response => {
          if (response.data.code == 0) {
            this.submitSuccess = true;
            let ret = response.data.data;
            this.result_healthy.prob = Number(ret.healthy)
            this.result_cv19.prob = Number(ret.cv19)
            this.result_pulmonary.prob = Number(ret.pulmonary)
            this.result_ocular.prob = Number(ret.ocular)
            this.order_id = ret.id
            if (ret.uuid != null) {
              localStorage.setItem("uuid", ret.uuid)
            }
            if (!this.needSubmitForm && parseFloat(this.result_cv19.prob) >= 50) {
              this.showHighRisk = true;
            }
            this.$http.post(`/api/record/send`, { event: 'single_test',  message: '快速检测成功', user_name: localStorage.getItem('uuid') || null });
            this.submitLoading = false;
          } else {
            this.$http.post(`/api/record/send`, { event: 'single_test',  message: '快速检测失败', user_name: localStorage.getItem('uuid') || null });
            clearInterval(this.circleInterval);
            this.currentCircle = 0;
            this.submitLoading = false;
            this.step = 3;
          }
        }).catch(error => {
          clearInterval(this.circleInterval);
          this.currentCircle = 0;
          this.submitLoading = false;
          this.step = 3;
        });
    },
    handleSubmitExtra () {
      if (this.handleSubmitExtraLoading) {
        return;
      }
      const formdata = {
        order_id: this.order_id,
        extra: '',
      }
      if (this.isLogin) {
        formdata.user_id = localStorage.getItem('user').uid;
      } else {
        formdata.uuid = localStorage.getItem('uuid');
      }
      formdata.extra = JSON.stringify(this.extra_order_tip.map((item, index) => {
        return {
          key: this.language === 'zh' ? item.title : this.language === 'hk' ? item.title_hk : item.title_en,
          value: this.extra_order_tip_form[index],
        }
      }))
      this.$http
        .post(`/api/order/updateExtra`, formdata)
        .then(response => {
           if (response.data.code == 0) {
             if (parseFloat(this.result_cv19.prob) >= 50) {
              this.showHighRisk = true;
            }
             this.step = 6;
           } else {
             this.$toast({
              mask: false,
              message: 'Submit Error'
            });
           }
        }).catch(error => {
          this.$toast({
            mask: false,
            message: 'Submit Error'
          });
        });
    },
    handleLogin () {
      this.$router.push("/login");
    },
    parseInt (value) {
      return parseInt(value)
    }
  },
  destroyed() {
    if (this.circleInterval != null) {
      clearInterval(this.circleInterval);
    }
    if (this.photo_clip != null) {
      this.photo_clip.destroy();
    }
  }
}
</script>

<style scope lang="scss">
body{
  overflow-x: hidden;
}
.order-layout {
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
    background: linear-gradient(#1989fa, #c0ddfa);
  }
  .order-title {
    width: 100%;
    height: 16px;
    font-size: 15px;
    color: #1989fa;
    text-align: center;
    margin-top:15px;
    z-index:10;
  }
  .order-tip{
    width: 100%;
    height: 20px;
    font-size: 11px;
    color: #1989fa;
    text-align: center;
    margin-top:4px;
    z-index:10;
  }
  .order-content{
    width:100%;
    // height:400px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    z-index:100;
    position: relative;
    margin-top:80px;
    .order-help{
      width:100%;
      font-size: 18px;
      color: #ffffff;
      text-align: center;
      margin-top:20px;
    }
    .order-uploader{
      width:200px;
      height:30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top:20px;
    }
    .order-button{
      width:200px;
      height:30px;
      border-radius: 15px;
      color:#ffffff;
      background: none;
      &.order-button-white{
        color:#1989fa;
        background: #ffffff;
        box-shadow: 0px 10px 10px rgba(0,0,0,0.4)
      }
    }
    .order-reset{
      width:240px;
      display: flex;
      margin-top:0;
      justify-content: space-between;
      margin-bottom:10px;
      .order-uploader{
        width:100px;
        margin-top:0;
        .order-button{
          width:100px;
        }
      }
    }
    .order-tip-text{
      width:100%;
      font-size: 12px;
      color: #ffffff;
      text-align: left;
      margin-top:20px;
    }
    .order-clip{
      width:100%;
      height:150px;
      z-index: 100;
      margin-bottom:20px;
      margin-top:20px;
    }
    .order-example-text{
      width:100%;
      font-size: 12px;
      color: #ffffff;
      text-align: left;
      margin-top:20px;
    }
    .order-example{
      width: 285px;
      height: 75px;
      border-radius: 5px;
      margin-top:20px;
      box-shadow: 0px 10px 10px rgba(0,0,0,0.4);
    }
    .order-result{
      width:100%;
      margin-top: 30px;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      .result-item{
        flex:1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        padding:10px 0;
        .result-title{
          color:#ffffff;
          font-size: 22px;
          font-weight: bold;
          margin-bottom:15px;
        }
        .result-label{
          color:#ffffff;
          font-size: 35px;
          font-weight: bold;
          margin-bottom:20px;
          &.result-label-high{
            color:#ee0a24;
          }
        }
        .order-low-risk{
          width: 160px;
          height:30px;
          background: none;
          border-color:#ffffff;
          border-width: 3px;
          color:#ffffff;
          font-weight: bold;
          font-size:18px;
          justify-content: center;
        }
        .van-circle__text{
          color:#ffffff;
          font-size:14px;
          font-weight: bold;
        }
      }
    }
    .order-prview-text{
      width:80%;
      font-size: 12px;
      color: #ffffff;
      text-align: center;
      margin-top:20px;
    }
    .order-preview-image{
      width: 285px;
      height: 75px;
      display: block;
      margin-top: 20px;
    }
    .order-preview-buttons{
      width:80%;
      display: flex;
      margin-top:20px;;
      justify-content: space-between;
      .order-button{
        width: 120px;
      }
    }
  }
  .van-circle__text{
    color:#ffffff;
    font-size:22px;
    font-weight: bold;
  }
  .order-result-tip {
    color:#1989fa;
    font-size: 18px;
    font-weight: bold;
    line-height: 20px;
    text-align: center;
    margin-top: 40px;
  }
  .order-result-tip-a {
    color:#1989fa;
    font-size: 18px;
    font-weight: bold;
    line-height: 20px;
  }
  .dialog-content{
    width:100%;
    font-size:14px;
    padding:20px;
    height:auto;
    color:#8a8a8a;
    .order-result-tip-a {
      font-size: 14px;
      font-weight: bold;
    }
  }
}
.van-dialog.high-risk-dialog {
  top: auto;
  bottom: 5%;
  transform: translate(-50%, -50%);
  .van-dialog__confirm {
    color: #1989fa;
    font-size: 14px;
    font-weight: bold;
    height: 30px;
  }
}
</style>
