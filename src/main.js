import Vue from 'vue'
import App from './App.vue'

//引入路由
import router from './router/index';
//引入store
import store from './store/index';
//引入vant
import { Popup, Picker,Area } from 'vant';

Vue.use(Popup);
Vue.use(Picker);
Vue.use(Area);
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})