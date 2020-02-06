import './plugins/' // 放在页面组件前面 免得样式被覆盖
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './http'
import './style.css'

Vue.config.productionTip = false
Vue.prototype.$http = http

http.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token')
  token && (config.headers.Authorization = 'Bearer ' + token)
  return config
})

http.interceptors.response.use(res => {
  if (res.data.message) {
    Vue.prototype.$message({
      type: 'success',
      message: res.data.message
    })
  }
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  }
  err.response.status === 401 && router.push('/login')
  return Promise.reject(err)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
