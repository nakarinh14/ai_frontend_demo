<template>
  <div class="covid-page order-layout">
    <header class="page-header">
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
    <div class="order-title">
      {{$t('home.title')}}
    </div>
    <div class="order-tip" v-show="language != 'en'">
      THAILAND USE ONLY
    </div>
    <div class="order-content" v-if="uploadNeedLogin && !isLogin">
      <van-button size="normal" style="margin-top:30px;" class="order-button" @click="handleLogin">{{$t('order.step_0_login')}}</van-button>
    </div>
    <div class="order-content" v-if="step == 0 && (!uploadNeedLogin || isLogin)">
      <van-steps :active="imgIndex" active-color="#ffffff" inactive-color="#bebebe" class="multi-steps">
        <van-step>{{$t('multi.img0')}}</van-step>
        <van-step>{{$t('multi.img1')}}</van-step>
        <van-step>{{$t('multi.img2')}}</van-step>
        <van-step>{{$t('multi.img3')}}</van-step>
      </van-steps>
      <div class="order-help" v-if="noImage">
        {{$t('order.step_0_title')}} ({{$t('multi.img' + imgIndex)}})
      </div>
      <van-uploader :after-read="handleInput" accept="image/*" capture="user" class="order-uploader" v-if="max_test_enable && ip_enable && noImage">
　　　　<van-button size="normal" class="order-button order-button-white">{{$t('order.step_0_camera')}}</van-button>
  　　</van-uploader>
      <van-button size="normal" class="order-button order-button-white" style="margin-top:30px;" @click="handleCheck" v-if="(!max_test_enable || !ip_enable) && noImage">{{$t('order.step_0_camera')}}</van-button>
      <van-uploader :after-read="handleInput" accept="image/*" class="order-uploader" v-if="max_test_enable && ip_enable && noImage">
　　　　<van-button size="normal" class="order-button">{{$t('order.step_0_choose')}}</van-button>
  　　</van-uploader>
      <van-button size="normal" class="order-button" style="margin-top:30px;" @click="handleCheck" v-if="(!max_test_enable || !ip_enable) && noImage">{{$t('order.step_0_choose')}}</van-button>
      <div class="order-reset" v-if="!noImage">
        <van-uploader :after-read="handleInput" accept="image/*" capture="user" class="order-uploader">
  　　　　<van-button size="normal" class="order-button">{{$t('order.step_1_camera')}}</van-button>
    　　</van-uploader>
        <van-uploader :after-read="handleInput" accept="image/*" class="order-uploader">
  　　　　<van-button size="normal" class="order-button">{{$t('order.step_1_choose')}}</van-button>
    　　</van-uploader>
      </div>
      <div style="margin-top: 40px; margin-bottom: 10px" v-if="noImage">
        <div class="order-preview-image" >
          <span class="image-title">{{ $t('multi.img0') }}:</span>
          <img src="../../assets/image/real_eye_sample/forward-eye.jpg" class="real-sample-preview"/>
        </div>
        <div class="order-preview-image" >
          <span class="image-title">{{ $t('multi.img1') }}:</span>
          <img src="../../assets/image/real_eye_sample/left-eye.jpg" class="real-sample-preview"/>
        </div>
        <div class="order-preview-image" >
          <span class="image-title">{{ $t('multi.img2') }}:</span>
          <img src="../../assets/image/real_eye_sample/right-eye.jpg" class="real-sample-preview"/>
        </div>
        <div class="order-preview-image" >
          <span class="image-title">{{ $t('multi.img3') }}:</span>
          <img src="../../assets/image/real_eye_sample/up-eye.jpg" class="real-sample-preview"/>
        </div>
      </div>
      <div>
        <p style="color: #f5db12; margin-top: 0.4rem; font-size: 0.5rem;" >
          {{ $t('order.new_caution_1') }}
        </p>
        <p style="color: #f5db12; margin-top: 0.8rem; font-size: 0.5rem" >
          1.) {{ $t('order.new_caution_2') }}
        </p>
        <p style="color: #f5db12; margin-top: 10px; font-size: 0.5rem" >
          2.) {{ $t('order.new_caution_3') }}
        </p>
        <p style="color: #f5db12; margin-top: 10px; font-size: 0.5rem" >
          3.) {{ $t('order.new_caution_4') }}
        </p>
        <p style="color: #f5db12; margin-top: 10px; font-size: 0.5rem" >
          4.) {{ $t('order.new_caution_5') }}
        </p>
        <p style="color: #f5db12; margin-top: 10px; font-size: 0.5rem" >
          5.) {{ $t('order.new_caution_6') }}
        </p>
      </div>
