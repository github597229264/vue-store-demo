import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui';
import axios from 'axios';//http 请求拦截

Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'medium'
});
Vue.prototype.$axios = axios;

window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
export default vm;