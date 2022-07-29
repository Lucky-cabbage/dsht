import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入的element-ui的样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en'
// 引入的css样式
import './assets/css/index.css'
// 引入的icon图标
import './assets/font/iconfont.css'
// import axios from 'axios'
// import '@/permission' // permission control
// import * as directives from '@/directives/index'
// console.log(directives)
// for (const key in directives) {
//   Vue.directive(key, directives[key])
// }
// // axios挂载到vue上,每个vue组件都可以通过this访问到$http 从而发起阿贾克斯请求
// Vue.prototype.$http = axios
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
