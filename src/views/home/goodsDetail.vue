<template>
  <div>
    <van-popup class="pop-class" v-model="show" position="right" :overlay="false">
      <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft(false)" @click-right="onClickRight">
        <div slot="right">
          <i class="gc-iconcart" style="color:#ee5e7b;font-size:25px;"></i>
        </div>
      </van-nav-bar>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in goods_info.imgs" :key="index" :autoplay="1000">
          <img class="vanImg" :v-lazy="image.img" :src='image.url'/>
        </van-swipe-item>
      </van-swipe>
      <div class="goodsInfo">
        <div class="goodsName">{{goods_info.title}}</div>
        <div class="goodsCollect" @click="collectGoods(false)">
          <i class="gc-iconlike"></i>
          <i v-if="goodIsCollect">取消</i>收藏
        </div>
        <div class="goodsCode">
          <div class="flex-one">编号:{{goods_info.code}}</div>
          <div class="flex-one">库存:{{totalNum}}</div>
        </div>
        <div class="goodsPrice">
          <div class="btn-price">￥{{goods_info.sales_price}}</div>
          <div class="btn-share">
            <i class="gc-iconforward" @click="share"></i>
          </div>
        </div>
      </div>
      <div class="goodsSpec">
        <div class="goods-kind">
          <p>共
            <i>1</i>种规格</p>
          <p>已选
            <i>1</i>种</p>
        </div>
        <div class="goods-kind-select" @click="select">
          <i class="gc-iconcart"></i>
          <span>选规格</span>
        </div>
      </div>
      <div class="gotoShop-btn">
        <button>
          <span>进店逛逛</span>
        </button>
      </div>
    </van-popup>
    <van-popup v-model="sharePop" position="bottom" :overlay="true" class="bottomPop">
      <div>分享到朋友圈</div>
      <div>分享到微信好友</div>
      <div>返回</div>
    </van-popup>
    <van-popup v-model="selectSize" position="bottom" :overlay="true" class="bottom-sel">
      <span>{{goods_info.code}}</span>
      <p>
        <img :src="goods_info.thumb" alt="">
        <span>价格:{{goods_info.sales_price}}</span>
        <span>{{goods_info.title}}</span>
      </p>
      <div id="i-button">
        <div class="redNum pub-btn" @click="redNum">
          <button>
            <i class="gc-iconmove"></i>
          </button>
        </div>
        <div class="num">
          <input type="text" v-model="goodsNumber">
        </div>
        <div class="addNum pub-btn" @click="addNum">
          <button>
            <i class="gc-iconadd"></i>
          </button>
        </div>
      </div>
      <div class="addShopCarts">
        <div></div>
        <div class="sure"><button>sure</button></div>
      </div>
      <!-- <div class="goods-top"></div>
        <div class="goods-content"></div>
        <div class="goods-bottom"></div>    -->
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

export default {
  data() {
    return {
      isLoading: false,
      imgDataUrl: "",
      sharePop: false,
      goodIsCollect: false, //物品是否收藏
      selectSize: false,
      goodsNumber: 0,
      stockNum :0
    };
  },
  components: {},
  props: {
    show: {
      type: [Boolean, Number],
      default: Boolean
    },
    goods_info: {
      type: Object,
      default() {
        return {};
      }
    },
    total: {
      type: Object,
      default() {
        return {};
      }
    },
    goods_Id: {
      type: [Number, String]
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
      this.$router.push({ path: "/shopcars" });
      this.onClickLeft();
    },
    share() {
      this.sharePop = ~this.sharePop;
    },
    select() {
      this.selectSize = !this.selectSize;
      console.log(0);
    },
    collectGoods() {
      //商品收藏/取消收藏
      this.goodIsCollect = !this.goodIsCollect;
      saveToLocal("goodIsCollect", this.goodIsCollect);
      this.goodIsCollect = loadFromLocal("goodIsCollect");
      if (loadFromLocal("goodIsCollect")) {
        this.$apis.user
          .saveGoods({ goods_id: this.goods_Id })
          .then(res => {
            Toast("商品收藏成功！");
          })
          .catch(res => {
            Toast("商品收藏失败 ！");
          });
      } else {
        this.goodIsCollect = loadFromLocal("goodIsCollect");
        this.$apis.user
          .cancleGoods({ goods_id: this.goods_Id })
          .then(res => {
            Toast("取消收藏成功！");
          })
          .catch(res => {
            Toast("取消收藏失败！");
          });
      }
    },
    redNum(){

      this.goodsNumber<1?this.goodsNumber=0:this.goodsNumber -=1;
          
    },
    addNum(){
      this.goodsNumber<this.stockNum?this.goodsNumber +=1:this.goodsNumber
    }
  },
  computed: {
    totalNum() {
      this.stockNum = this.total.in_sum - this.total.out_sum
      return this.stockNum;
    }
  }
};
</script>

