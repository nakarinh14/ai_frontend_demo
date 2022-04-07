<template>
  <div class="covid-page about-as">
    <header class="page-header">
      <span class="header-back" @click="$router.go(-1)">
        <svg-icon icon-class="gray-btn"></svg-icon>
      </span>
      <div class="header-content">{{$t('about.title')}}</div>
    </header>
    <div class="logo-version">
      <img src="../../assets/image/logo.png" />
      <span class="version">{{$t('about.version')}} BETA 5.1</span>
    </div>
    <div class="about-us-disc">
      {{$t('about.tip')}}
    </div>
    <div class="about-us-email">
      {{$t('about.email')}} service@aimomics.org
    </div>
  </div>
</template>

<script>
export default {
  name: "aboutAs",
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.about-as {
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
  .logo-version {
    padding-top: 92px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 186px;
      height: 26px;
    }
    .version {
      font-size: 16px;
      padding-top: 6px;
      color: #3a3a3a;
    }
  }
  .about-us-disc{
    font-size: 14px;
    margin-top: 30px;
    color: #3a3a3a;
  }
  .about-us-email{
    font-size: 14px;
    margin-top: 10px;
    color: #3a3a3a;
  }
}
</style>
