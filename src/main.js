import Vue from 'vue';
import Particles from 'particles.vue';
import App from './App.vue';
import store from './store';

Vue.use(Particles);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
