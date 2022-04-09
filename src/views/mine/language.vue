<template>
  <div class="covid-page about-as">
    <header class="page-header">
      <span class="header-back" @click="$router.go(-1)">
        <svg-icon icon-class="gray-btn"></svg-icon>
      </span>
      <div class="header-content">{{$t('setting.language')}}</div>
    </header>
    <div style="margin-top:1rem">
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell
            :title="$t('setting.chinese')"
            clickable
            @click="changeLang('zh')"
          >
            <van-radio
              slot="right-icon"
              name="zh"
            />
          </van-cell>
          <van-cell
            :title="$t('setting.thai')"
            clickable
            @click="changeLang('th')"
          >
            <van-radio
              slot="right-icon"
              name="th"
            />
          </van-cell>
          <van-cell
            :title="$t('setting.english')"
            clickable
            @click="changeLang('en')"
          >
            <van-radio
              slot="right-icon"
              name="en"
            />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
  </div>
</template>

<script>
import { Locale } from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';
import zhCN from 'vant/lib/locale/lang/zh-CN';
export default {
  name: "language",
  data() {
    return {
      radio: localStorage.getItem("localLang")
    }
  },
  created() {},
  methods: {
    changeLang (lang) {
      if (lang == "zh") {
        this.radio = 'zh';
        this.$i18n.locale = "zh";
        localStorage.setItem("localLang", "zh");
        Locale.use('zh-CN', zhCN);
      } else if (lang === 'th') {
        this.radio = 'th';
        this.$i18n.locale = "th";
        localStorage.setItem("localLang", "th");
        Locale.use('en-US', enUS);
      } else if (lang === "en") {
        this.radio = 'en';
        this.$i18n.locale = "en";
        localStorage.setItem("localLang", "en");
        Locale.use('en-US', enUS);
      } else if (lang === "hk") {
        this.radio = 'hk';
        this.$i18n.locale = "hk";
        localStorage.setItem("localLang", "hk");
        Locale.use('en-US', enUS);
      }
      this.$router.back();
    }
  }
};
</script>

<style scoped lang="scss">

</style>
