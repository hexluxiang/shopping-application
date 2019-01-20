<template>
  <div>
    <van-popup class="pop-class" v-model="show" position="right" :overlay="false">
      <van-nav-bar title="修改资料" left-text="返回" left-arrow right-text="保存" @click-left="onClickLeft(false)" @click-right="onClickRight" />
      <van-cell-group>
        <van-field v-model="user_info.nickname" clearable label="联系人:" placeholder="如:张三" @click-icon="$toast('question')" />
        <van-field v-model="user_info.nickname" type="text" label="联系电话：" placeholder="联系方式" />
        <van-field v-model="user_info.nickname" type="text" label="地址:" placeholder="福建省福州市" />
        <van-field v-model="user_info.mobile" type="text" label="QQ:" placeholder="" />
        <van-field v-model="user_info.mobile" type="text" label="微信:" placeholder="" />
        <van-field v-model="user_info.mobile" type="textarea" label="简介:" placeholder="用户简介" />
      </van-cell-group>
      <img :src="imgDataUrl" alt="">
      <van-uploader :after-read="onRead">
        <van-icon name="photograph" />
      </van-uploader>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  saveToLocal,
  loadFromLocal,
  removeFromLocal,
  getToLocal
} from "@/apis/localStorage";
import { Toast } from "vant";
// import { mapMutations, mapActions } from "vuex";
// import store from "@/store";

export default {
  data() {
    return {
      isLoading: false,
      imgDataUrl: ""
    };
  },
  components: {},
  props: {
    show: {
      type: Boolean,
      default:Boolean
    },
    user_info: {
      type: Object,
      default() {
        return {
          nickname: "",
          mobile: ""
        };
      }
    }
  },
  methods: {
    onRead(file) {
      console.log(file.file.name);
      this.imgDataUrl = file.file.name;
    },
    onClickLeft(flag) {
      this.$emit("show-pop", false);
    },
    onClickRight() {
      this.$apis.user
        .setUserInfo({
          nickname: this.user_info.nickname,
          avatar: this.imgDataUrl
        })
        .then(res => {
          console.log(res);
        });
      this.onClickLeft();
    }
  },
  created: {
    put() {
      console.log(0);
    }
  }
};
</script>

<style scoped lang="scss">
.pop-class {
  width: 100%;
  height: 100%;
}
</style>

