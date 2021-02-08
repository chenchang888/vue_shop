import Vue from 'vue'
import 'amfe-flexible'
import './Vant/vant.js'
import './Mock/mock'
import App from './App.vue'
import router from './router'
import store from './store'
import Header from './components/Header/Header.vue'

Vue.config.productionTip = false,
Vue.component('Header', Header)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
