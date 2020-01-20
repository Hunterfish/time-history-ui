/*!

=========================================================
* Vue Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import router from "./router";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'
import './prototype' // 挂载全局方法
import './font/iconfont/iconfont.css'
import VueStarPlus from 'vue-star-plus'
import '../node_modules/vue-star-plus/lib/vue-star-plus.css'
Vue.component('vue-star-plus', VueStarPlus)
// 浏览器指纹ID生成器 https://www.xiedandan.com/post-11.html
import Fingerprint2 from 'fingerprintjs2'

import { DatePicker,Alert,Message,Tooltip,Timeline,TimelineItem } from 'element-ui';

import Vue from "vue";
import App from "./App.vue";

Vue.use(DatePicker);
Vue.use(Alert);
// Vue.use(Message);
Vue.use(Tooltip);
Vue.use(Timeline);
Vue.use(TimelineItem);

// Vue.prototype.$message = Message;

Vue.config.productionTip = false;
Vue.use(Argon);
new Vue({
  router,
  render: h => h(App),
  fingerId: FingerID
}).$mount("#app");

var FingerID
if (window.requestIdleCallback) {
   requestIdleCallback(function () {
    FingerID= Fingerprint2.get(function (components) {
        // console.log(components) // an array of components: {key: ..., value: ...}
        var values = components.map(function (component) { return component.value })
        var murmur = Fingerprint2.x64hash128(values.join(''), 31)
        // console.log(murmur);//在这里就是打印的浏览器指纹
        Vue.prototype.$fingerId = murmur
      })
  })
} else {
  setTimeout(function () {
    FingerID = Fingerprint2.get(function (components) {
        // console.log(components) // an array of components: {key: ..., value: ...}
        var values = components.map(function (component) { return component.value })
        var murmur = Fingerprint2.x64hash128(values.join(''), 31)
        // console.log(murmur);//在这里就是打印的浏览器指纹
        Vue.prototype.$fingerId = murmur
      })
  }, 500)
}
