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

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      phone: "", //注册的手机号
      password: "", //注册的密码
      sms: "", //注册时短信验证码
      checked: true
    };
  },
  components: {},
  methods: {
    sendSms() {
      this.$apis.user
        .userSms({ mobile: this.phone, action: "regist" })
        .then(res => {
          console.log(res);
        });
    },
    reg() {
      this.$apis.user
        .userReg({ mobile: this.phone, password: this.word, vcode: this.sms })
        .then(res => {
          console.log(res);
        });
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
