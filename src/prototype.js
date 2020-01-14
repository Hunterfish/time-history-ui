import Vue from 'vue'

import httpRequest from "@/utils/httpRequest"

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
