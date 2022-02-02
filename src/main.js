import Vue from 'vue'
import App from './App.vue'

import ReferenceService from './service/ReferenceService'
import { ConfigClass } from './classes/ConfigClass'

const server = `${ConfigClass.getUrlApi().toString()}`

Vue.prototype.$referenceService = ReferenceService
Vue.prototype.$server = server

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
