<template>
  <div>
    <van-popup v-model="shopFlag" position="right" :overlay="true" class="shop-pop">
      <div class="shop-header">
        <div class="back btn" @click="closeShop(false)">
          <i class="gc-iconback"></i>
        </div>
        <div class="more btn" @click="shopMore">
          <i class="gc-iconmore"></i>
        </div>
      </div>
      <div class="shop-header-info">
        <div class="shop-info-img">
          <img :src="bgUrl" alt=""  style="width:100%;">
        </div>
        <div class="shop-info-outer"></div>
        <div class="shop-info-inner">
          <div class="inner-top">
            <img :src="shopItem.logo" alt="">
            <div class="detail">
              <div class="top-shop-name">{{shopItem.name}}
                <span>1年店</span>
              </div>
              <div class="shops-detail">查看店铺详情>></div>
            </div>
            <div class="goodsCollect" @click="collectShop(false)">
              <i class="gc-iconlike"></i>
              <i v-if="isCollect">取消</i>收藏
            </div>
          </div>
          <div class="inner-bottom">
            <div>
              <p>0</p>
              <p>出货量</p>
            </div>
            <div>
              <p>0</p>
              <p>供应商</p>
            </div>
            <div>
              <p>0</p>
              <p>客流量</p>
            </div>
          </div>
        </div>
      </div>
          <homeGoodsList :goodsList="this.shopItem.goods"></homeGoodsList>
    </van-popup>
    <!-- <detail :show="show" :goods_info="goods" :total="goodsNum" :goods_Id="goodsId" @show-pop='coloseDetail'></detail> -->
  </div>
</template>

<script type="text/ecmascript-6">
import detail from "./goodsDetail";
import homeGoodsList from "./homeGoodsList";
import { Toast } from "vant";
import {
  saveToLocal,
  loadFromLocal,
  removeFromLocal
} from "@/apis/localStorage";
export default {
  data() {
    return {
      bgUrl: "http://res.xiahe.me/default/shop_bg.png",
      isCollect: false //店铺是否收藏
    };
  },
  components: {
    detail,
    homeGoodsList
  },
  props: {
    shopFlag: {
      type: Boolean,
      default: Boolean
    },
    shopItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    goodsDetail(item, flag) {
      console.log("进入详情");
    },
    closeShop(flag) {
      this.$emit("show-pop", flag);
    },
    collectShop(flag) {
      //收藏，取消店铺
      this.isCollect = !this.isCollect;
      saveToLocal("isCollect", this.isCollect);
      // this.isCollect = loadFromLocal("isCollect");
      var shopSid = this.shopItem.sid;
      if (loadFromLocal("isCollect")) {
        this.$apis.user
          .saveShop({ sid: shopSid })
          .then(res => {
            Toast("店铺收藏成！");
          })
          .catch(res => {
            Toast("店铺收藏失败 ！");
          });
      } else {
        this.isCollect = loadFromLocal("isCollect");
        this.$apis.user
          .cancleShop({ sid: shopSid })
          .then(res => {
            Toast("店铺取消收藏成！");
          })
          .catch(res => {
            Toast("店铺取消收藏失败！");
          });
      }
    },
    shopMore(){
      Toast("分享到朋友圈");
    }
  },
  created() {}
};
</script>

<style lang="scss">
.shop-pop {
  width: 100%;
  height: 100%;
  .shop-header {
    i {
      font-size: 25px;
      color: #fff;
      line-height: 1.5;
    }
    .back {
      left: 10px;
    }
    .more {
      right: 10px;
    }
    .btn {
      position: fixed;
      top: 0;
      background-color: hsla(0, 0%, 100%, 0.5);
      border-radius: 50%;
      width: 35px;
      height: 35px;
      padding: 5px;
      margin: 5px 5px 0;
      z-index: 20;
    }
  }
  .shop-header-info {
    position: relative;
    overflow: hidden;
    color: #fff;
    height: 190px;
    .shop-info-img {
    }
    .shop-info-inner {
      position: absolute;
      width: 100%;
      top: 0;
      left: -20px;
      padding: 55px 20px 15px 20px;
      float: left;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 20px;
      }
      .inner-top {
        display: flex;
        align-items: center;
        padding-top: 10px;
        position: relative;
        .detail {
          margin-left: 10px;
          padding-right: 60px;
          text-align: left;
        }
        .goodsCollect {
          position: absolute;
          right: 10px;
          top: 15px;
          height: 26px;
          line-height: 26px;
          color: #fff;
          font-size: 12px;
          text-align: center;
          background: #ee5e7b;
          border-radius: 15px;
          padding: 0 8px;
        }
      }
      .inner-bottom {
        border-top: 1px solid #c7c7c7;
        display: flex;
        align-items: center;
        color: #fff;
        padding: 10px;
        margin-top: 10px;
        text-align: center;
        div {
          flex: 1;
          width: 50px;
          height: 50px;
          padding-top: 10px;
          font-size: 15px;
          line-height: 1.5;
        }
      }
    }
    .shop-info-outer {
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
