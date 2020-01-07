// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 1. 引入库
import ViewUI from 'view-design'

// 2. 引入样式
import 'view-design/dist/styles/iview.css'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
// 3. 生效
Vue.use(ViewUI)

Vue.config.productionTip = false

import { format } from 'timeago.js';
//定义全局的过滤器 "changeTime":改变时间为几周前
Vue.filter('changeTime', function(dateStr) {
  let time = new Date(dateStr);
  return format(time, 'zh_CN');
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
