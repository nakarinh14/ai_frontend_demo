<template>
  <div class="covid-page message-center">
    <header class="page-header">
      <span class="header-back" @click="$router.go(-1)">
        <svg-icon icon-class="gray-btn"></svg-icon>
      </span>
      <div class="header-content">{{$t('mine.message_center')}}</div>
    </header>
    <section class="message-card">
      <ul class="message-list">
        <li class="message-item">
          <div class="item-title">
            <van-tag color="#FFBF43">{{$t('mine.system_message')}}</van-tag>
            <span>2020-07-20 0:0:0</span>
          </div>
          <div class="message-content">{{$t('mine.register_success')}}</div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "messageCenter",
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.message-center {
  .message-card {
    margin-top: 10px;
    background: url("../../assets/image/back-show.png") no-repeat center center;
    background-size: 100% 100%;
    .message-list {
      .message-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 16px;
        color: #3a3a3a;
        .item-title {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 5px;
          span {
            font-size: 10px;
          }
        }
        .message-content {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