<!--      <div class="order-tip-text" v-if="noImage && imgIndex == 0" style="margin-top: 30px;">-->
<!--        {{$t('home.alert')}}<br/>-->
<!--        {{$t('multi.tip_0')}}<br/><br/>-->
<!--        {{$t('multi.tip_1')}}<br/><br/>-->
<!--        {{$t('multi.tip_2')}}<br/><br/>-->
<!--        {{$t('multi.tip_3')}}<br/><br/>-->
<!--        {{$t('multi.tip_4')}}<br/>-->
<!--      </div>-->
      <div class="order-clip" id="clipArea0" v-if="!noImage && imgIndex == 0"></div>
      <div class="order-clip" id="clipArea1" v-if="!noImage && imgIndex == 1"></div>
      <div class="order-clip" id="clipArea2" v-if="!noImage && imgIndex == 2"></div>
      <div class="order-clip" id="clipArea3" v-if="!noImage && imgIndex == 3"></div>
      <van-button size="normal" class="order-button order-button-white" @click="handleNext" v-if="!noImage">
        {{$t('multi.next')}}
      </van-button>
      <div class="order-example-text" v-if="!noImage">
        {{$t('order.step_1_tip_0')}}<br/>
        {{$t('order.step_1_tip_1')}}
      </div>
      <img src="../../assets/image/eye.jpg" class="order-example" v-if="!noImage && imgIndex == 0"/>
      <img src="../../assets/image/eye_left.jpg" class="order-example" v-if="!noImage && imgIndex == 1"/>
      <img src="../../assets/image/eye_right.jpg" class="order-example" v-if="!noImage && imgIndex == 2"/>
      <img src="../../assets/image/eye_up.jpg" class="order-example" v-if="!noImage && imgIndex == 3"/>
    </div>
    <div class="order-content" v-if="step == 1">
      <div class="order-help" style="margin-bottom: 20px;">
        {{$t('order.step_2_title')}}
      </div>
      <div class="order-preview-image" v-for="(item, index) in uploadImage" :key="item" >
        <span class="image-title" v-if="index === 0">{{ $t('multi.img0') }}:</span>
        <span class="image-title" v-if="index === 1">{{ $t('multi.img1') }}:</span>
        <span class="image-title" v-if="index === 2">{{ $t('multi.img2') }}:</span>
        <span class="image-title" v-if="index === 3">{{ $t('multi.img3') }}:</span>
<!--        <img src="../../assets/image/eye.jpg" class="order-exam" v-if="index == 0"/>-->
<!--        <img src="../../assets/image/eye_left.jpg" class="order-exam" v-if="index == 1"/>-->
<!--        <img src="../../assets/image/eye_right.jpg" class="order-exam" v-if="index == 2"/>-->
<!--        <img src="../../assets/image/eye_up.jpg" class="order-exam" v-if="index == 3"/>-->
        <img :src="item" class="order-submit"/>
      </div>
      <div class="order-prview-text">
        {{$t('multi.step_2_tip_1')}}
        <br/><br/>
        {{$t('order.step_2_tip_2')}}
      </div>
      <div class="order-preview-buttons">
        <van-button size="normal" icon="success" class="order-button order-button-white" @click="handleUpload">{{$t('order.step_2_test')}}</van-button>
        <van-button size="normal" icon="cross" class="order-button" @click="handleReUpload">{{$t('order.step_2_back')}}</van-button>
      </div>
    </div>
    <div class="order-content" v-if="step == 2">
      <div class="order-help">
        {{$t('order.step_3_title')}}
      </div>
      <van-circle v-model="currentCircle" :rate="99" :speed="20" :text="text" :stroke-width="80" layer-color="#eeeeee" :color="gradientColor" size="150" style="margin-top:20px;"/>
    </div>
    <div class="order-content" v-if="step == 3">
      <div class="order-help" style="margin-top: 40px;">
        {{$t('order.step_4_title')}}
      </div>
      <van-button size="normal" class="order-button" @click="handleReUpload" style="width: 200px;margin-top:20px;">{{$t('order.step_5_rePredict')}}</van-button>
    </div>
