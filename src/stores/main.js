import { defineStore } from 'pinia'
import { loadFromLocal } from '@/apis/localStorage'

export const useMainStore = defineStore('main', {
  state: () => ({
    token: loadFromLocal('token'),
    loding: '',
    backFlag: false,
    sid: '',
    goods_id: '',
    shopCollect: ''
  }),
  
  getters: {
    getToken: (state) => state.token
  },
  
  actions: {
    setToken(token) {
      this.token = token
    },
    setLoding(loding) {
      this.loding = loding
    },
    setBackFlag(flag) {
      this.backFlag = flag
    }
  }
})
