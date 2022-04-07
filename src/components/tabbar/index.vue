<template>
  <div class="tabbar">
    <ul>
      <van-tabbar
        route
        v-model="active"
        active-color="#1989fa"
        inactive-color="#8a8a8a"
        style="z-index: 100;"
      >
        <van-tabbar-item name="index" to="/index">
          <span>首页</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? icon_home.active : icon_home.normal"
          />
        </van-tabbar-item>
        <van-tabbar-item name="order" to="/order">
          <span>眼部识别</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? icon_health.active : icon_health.normal"
          />
        </van-tabbar-item>
        <van-tabbar-item name="mine" to="/mine">
          <span>我</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? icon_mine.active : icon_mine.normal"
          />
        </van-tabbar-item>
      </van-tabbar>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "tabbar",
  data() {
    return {
      icon_home: {
        normal: require("@/assets/icons/tabbar/home.png"),
        active: require("@/assets/icons/tabbar/home_active.png")
      },
      icon_health: {
        normal: require("@/assets/icons/tabbar/health.png"),
        active: require("@/assets/icons/tabbar/health_active.png")
      },
      icon_mine: {
        normal: require("@/assets/icons/tabbar/mine.png"),
        active: require("@/assets/icons/tabbar/mine_active.png")
      },
      active: 0
    };
  },
  created() {
    this.$eventBus.$on(
      "changeTag",
      tag => {
        this.active = tag;
      },
      this
    );
  },
  computed: {
    ...mapState({
      count: state => state.cart.count
    })
  },
  methods: {
    
  }
};
</script>

<style scoped lang="scss">
.tabbar {
  ul {
    height: 50px;
  }
}
</style>