<!--    <div class="order-content" v-if="step == 4 && extra_order_tip != null">-->
<!--      <van-form validate-first @submit="handleSubmitExtra">-->
<!--        <van-cell-group v-for="(item, index) in extra_order_tip" :key="item.title" >-->
<!--          <van-field-->
<!--            v-if="item.type === 0"-->
<!--            v-model="extra_order_tip_form[index]"-->
<!--            :label="language === 'zh' ? item.title : language === 'hk' ? item.title_hk : item.title_en"-->
<!--            type="text"-->
<!--            clearable-->
<!--            :rules="[{ required: true, message: $t('order.not_empty')}]"-->
<!--          />-->
<!--          <van-field-->
<!--            readonly-->
<!--            clickable-->
<!--            v-if="item.type === 1"-->
<!--            :value="extra_order_tip_form[index]"-->
<!--            :label="language === 'zh' ? item.title : language === 'hk' ? item.title_hk : item.title_en"-->
<!--            :rules="[{ required: true, message: $t('order.not_empty')}]"-->
<!--            @click="orderTipOnOpen($event, index)"-->
<!--          />-->
<!--        </van-cell-group>-->
<!--        <van-popup v-model="extra_order_tip_show" round position="bottom">-->
<!--            <van-picker-->
<!--              show-toolbar-->
<!--              :columns="extra_order_tip_columns"-->
<!--              @confirm="orderTipOnConfirm($event)"-->
<!--              @cancel="extra_order_tip_show = false"-->
<!--            />-->
<!--          </van-popup>-->
<!--        <div class="covid-btns">-->
<!--          <van-button-->
<!--            type="info"-->
<!--            class="covid-btn"-->
<!--            :loading="handleSubmitExtraLoading"-->
<!--            :loading-text="$t('password.saving')"-->
<!--          >-->
<!--            {{$t('password.save')}}-->
<!--          </van-button>-->
<!--        </div>-->
<!--      </van-form>-->
<!--    </div>-->
    <div class="order-content" v-if="step == 4">
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
          <span style="margin-top: 0.1rem; font-size: 0.3rem; font-weight: bold">{{ this.order_timestamp }}</span>
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
      <van-button size="normal" class="order-button" @click="handleReUpload">{{$t('order.step_5_rePredict')}}</van-button>
      <div class="display-id">
        <p style="margin-right: 0.2rem; color: white; font-size: 0.4rem; font-weight: bold;">
          RN: {{ this.order_id.slice(-6) }}
        </p>
      </div>
<!--      <div class="order-result-tip" v-if="!cv19_low_risk">{{$t('order.step_6_tip')}}</div>-->
<!--      <a class="order-result-tip-a" v-if="!cv19_low_risk" href="mailto: service@aimomics.org">service@aimomics.org</a>-->
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
<!--        <a class="order-result-tip-a" href="mailto: service@aimomics.org">{{$t('order.high_risk_tip_2')}}</a>-->
<!--        {{$t('order.high_risk_tip_3')}}-->
<!--        <a class="order-result-tip-a" href="/index.html#mobile_6">{{$t('order.high_risk_tip_4')}}</a>-->
<!--        {{$t('order.high_risk_tip_5')}}-->
<!--      </div>-->
<!--    </van-dialog>-->
  </div>
