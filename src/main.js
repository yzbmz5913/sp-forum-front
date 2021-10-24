import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

document.body.style.background='url("https://images.alphacoders.com/590/thumb-1920-590805.png") no-repeat fixed 50% 95%'
document.body.style.backgroundSize='cover'