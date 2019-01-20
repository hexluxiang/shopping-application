<template>
  <div class="login-page">
    <div class="login-cotainer">
      <loginbg></loginbg>
      <div class="login-tab">
        <van-row type="flex">
          <van-col span="12">
            <router-link to="/login">登录</router-link>
          </van-col>
          <van-col span="12">
            <router-link to="/reg">注册</router-link>
          </van-col>
        </van-row>
      </div>
      <div class="login-reg">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import loginbg from "@/components/logo-bg.vue";
export default {
  data() {
    return {};
  },
  components: {
    loginbg
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.login-page {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0; //#ee5e7b
  .login-tab {
    background: #ee5e7b;
    height: 40px;
    display: flex;
    justify-content: space-around;
    font-size: 20px;
    color: white;
    border-bottom: 3px solid hsla(0, 0%, 100%, 0.5);
    div {
      width: 100%;
      // border-bottom: 3px solid hsla(0,0%,100%,.5);
    }
    div a {
      text-decoration-line: none;
      color: white;
      font-size: 20px;
    }
  }
  .login-reg {
    padding: 20px;
  }
}
</style>
