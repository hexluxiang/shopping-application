// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './apis/fetch' //封装axios
import apis from '@/apis'
console.log(apis)
import store from '@/store'
import { loadFromLocal } from '@/apis/localStorage'

import qs from 'qs'
console.log(qs)


import "@/assets/icon/style.css"; //字体图标库
import './assets/flexible' //rem
import vant from 'vant'; //加载vant所有组件
import 'vant/lib/vant-css/index.css';
Vue.use(vant);

Vue.config.productionTip = false
Vue.prototype.$apis = apis
    /* eslint-disable no-new */
var localToken = loadFromLocal('token');
console.log(localToken);
let whiteList = ['/login', '/home', '/mes']
router.beforeEach(function(to, from, next) {
    let _inFlag = to.meta.auth;
    var _intoken = store.state.token;
    if (whiteList.indexOf(to.path) === -1) {
        if (_inFlag && _intoken) {
            next()
        } else {
            if (_inFlag) {
                if (!_intoken) {
                    next('/login')
                }
            } else {
                next()
            }
            next('/login');
        }
    } else {
        next()
    }
})
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})