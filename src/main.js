import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// import { useMainStore } from '@/stores/main'

import './apis/fetch' //封装axios
import apis from '@/apis'
console.log(apis)
import { loadFromLocal } from '@/apis/localStorage'

import qs from 'qs'
console.log(qs)

import "@/assets/icon/style.css"; //字体图标库
import './assets/flexible' //rem
import Vant from 'vant'; //加载vant所有组件
import 'vant/lib/index.css';

const app = createApp(App)
const pinia = createPinia()

app.use(Vant)
app.use(pinia)
app.use(router)

// 全局属性
app.config.globalProperties.$apis = apis

// 路由守卫
var localToken = loadFromLocal('token');
console.log(localToken);
let whiteList = ['/login', '/home', '/mes']
router.beforeEach(function(to, from, next) {
    let _inFlag = to.meta.auth;
    var _intoken = localToken; // 从localStorage获取token
    if (whiteList.indexOf(to.path) === -1) {
        if (_inFlag && _intoken) {
            next()
        } else {
            if (_inFlag) {
                if (!_intoken) {
                    // next('/login')
                }
            } else {
                next()
            }
            // next('/login');
        }
    } else {
        next()
    }
})

app.mount('#app')