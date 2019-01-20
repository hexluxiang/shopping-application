<template>
  <div class="app-page">
    <router-view/>    
    <div class="tabs">
      <div class="tab-item">
        <router-link to="/home">
          <i class="gc-iconhome">
            <span>首页</span>
          </i>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shopcars">
          <i class="gc-iconcart">
            <span>采购车</span>
          </i>
        </router-link>
      </div>
      <div class="tab-item" v-if="!token" >
        <router-link to="/entry" @click="entry" >
          <i class="gc-iconroundadd">
            <span>入住</span>
          </i>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/mes">
          <i class="gc-iconcomment">
            <span>消息</span>
          </i>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/mime">
          <i class="gc-iconpeople">
            <span>我的</span>
          </i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { loadFromLocal } from '@/apis/localStorage'
import {mapGetters} from 'vuex'
export default {
  name: "App",
  data() {
    return {
      flag:true
    };
  },
  created() {
    //console.log(this.$store.state.token)
  },
  components: {},
  computed:{
    token(){
      return this.$store.state.token
    }
  },
  methods: {
    entry() {
      var dis = this.$store.state.token;
      //console.log(dis)
      if(dis){
        this.flag = false
      }else{
        this.flag = true
      }
    }
  }
};
</script>

<style lang="scss">
.tabs {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  //border-bottom: 1px solid silver;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index: 99;
  .tab-item {
    flex: 1;
    text-align: center;
    a {
      text-decoration-line: none;
      color: #999;
      font-size: 15px;
      span {
        font-size: 12px;
      }
    }
    a.router-link-active {
      font-size: 18px;
      line-height: 18px;
      color: #ee5e7b;
      border-bottom: 2px solid #ee5e7b;
      padding-bottom: 10px;
    }
  }
}
</style>
