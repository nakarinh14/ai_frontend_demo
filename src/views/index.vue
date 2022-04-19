<!--
 * @version: v 3.0
 * @Author: Lincoln
 * @Date: 2020-08-19 00:11:13
 * @LastEditors: Lincoln
 * @LastEditTime: 2020-08-19 00:11:13
 -->
<template>
  <div class="index">
    <router-view class="router-view" />
  </div>
</template>

<script>
export default {
  name: "index",
  created() {
    if (localStorage.getItem('user') === 'null') {
      localStorage.removeItem('user')
    }
    this.$http
        .get(`/api/property/all`)
        .then(res => {
          if (res.data.code == 0) {
            res.data.data.forEach(item => {
              if (item.property === 'CLOSE_TIP') {
                if (item.is_active) {
                  if (this.$route.path !== '/closeTip')
                  this.$router.push("/closeTip");
                }
              }
            });
          }
        })
  },
};
</script>

<style lang="scss">
.index {
  // height: 100%;
  .router-view {
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    &.covid-page {
      padding: 0 16px;
      height: 100vh ;
      background: linear-gradient(#fdfdfd, #a4c7ea);
      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height:44px;
        position: relative;
        .header-back {
          background-color: white;
          width: 24px;
          height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 12px;
          z-index: 10;
        }
        .header-content {
          width:100%;
          height:100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          font-weight: 600;
          color: #1989fa;
          position: absolute;
          left:0;
          top:0;
          z-index: 1;
        }
        .header-link {
          color: #1989fa;
          font-size: 13px;
          z-index: 10;
        }
        .header-icon{
          width:20px;
          height:20px;
        }
        .header-logo{
          height: 10px;
        }
        .header-logo1{
          margin-left: -0.4rem;
          height: 21px;
          padding-bottom: 1px;
        }
      }
      .covid-btns {
        text-align: center;
        margin-top: 50px;
        .covid-btn {
          display: inline-block;
          width: 275px;
          height: 44px;
          line-height: 44px;
          color: white;
          font-size: 17px;
          border-radius: 4px;
        }
      }
    }
  }
}

</style>
