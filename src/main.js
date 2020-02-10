import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import axios from "axios";
Vue.prototype.$axios = axios;

import "./assets/css/main.scss";

// import moment from "moment";
// Vue.prototype.$moment = moment;

import {  Step, Steps } from "vant";
Vue.use(Step);
Vue.use(Steps);

new Vue({
  render: h => h(App)
}).$mount("#app");
