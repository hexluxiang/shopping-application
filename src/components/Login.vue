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
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/main'
import {
  saveToLocal,
  loadFromLocal,
  removeFromLocal,
  getToLocal
} from "@/apis/localStorage";
import { log } from "@/utils";

export default {
  setup() {
    const router = useRouter()
    const store = useMainStore()
    const { proxy } = getCurrentInstance()
    
    const user = ref("")
    const password = ref("")
    const phone = ref("")
    const sms = ref("")
    const checked = ref(true)
    const index = ref(1)
    
    const login = () => {
      if (!(user.value && password.value)) {
        alert("请输入用户名和密码");
        return;
      }
      
      proxy.$apis.user
        .userLogin({ mobile: user.value, password: password.value })
        .then(res => {
          Object.keys(res).forEach(item => {
            saveToLocal(item, res[item]);
          });
          store.setToken(res.token);
          router.push({ path: "/home" });
        })
        .catch(res => {
          log(res);
        });
    }
    
    const go = (ev) => {
      if(ev.keyCode == 13) login();
    }
    
    return {
      user,
      password,
      phone,
      sms,
      checked,
      index,
      login,
      go
    }
  }
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
