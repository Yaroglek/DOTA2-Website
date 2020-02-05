import './plugins/' // 放在页面组件前面 免得样式被覆盖
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './http'
import './public/style.css'

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
