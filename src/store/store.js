import * as types from "./const";
import { loadFromLocal } from '@/apis/localStorage'

export default {
    state: {
        token: loadFromLocal('token'),
        loding: '',
        backFlag: false,
        sid: '',
        goods_id: '',
        shopCollect: ''
    },
    mutations: {
        [types.TOKEN](state, payload) {
            //console.log(payload)
            state.token = payload
                //console.log(state.token)
        },
        [types.LODING](state, payload) {
            state.loding = payload
        },
        [types.Flag](state, payload) {
            state.backFlag = payload;
        }
    },
    actions: {
        setToken({ commit }, token) {
            console.log(token)
            commit(types.TOKEN, token)
        },
        setLoding({ commit }, loding) {
            commit(types.LODING, loding)
        },
        setBackFlag({ commit }, flag) {
            commit(types.Flag, flag)
        }
    },
    getters: {
        GET: state => {
            return state.token
        }
    }
}