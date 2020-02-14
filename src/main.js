import Vue from 'vue';
import { Table } from 'buefy';
import VeHistogram from 'v-charts/lib/histogram.common';
import App from './App.vue';
import store from './store';
import './scss/main.scss';

Vue.use(Table);
Vue.component(VeHistogram.name, VeHistogram);


Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
