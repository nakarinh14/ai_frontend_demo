<template>
  <div class="covid-page faq">
    <header class="page-header">
      <span class="header-back" @click="$router.go(-1)">
        <svg-icon icon-class="gray-btn"></svg-icon>
      </span>
      <div class="header-content">{{$t('setting.faq')}}</div>
    </header>
    <div class="faq-content" v-html="FAQ_zh" v-if="language === 'zh'"></div>
    <div class="faq-content" v-html="FAQ_hk" v-if="language === 'hk'"></div>
    <div class="faq-content" v-html="FAQ_en" v-if="language === 'en'"></div>
  </div>
</template>

<script>
import { getLanguage } from "../../i18n/index";
import { FAQ_zh, FAQ_en, FAQ_hk } from "../../utils/faq";
export default {
  name: "faq",
  data() {
    return {
      FAQ_zh,
      FAQ_en,
      FAQ_hk,
      language: getLanguage(),
    };
  },
};
</script>

<style scoped lang="scss">
.faq {
  .page-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    .btn-left {
      position: fixed;
      left: 20px;
    }
    .header-content {
      text-align: center;
      font-size: 18px;
      color: #3a3a3a;
      font-weight: 600;
      flex: 1;
    }
    .appeal-record {
      color: #d8182d;
      font-size: 13px;
    }
  }
  .faq-content {
    width:100%;
    font-size:14px;
    padding:10px;
    color:#8a8a8a;
  }
}
</style>