<style scoped lang="scss">
.pop-class {
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
  .vanImg {
    height: 360px;
  }
  .goodsInfo {
    background-color: #fff;
    padding: 10px 0 10px 10px;
    position: relative;
    border-bottom: 1px solid #e4dfdf;
    .goodsName {
      font-size: 16px;
      color: #333;
      line-height: 20px;
      padding-right: 90px;
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
    .goodsCode {
      display: flex;
      padding: 10px 10px 10px 0;
      border-bottom: 1px solid #e8e8e8;
      color: #999;
      :first-child {
        text-align: left;
      }
      :last-child {
        text-align: right;
      }
      .flex-one {
        flex: 1;
        font-size: 14px;
      }
    }
    .goodsPrice {
      display: flex;
      align-items: center;
      .btn-price {
        font-size: 20px;
        color: #ee5e7b;
        padding-right: 10px;
      }
      .btn-share {
        flex: 1;
        text-align: right;
        padding-right: 10px;
        font-size: 25px;
        color: #666;
      }
    }
  }
  .goodsSpec {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-top: 10px;
    border-bottom: 1px solid #e4e1e1;
    background-color: #fff;
    .goods-kind {
      flex: 1;
      text-align: left;
      color: #999;
      line-height: 20px;
      i {
        color: #ee5e7b;
        line-height: 20px;
        padding: 0px 5px;
      }
    }
    .goods-kind-select {
      /* position: relative; */
      margin-left: auto;
      margin-right: auto;
      /* padding-left: 14px; */
      /* padding-right: 0px; */
      box-sizing: border-box;
      font-size: 18px;
      text-align: center;
      text-decoration: none;
      color: #ffffff;
      line-height: 2.33333333;
      /* border-radius: 5px; */
      /* -webkit-tap-highlight-color: rgba(0,0,0,0); */
      overflow: hidden;
      background-color: #ee5e7b;
      border-radius: 99px;
      flex: 1;
    }
  }
  .gotoShop-btn {
    padding: 10px 50px;
    button {
      border-color: #ee5e7b;
      color: #ee5e7b;
      width: 100%;
      height: 100%;
      background: #fff;
      border: 1px solid;
      font-size: 14px;
      line-height: 2.3;
      padding: 0 10px;
    }
  }
}
.bottomPop {
  font-size: 18px;
  line-height: 1.5;
  background-color: #e4e4e4;
  :last-child {
    margin-top: 5px;
  }
  div {
    background-color: #fff;
    padding: 10px 0;
    border-bottom: 1px solid #cec8c8;
  }
}
.bottom-sel {
  width: 100%;
  height: 500px;
  border-top: 2px solid #ee5e7b;
}
#i-button {
  display: flex;
  align-items: center;
  width: 102px;
  height: 30px;
  text-align: center;
  border: 1px solid #666;
  border-radius: 3px;
  .num {
    input {
      border: none;
      outline: none;
      width: 40px;
      font-size: 15px;
      text-align: center;
      line-height: 2;
      color: #ee5e7b;
    }
  }
  .pub-btn {
    font-size: 15px;
    line-height: 1;
    button {
      border: none;
      outline: none;
      padding: 7px 8px;
      background: #e3e3e3;
    }
  }
}
.addShopCarts{
  display: flex;
  align-items: center;
  :first-child{
    flex: 2;
    padding: 20px;
    }
    .sure{
      button{
            border: none;
    outline: none;
    font-size: 15px;
    background: #ee5e7b;
    color: #fff;
    line-height: 1;
    padding: 12px 20px;
      }
    }
  
}
</style>

