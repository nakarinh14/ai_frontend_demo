<template>
  <div class="covid-page history-page">
    <header class="page-header">
      <span class="header-back" @click="$router.go(-1)">
        <svg-icon icon-class="gray-btn"></svg-icon>
      </span>
      <div class="header-content">{{$t('mine.history')}}</div>
    </header>
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
      {{$t('history.tip')}}
    </van-notice-bar>
    <ul class="history-list">
      <li class="history-item" v-for="item in historys" :key="item.id">
        <div class="history-result">
          <span class="result-time">
            <span>{{item.create_date}}</span>
            <span v-if="item.order_type == '1'">{{$t('history.single')}}</span>
            <span v-if="item.order_type == '2'">{{$t('history.multi')}}</span>
          </span>
          <van-cell title="Healthy" v-if="!isNormalUser">
            <template #default>
              <van-progress :percentage="item.healthy_percent" color="linear-gradient(to right, #3fecff, #6149f6)" style="top:10px;"/>
            </template>
          </van-cell>
          <van-cell title="CV19">
            <template #default v-if="!isNormalUser">
              <van-progress :percentage="item.covid_19_percent" color="linear-gradient(to right, #3fecff, #6149f6)" style="top:10px;"/>
            </template>
            <van-tag v-if="isNormalUser && !item.highRisk" plain size="large" type="primary">{{$t('history.low_risk')}}</van-tag>
            <van-tag v-if="isNormalUser && item.highRisk" plain size="large" type="primary">{{$t('history.high_risk')}}</van-tag>
          </van-cell>
          <van-cell title="Pulmonary" v-if="!isNormalUser">
            <template #default>
              <van-progress :percentage="item.pulmonary_percent" color="linear-gradient(to right, #3fecff, #6149f6)" style="top:10px;"/>
            </template>
          </van-cell>
          <van-cell title="Ocular" v-if="!isNormalUser">
            <template #default>
              <van-progress :percentage="item.ocular_percent" color="linear-gradient(to right, #3fecff, #6149f6)" style="top:10px;"/>
            </template>
          </van-cell>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { covidDate, isNormalUser, checkLogin } from '../../utils/util';
export default {
  name: "Setting",
  data() {
    return {
      isLogin: checkLogin(),
      historys: [],
      isNormalUser: isNormalUser(),
      historyIsOpen: false,
    };
  },
  methods: {
    checkProperty () {
      this.$http
        .get(`/api/property/all`)
        .then(res => {
          if (res.data.code == 0) {
            res.data.data.forEach(item => {
              if (item.property === 'HISTORY_OPEN') {
                this.historyIsOpen = item.is_active;
                if (this.historyIsOpen) {
                  this.getHistory();
                }
              }
            });
          }
        })
    },
    getHistory() {
      const data = {};
      const uuid = localStorage.getItem('uuid');
      if (!this.isLogin && uuid != null) {
        data.uuid = uuid;
      }
      this.$http
        .post(`/api/order/list`, data)
        .then(response => {
          if (response.data.code == 0) {
            this.historys = response.data.data.map(value=>{
              value.create_date = covidDate(value.create_date, 'yyyy-MM-dd hh:mm:ss');
              value.highRisk = parseFloat(value.covid_19_percent) > 30;
              return value;
            });
          } 
        })
    },
  },
  mounted() {
    this.checkProperty();
  },
};
</script>

<style scoped lang="scss">
.history-page {
  .history-list {
    margin-top:20px;
    .history-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 8px;
      padding: 10px;
      background-color: #fff;
      margin-bottom:20px;
      .history-img {
        width:60px;
        height:auto;
        border-radius:3px;
      }
      .history-result{
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-left:20px;
        .result-time{
          width:100%;
          font-size: 14px;
          color:#8a8a8a;
          border-bottom: 1px solid #ebedf0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom:5px;
          span:last-child{
            color: #1989fa;
          }
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
