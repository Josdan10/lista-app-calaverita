/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import vuetify from './plugins/vuetify' 
import { store } from './store'


import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  created(){
    this.$store.commit('initialiseStore');
  },
  components: { App },
  template: '<App/>',
})
