<template>
    <div class="mimepage">
        <div class="head">
            <span>用户中心</span>
        </div>
        <div class="user-Info">
            <div class="avatar">
                <img :src="userinfo.avatar" alt="" @click="changeInfo(true)">
            </div>
            <div class="name">
                <span>{{userinfo.nickname}}</span>
            </div>
            <div class="money">
                <span>{{userinfo.money}}￥</span>
            </div>
        </div>
        <div class="my_menu_order">
            <div class="menu_title">
                <span>我的订单</span>
                <span>查看全部
                    <i class="gc-iconright"></i>
                </span>
            </div>
            <div class="order_nav">
                <div class="nav_item">
                    <i class="gc-iconshopfill"></i>
                    <span>待结算</span>
                </div>
                <div class="nav_item">
                    <i class="gc-iconshopfill"></i>
                    <span>待收货</span>
                </div>
                <div class="nav_item">
                    <i class="gc-iconshopfill"></i>
                    <span>已完成</span>
                </div>
                <div class="nav_item">
                    <i class="gc-iconshopfill"></i>
                    <span>退换货</span>
                </div>
            </div>
        </div>
        <div class="menus_list">
            <div class="detail-list">
                <div class="items">
                    <i class="gc-iconshopfill"></i>
                    <span>退换货</span>
                </div>
                <div class="items">
                    <i class="gc-iconshopfill"></i>
                    <span>退换货</span>
                </div>
                <div class="items">
                    <i class="gc-iconshopfill"></i>
                    <span>退换货</span>
                </div>
                <div class="items">
                    <i class="gc-iconshopfill"></i>
                    <span>退换货</span>
                </div>
                <div class="items">
                    <i class="gc-iconshopfill"></i>
                    <span>退换货</span>
                </div>
                <div class="items">
                    <i class="gc-iconshopfill"></i>
                    <span>退换货</span>
                </div>
                <div class="items">
                    <i class="gc-iconshopfill"></i>
                    <span>退换货</span>
                </div>
                <div class="items">
                    <i class="gc-iconshopfill"></i>
                    <span>退换货</span>
                </div>
            </div>
        </div>
        <van-row>
            <van-col span="24" offset="0">
                <van-button class="item gc-exit-btn" size="large" @click="out">退出</van-button>
            </van-col>
        </van-row>
        <changeInfo :show="show" @show-pop="closePop" :user_info="userinfo"></changeInfo>
    </div>
</template>

<script>
import menusItem from "@/components/menus_item";
import { removeFromLocal } from "@/apis/localStorage";
import changeInfo from "@/components/changeInfo";
// import { mapMutations, mapActions } from "vuex";
// import store from "@/store";

export default {
  data() {
    return {
      userinfo: {},
      show: false
    };
  },
  components: {
    menusItem,
    changeInfo
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      let res = await this.$apis.user.userInfo();
      this.userinfo = res;
      console.log(this.userinfo);
    },
    out() {
      this.$apis.user.userExit().then(res => {
        console.log(res);
        removeFromLocal("token");
        this.$router.push({ path: "/login" });
      });
    },
    closePop(data){
        this.show=data
    },
    changeInfo(flag) {
      this.show=flag
    },
  }
};
</script>

<style scoped lang="scss">
.mimepage {
  .head {
    background: silver;
    border-bottom: 1px solid black;
    span {
      display: block;
      font-size: 15px;
      padding: 15px 0;
    }
  }
  .user-Info {
    padding: 10px;
    border-bottom: 2px solid black;
    .avatar img {
      width: 80px;
      border-radius: 100%;
    }
    .name,
    .money {
      margin-top: 15px;
    }
  }
  .my_menu_order {
    padding: 5px 0;
    border-bottom: 2px solid black;
    margin-bottom: 6px;
    .menu_title {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      font-size: 14px;
    }
    .order_nav {
      display: flex;
      justify-content: space-around;
      margin: 25px 0;
      .nav_item {
        font-size: 20px;
        color: #9ca38e;
        span {
          display: block;
          margin: 8px 5px;
        }
      }
    }
  }
  .menus_list {
    width: 100%;
    // padding: 30px 0;
    .detail-list {
      display: flex;
      justify-content: space-around;
      flex-flow: wrap;
      align-items: center;
      .items {
        width: 90px;
        // height: 90px;
        padding: 15px 0;
        font-size: 20px;
        color: #9ca38e;
        span {
          display: block;
        }
      }
    }
  }
  .gc-exit-btn {
    height: 44px;
    line-height: 44px;
    color: #fff;
    background: #ee5e7b;
    border-radius: 10px;
  }
}
</style>
