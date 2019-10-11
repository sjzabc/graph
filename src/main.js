import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import axios from 'axios'
import {
    $_ajax,
    $_post,
    $_post_json
} from '@/utils/axios'

Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.prototype.$http = axios;
Vue.prototype.$ajax = $_ajax;
Vue.prototype.$post = $_post;
Vue.prototype.$post_json = $_post_json;


/* 公用url头 */
let status = process.env.NODE_ENV == 'development'; //true:开发环境  false:生产环境
// console.log(status)
var serverName = `${location.hostname}${location.port?':':''}${location.port||''}`;
var $base = `http://${serverName}`;
Vue.prototype.$baseUrl = status ? `http://${serverName}`:`http://${serverName}/api`;
Vue.prototype.$socket = `ws://10.0.0.17/ws`;
Vue.prototype.$socket2 = status ?'ws://172.16.2.32:7002':`ws://${serverName}/ws2`;
Vue.prototype.$socket3 = status ?'ws://172.16.2.22:84/ws':`ws://${serverName}/ws`;
Vue.config.productionTip = false
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
    let ret = '';
    for (let it in data) {
      ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
    }
    return ret;
}]
axios.interceptors.response.use(function (response) {
  if (response.data.ret_code === -11) {
    // router.history.current.fullPath
    // ElementUI.Message.error('请重新登录');
    // router.push('/login?path' + router.history.current.fullPath)
  }
  return response;
}, function (error) {
  return Promise.reject(error);
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
