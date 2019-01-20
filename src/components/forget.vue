<template>
    <div class="fpage">
        <loginbg></loginbg>
        <div class="login-tab">
            <van-row type="flex">
                <van-col span="24">
                    忘记密码
                </van-col>
            </van-row>
        </div>
        <van-cell-group>
            <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
            <van-field v-model="sms" center clearable label="验证码" placeholder="请输入短信验证码" required>
                <van-button slot="button" size="small" type="primary" @click="sendSms">发送验证码</van-button>
            </van-field>
            <van-field v-model="password" type="password" label="新密码" placeholder="请输入新密码" />
            <van-row>
                <van-col span="16" offset="4">
                    <van-button class="gc-fgt-btn" size="large" @click="fgtBtn">重置密码</van-button>
                </van-col>
            </van-row>
            <van-button size="normal" style="border:none" plain type="danger" @click="backlogin">返回登录</van-button>
        </van-cell-group>
    </div>
</template>

<script type="text/ecmascript-6">
import loginbg from "@/components/logo-bg.vue";
export default {
  data() {
    return {
      phone: "", //修改密码的手机号
      password: "", //新的密码
      sms: "" //修改密码时短信验证码
    };
  },
  components: {
    loginbg
  },
  methods: {
    sendSms() {
      this.$apis.user
        .userSms({ mobile: this.phone, action: "forget" })
        .then(res => {
          console.log(res);
        })
        .catch(console.error());
    },
    fgtBtn() {
      this.$apis.user
        .userForget({
          mobile: this.phone,
          vcode: this.sms,
          password: this.password
        })
        .then(res => {
          console.log(res);
        })
        .catch(console.error());
    },
    backlogin() {
      this.$router.push({ path: "/entrance" });
    }
  }
};
</script>

<style scoped lang="scss">
.fpage{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
.login-tab {
  background: #ee5e7b;
  height: 40px;
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  color: white;
  border-bottom: 3px solid hsla(0, 0%, 100%, 0.5);
}
.gc-fgt-btn {
  height: 44px;
  line-height: 44px;
  color: #fff;
  background: #ee5e7b;
  border-radius: 10px;
}
}
</style>
