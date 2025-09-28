<template>
  <div class="regpage">
    <van-cell-group>
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="sms" center clearable label="验证码" placeholder="请输入短信验证码" required>
        <van-button slot="button" size="small" type="primary" @click="sendSms">发送验证码</van-button>
      </van-field>
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
      <div class="reg-protocol">
        <van-checkbox v-model="checked">同意敢潮BRP用户协议 </van-checkbox>
        <span>
          <a href="http://wx.xiahe.me/#/platform/signed">查看协议</a>
        </span>
      </div>
      <van-button class="item gc-reg-btn" size="large" @click="reg">注册</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'

export default {
  setup() {
    const { proxy } = getCurrentInstance()
    
    const phone = ref("") //注册的手机号
    const password = ref("") //注册的密码
    const sms = ref("") //注册时短信验证码
    const checked = ref(true)
    
    const sendSms = () => {
      proxy.$apis.user
        .userSms({ mobile: phone.value, action: "regist" })
        .then(res => {
          console.log(res);
        });
    }
    
    const reg = () => {
      proxy.$apis.user
        .userReg({ mobile: phone.value, password: password.value, vcode: sms.value })
        .then(res => {
          console.log(res);
        });
    }
    
    return {
      phone,
      password,
      sms,
      checked,
      sendSms,
      reg
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  margin-top: 15px;
}
.gc-reg-btn {
  height: 44px;
  line-height: 44px;
  color: #fff;
  background: #ee5e7b;
  border-radius: 10px;
}
.reg-protocol {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  span {
    padding: 0 5px;
  }
  a {
    color: #ee5e7b;
  }
}
</style>