</template>

<script>

import { checkLogin, isNormalUser, dataURLtoFile } from '../../utils/util'
import { getLanguage } from '../../i18n/index'
import * as imageConversion from 'image-conversion'
import PhotoClip from 'photoclip'
import { enUS as dateLocaleEn, th as dateLocaleTh } from 'date-fns/locale'
import { format, subHours } from 'date-fns'
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
      imgIndex: 0,
      noImage: true,
      currentCircle: 0,
      circleInterval: null,
      photoClips: [null, null, null, null],
      uploadImage: [null, null, null, null],
      gradientColor: {
        '0%': '#3fecff',
        '100%': '#6149f6'
      },
      gradientColorHealthy: {
        '0%': '#07c160',
        '50%': '#ff976a',
        '100%': '#ee0a24'
      },
      gradientColorCV19: {
        '0%': '#07c160',
        '50%': '#ff976a',
        '100%': '#ee0a24'
      },
      maxImageSize: 4 * 1024 * 1024,
      result_healthy: { 'label': 'Healthy', 'prob': '0' },
      result_cv19: { 'label': 'CV19', 'prob': '0' },
      result_pulmonary: { 'label': 'Pulmonary', 'prob': '0' },
      result_ocular: { 'label': 'Ocular', 'prob': '0' },
      ip_enable: true,
      max_test_enable: true,
      showIpDisable: false,
      showMaxTestDisable: false,
      showHighRisk: false,
      extra_order_tip: null,
      extra_order_tip_form: {},
      extra_order_tip_show: false,
      extra_order_tip_columns: [],
      handleSubmitExtraLoading: false,
      needSubmitForm: false,
      order_id: null,
      cur_select_index: 0
    }
  },
  computed: {
    text () {
      return this.currentCircle.toFixed(0) + '%'
    },
    cv19_low_risk () {
      if (parseFloat(this.result_cv19.prob) >= 50) {
        return false
      } else {
        return true
      }
    }
  },
  created () {
    this.checkNeedLogin()
    this.checkIpEnable()
    this.checkMaxTest()
  },
  methods: {
    checkNeedLogin () {
      this.$http
        .get(`/api/property/all`)
        .then(response => {
          if (response.data.code == 0) {
            response.data.data.forEach(item => {
              if (item.property == 'UPLOAD_NEED_LOGIN') {
                this.uploadNeedLogin = item.is_active
              } else if (item.property == 'ORDER_TIP') {
                if (item.extra !== '' && item.extra != null) {
                  const temp = JSON.parse(item.extra)
                  temp.forEach((item, index) => {
                    item.options = item.options != null ? item.options.split(';') : []
                    item.options_hk = item.options_hk != null ? item.options_hk.split(';') : []
                    item.options_en = item.options_en != null ? item.options_en.split(';') : []
                    this.extra_order_tip_form[index] = null
                  })
                  this.extra_order_tip = temp
                }
                if (item.is_active) {
                  this.needSubmitForm = true
                } else {
                  this.needSubmitForm = false
                }
              }
            })
          }
        })
    },
    orderTipOnOpen (_, index) {
      this.extra_order_tip_columns = this.language === 'zh' ? this.extra_order_tip[index].options : this.language === 'hk' ? this.extra_order_tip[index].options_hk : this.extra_order_tip[index].options_en
      this.cur_select_index = index
      this.extra_order_tip_show = true
    },
    orderTipOnConfirm (val) {
      this.extra_order_tip_form[this.cur_select_index] = val
      this.extra_order_tip_columns = []
      this.extra_order_tip_show = false
    },
    // 检测ip为境内
    checkIpEnable () {
      this.$http
        .get(`/api/order/check_ip_enable`)
        .then(res => {
          if (res.data.code == 0) {
            this.ip_enable = res.data.data.enable
          }
        })
    },
    // 检测测试过多
    checkMaxTest () {
      this.$http
        .get(`/api/order/check_max_test`)
        .then(res => {
          if (res.data.code == 0) {
            this.max_test_enable = res.data.data.enable
          }
        })
    },
    handleCheck (e) {
      e.preventDefault()
      if (!this.ip_enable) {
        this.showIpDisable = true
      } else if (!this.max_test_enable) {
        this.showMaxTestDisable = true
      }
    },
    handleInput (file) {
      this.noImage = false
      this.$forceUpdate()
      const index = this.imgIndex
      setTimeout(() => {
        if (this.photoClips[index] != null) {
          this.photoClips[index].destroy()
          this.photoClips[index] = null
        }
        this.photoClips[index] = new PhotoClip('#clipArea' + index, {
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
        })
        this.photoClips[index].load(file.file)
      })
    },
    handleUpload () {
      if (this.submitLoading) {
        return
      }
      for (let i = 0; i < this.uploadImage.length; i++) {
        if (this.uploadImage[i] == null) {
          this.$toast({
            mask: false,
            message: this.$t('multi.uploadMissing') + '(' + this.$t('multi.img' + i) + ')'
          })
          return
        }
      }
      this.submitLoading = true
      this.submitSuccess = false
      this.currentCircle = 0
      this.step = 2
      let formData = new FormData() // 构造一个 FormData，把后台需要发送的参数添加
      formData.append('type', '2')
      if (localStorage.getItem('uuid') != null) {
        formData.append('uuid', localStorage.getItem('uuid'))
      }
      if (localStorage.getItem('region') != null) {
        formData.append('region', localStorage.getItem('region'))
      }
      for (let i = 0; i < this.uploadImage.length; i++) {
        let file = dataURLtoFile(this.uploadImage[i], 'covid' + i + '.jpg')
        if (file.size > this.maxImageSize) {
          imageConversion.compressAccurately(file, this.maxImageSize / 1024).then(res => {
            formData.append('img' + i, res) // 接口需要传的参数
          })
        } else {
          formData.append('img' + i, file) // 接口需要传的参数
        }
      }
      this.circleInterval = setInterval(() => {
        if (this.currentCircle < 99) {
          this.currentCircle++
        } else if (this.currentCircle >= 99 && this.submitSuccess) {
          this.currentCircle = 100
          if (this.needSubmitForm) {
            this.step = 4
          } else {
            this.step = 5
          }
          clearInterval(this.circleInterval)
        }
      }, 50)
      setTimeout(() => {
        this.upload(formData)
      }, 1000)
    },
    handleReUpload () {
      this.step = 0
      this.imgIndex = 0
      this.noImage = true
      this.checkMaxTest()
      this.checkIpEnable()
      this.destroyClips()
    },
    destroyClips () {
      this.photoClips.forEach(value => {
        if (value != null) {
          value.destroy()
        }
      })
      this.photoClips = [null, null, null, null]
      this.uploadImage = [null, null, null, null]
    },
    upload (formdata) {
      this.$http
        .post(`/api/order/check`, formdata, { timeout: 120000 })
        .then(response => {
          if (response.data.code == 0) {
            this.submitSuccess = true
            let ret = response.data.data
            this.result_healthy.prob = Number(ret.healthy)
            this.result_cv19.prob = Number(ret.cv19)
            this.result_pulmonary.prob = Number(ret.pulmonary)
            this.result_ocular.prob = Number(ret.ocular)
            const dateFormatLocale = this.language === 'th' ? dateLocaleTh : dateLocaleEn
            this.order_timestamp = format(subHours(new Date(ret.create_date), 1), 'dd MMMM yyyy HH:mm:ss', { locale: dateFormatLocale })
            this.order_id = ret.id
            if (ret.uuid != null) {
              localStorage.setItem('uuid', ret.uuid)
            }
            if (!this.needSubmitForm && parseFloat(this.result_cv19.prob) >= 50) {
              this.showHighRisk = true
            }
            this.$http.post(`/api/record/send`, { event: 'multi_test', message: '高级检测成功', user_name: localStorage.getItem('uuid') || null })
            this.submitLoading = false
          } else {
            this.$http.post(`/api/record/send`, { event: 'multi_test', message: '高级检测失败', user_name: localStorage.getItem('uuid') || null })
            clearInterval(this.circleInterval)
            this.currentCircle = 0
            this.submitSuccess = false
            this.submitLoading = false
            this.step = 3
          }
        }).catch(error => {
          clearInterval(this.circleInterval)
          this.currentCircle = 0
          this.submitSuccess = false
          this.submitLoading = false
          this.step = 3
        })
    },
    handleSubmitExtra () {
      if (this.handleSubmitExtraLoading) {
        return
      }
      const formdata = {
        order_id: this.order_id,
        extra: ''
      }
      if (this.isLogin) {
        formdata.user_id = localStorage.getItem('user').uid
      } else {
        formdata.uuid = localStorage.getItem('uuid')
      }
      formdata.extra = JSON.stringify(this.extra_order_tip.map((item, index) => {
        return {
          key: this.language === 'zh' ? item.title : this.language === 'hk' ? item.title_hk : item.title_en,
          value: this.extra_order_tip_form[index]
        }
      }))
      this.$http
        .post(`/api/order/updateExtra`, formdata)
        .then(response => {
          if (response.data.code == 0) {
            this.step = 5
            if (parseFloat(this.result_cv19.prob) >= 50) {
              this.showHighRisk = true
            }
          } else {
            this.$toast({
              mask: false,
              message: 'Submit Error'
            })
          }
        }).catch(error => {
          this.$toast({
            mask: false,
            message: 'Submit Error'
          })
        })
    },
    handleLogin () {
      this.$router.push('/login')
    },
    parseInt (value) {
      return parseInt(value)
    },
    handlePre () {
      if (this.imgIndex > 0) {
        this.imgIndex--
      }
    },
    handleNext () {
      if (this.imgIndex < 3) {
        this.noImage = true
        this.uploadImage[this.imgIndex] = this.photoClips[this.imgIndex].clip()
        this.photoClips[this.imgIndex].destroy()
        this.imgIndex++
      } else {
        this.uploadImage[this.imgIndex] = this.photoClips[this.imgIndex].clip()
        this.photoClips[this.imgIndex].destroy()
        this.photoClips = [null, null, null, null]
        this.step = 1
      }
    }
  },
  destroyed () {
    if (this.circleInterval != null) {
      clearInterval(this.circleInterval)
    }
    this.destroyClips()
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
    background: linear-gradient(#1989fa, #89c4ff);
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
    .multi-steps{
      width: 80%;
      height:50px;
      background: none;
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
      margin-top:10px;
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
    .order-clip{
      width:100%;
      height:150px;
      z-index: 100;
      margin-bottom:20px;
      margin-top:20px;
    }
    .order-tip-text{
      width:100%;
      font-size: 12px;
      color: #ffffff;
      text-align: left;
      margin-top:20px;
    }
    .order-example{
      width:200px;
      height:auto;
      border-radius: 5px;
      margin-top:10px;
      box-shadow: 0px 10px 10px rgba(0,0,0,0.4);
    }
    .order-example-text{
      width:100%;
      font-size: 12px;
      color: #ffffff;
      text-align: left;
      margin-top:20px;
    }
    .order-result{
      width:100%;
      margin-top:30px;
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
      width: 320px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
      .image-title{
        font-size: 20px;
        color: #ffffff;
      }
      .order-exam{
        width: 152.5px;
        height: 50px;
      }
      .order-submit{
        width: 152.5px;
        height: 50px;
      }
      .real-sample-preview{
        width: 180.5px;
        height: 50px;
      }
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
}
</style>

<style lang="scss">
.multi-steps .van-step--horizontal .van-step__circle-container{
  background:none;
}
.multi-steps .van-step__icon--active{
  font-size: 16px;
}
.multi-steps .van-step--finish{
  color: #ffffff;
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
.display-id{
  width:100%;
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
