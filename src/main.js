import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './axios'



Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Element)
//引入mock数据，关闭则注释该行
require("./mock")

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
