import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
// import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  // 将所有的元素都看成组件
  loading: require('@/assets/imgs/loading.gif'),
  error: require('@/assets/imgs/loading.gif')
})
Vue.use(VueResource)
// Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
