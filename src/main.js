/*
 * @version: v 1.0.0
 * @Github: https://github.com/GitHubGanKai
 * @Author: GitHubGanKai
 * @Date: 2020-04-29 22:08:12
 * @LastEditors: gankai
 * @LastEditTime: 2020-05-20 23:47:21
 * @FilePath: /vue-jd-h5/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vue3 from '@vue/composition-api'
import store from './store/index'
import './components'
import 'amfe-flexible'
import axios from './plugins/axios'
import '@/icons'
import EventBus from './utils/eventBus'
import i18n from "./i18n/index";
import VueI18n from "vue-i18n";
Vue.use(axios)
Vue.use(EventBus)
Vue.use(Vue3)
// 多语言
Vue.use(VueI18n, {
  i18n: (key, value) => i18n.t(key, value)
});

import {
  Swipe,
  Toast,
  SwipeItem,
  Button,
  RadioGroup,
  Radio,
  Tabbar,
  Tab,
  Tabs,
  CountDown,
  Loading,
  Switch,
  TabbarItem,
  NavBar,
  Lazyload,
  Card,
  Popup,
  Dialog,
  Checkbox,
  CheckboxGroup,
  Field,
  Uploader,
  Cell,
  Tag,
  CellGroup,
  Divider,
  Icon,
  Form,
  Circle,
  Progress,
  NoticeBar,
  ImagePreview,
  Collapse,
  CollapseItem,
  Step,
  Steps,
  Col,
  Row,
  Picker,
} from 'vant';
Vue.use(Tabbar).use(TabbarItem).use(Button).use(NavBar).use(Icon).use(Field).use(Cell).use(CellGroup)
  .use(Swipe).use(SwipeItem).use(Lazyload).use(Popup).use(Uploader).use(Dialog).use(Checkbox).use(CheckboxGroup)
  .use(Switch).use(Card).use(Tag).use(Toast).use(Loading)
  .use(Radio).use(RadioGroup).use(Tab).use(Tabs).use(Divider).use(CountDown).use(Form).use(Circle).use(Progress)
  .use(NoticeBar).use(ImagePreview).use(Collapse).use(CollapseItem).use(Step).use(Steps).use(Col).use(Row).use(Picker);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
