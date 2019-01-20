import Vue from 'vue'
import axios from 'axios'
import config from '@/config'
import store from '@/store'
import { Toast } from 'vant';
import router from '@/router'
import { log } from '@/utils'
import { saveToLocal, loadFromLocal, removeFromLocal } from '@/apis/localStorage'

Vue.use(Toast)
    // 加载最小时间
const MINI_TIME = 300
    // 超时时间
let TIME_OUT_MAX = 5000
    // 环境value
let _env = process.env.NODE_ENV
    // 请求接口host
let _apiHost = config.host
    // 请求组（判断当前请求数）
let _requests = []

/**
 * 添加请求，显示loading
 * @param {请求配置} config 
 */
function pushRequest(config) {
    log(`${config.url}--begin`)
    _requests.push(config)
    Toast.loading({
        mask: true,
        message: '加载中...'
    })
    store.dispatch('setLoding')
}

/**
 * 移除请求，无请求时关闭loading
 * @param {请求配置} config 
 */
function popRequest(config) {
    log(`${config.url}--end`)
    let _index = _requests.findIndex(r => {
        return r === config
    })
    if (_index > -1) {
        _requests.splice(_index, 1)
    }
    if (!_requests.length) {
        Toast.clear();
        store.dispatch('setLoding', false)
    }
}

// 无Token请求
const noToken = []
    // 全局设置axios
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = _apiHost
    // axios.defaults.withCredentials=true
    /**
     * 请求地址，请求数据，是否静默，请求方法
     */
    //console.log(store.state.token)
export default (options = { url: '', data: {}, isSilence: false, method: 'GET' }) => {
    console.log(store.state.token)
    let _opts = { method: options.method, url: options.url }
    let _data = Object.assign({}, options.data, { token: store.getters.GET })
    const _query = {}
    for (let _key in _data) {
        if (_data.hasOwnProperty(_key) && _data[_key] !== '') {
            _query[_key] = _data[_key]
        }
    }
    let _timer = null
    if (_opts.method.toLocaleUpperCase() === 'GET') {
        _opts.params = _query
    } else {
        _opts.data = _query
    }
    return new Promise((resolve, reject) => {
        const _instance = axios.create({
            timeout: TIME_OUT_MAX
        })
        let _random = { stamp: Date.now(), url: `${_apiHost + options.url}` }
        if (!options.isSilence) {
            _timer = setTimeout(() => {
                pushRequest(_random)
            }, MINI_TIME)
        }
        _instance(_opts)
            .then(res => {
                clearTimeout(_timer)
                popRequest(_random)
                    //console.log(JSON.stringify(res))
                resolve(res.data)
            }).catch(res => {
                var _errorState = res.response //错误发生时后端返回的数据
                console.log(_errorState)
                var errMess = null;
                switch (_errorState.status) {
                    case 404:
                        errMess = '404,错误请求'
                        break;
                    case 401:
                        errMess = '未授权'
                        break;
                    case 403:
                        errMess = '禁止访问'
                        break;
                    case 408:
                        errMess = '请求超时'
                        break;
                    case 500:
                        errMess = '服务器内部错误'
                        break;
                    case 501:
                        errMess = '功能未实现'
                        break;
                    case 503:
                        errMess = '服务不可用'
                        break;
                    case 504:
                        errMess = '网关错误'
                        break;
                    default:
                        errMess = '未知错误'
                }
                Toast({
                    message: _errorState.data && _errorState.data.error ? _errorState.data.error : errMess,
                });
            })
    })
}