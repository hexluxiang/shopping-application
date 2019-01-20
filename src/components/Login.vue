<template>
  <div class="page">
    <van-cell-group class="van-tab__pane">
      <van-field class="item" v-model="user" required clearable label="用户名" icon="question" placeholder="请输入用户名" @click-icon="$toast('question')" />

      <van-field class="item" v-model="password" type="password" label="密码" placeholder="请输入密码" required  @keyup.enter="go($event)"/>

      <van-row>
        <van-col span="24" offset="0">
          <van-button class="item gc-login-btn" size="large" @click="login" >登录</van-button>
        </van-col>
      </van-row>

    </van-cell-group>
    <div class="footer">
      <div class="back">
        <!-- <van-icon name="arrow-left" /> -->
        <i class="gc-iconback"></i>
        <router-link to="/">返回商城</router-link>
      </div>
      <div class="forget">
        <router-link to="/forget">忘记密码?</router-link>
      </div>
    </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  saveToLocal,
  loadFromLocal,
  removeFromLocal,
  getToLocal
} from "@/apis/localStorage";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { log } from "@/utils";
export default {
  data() {
    return {
      index: 1,
      user: "", //登录的用户名
      password: "", //登录的密码
      phone: "", //注册的手机号
      sms: "", //注册时短信验证码
      checked: true
    };
  },
  components: {},
  methods: {
    login() {
      if (!(this.user && this.password)) {
        alert("请输入用户名和密码");
        return;
      }
      this.$apis.user
        .userLogin({ mobile: this.user, password: this.password })
        .then(res => {
          //log(res);
          Object.keys(res).forEach(item => {
            saveToLocal(item, res[item]);
          });
          //getToLocal('code');
          this.setToken(res.token);
          this.$router.push({ path: "/home" });
        })
        .catch(res => {
          log(res);
        });
    },
    go(ev){
      if(ev.keyCode == 13) this.login();
    },
    ...mapActions(["setToken"])
  },
  watch: {}
};
</script>

<style scoped lang="scss">
.item {
  margin-top: 20px;
}
.gc-login-btn {
  height: 44px;
  line-height: 44px;
  color: #fff;
  background: #ee5e7b;
  border-radius: 10px;
}
.reg-protocol {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  span {
    padding: 0 5px;
  }
  a {
    color: #ee5e7b;
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  div a {
    color: #ee5e7b;
    font-size: 15px;
  }
}
</style>
