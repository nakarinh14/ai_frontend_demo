<template>
  <div class="close-page">
    <div v-if="language === 'zh'" class="close-tip-title">
      {{ closeTip.title }}
    </div>
    <div v-if="language === 'en'" class="close-tip-title">
      {{ closeTip.title_en }}
    </div>
    <div v-if="language === 'th'" class="close-tip-title">
      {{ closeTip.title_th }}
    </div>
    <div v-if="language === 'hk'" class="close-tip-title">
      {{ closeTip.title_hk }}
    </div>
    <div v-if="language === 'zh'" class="close-tip-content">
      {{ closeTip.content }}
    </div>
    <div v-if="language === 'en'" class="close-tip-content">
      {{ closeTip.content_en }}
    </div>
    <div v-if="language === 'th'" class="close-tip-content">
      {{ closeTip.content_th }}
    </div>
    <div v-if="language === 'hk'" class="close-tip-content">
      {{ closeTip.content_hk }}
    </div>
  </div>
</template>

<script>
import { getLanguage } from "../../i18n/index";
export default {
  name: "closeTip",
  data() {
    return {
      closeTip: {},
      language: getLanguage(),
    };
  },
  created() {
    this.checkProperty();
  },
  methods: {
    checkProperty () {
      this.$http
        .get(`/api/property/all`)
        .then(res => {
          if (res.data.code == 0) {
            res.data.data.forEach(item => {
              if (item.property === 'CLOSE_TIP') {
                if (item.title_en === '' || item.title_en == null) {
                  item.title_en = item.title;
                }
                if (item.title_hk === '' || item.title_hk == null) {
                  item.title_hk = item.title;
                }
                if (item.content_en === '' || item.content_en == null) {
                  item.content_en = item.content;
                }
                if (item.content_hk === '' || item.content_hk == null) {
                  item.content_hk = item.content;
                }
                this.closeTip = item;
              }
            });
          }
        })
    },
  }
};
</script>

<style scoped lang="scss">
.close-page {
  padding: 100px 16px 0;
  height: 100vh;
  background-color: white;
  .close-tip-title {
    width: 100%;
    color: #1989fa;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
  .close-tip-content {
    width: 100%;
    color: #1989fa;
    font-size: 14px;
    margin-top: 20px;
    text-align: center;
  }
}
</style>
