<template>
  <div class="shop-page">
    <div class="cars-title">
      <span>采购车</span>
    </div>
    <div class="cars-Info">
      <div class="info">
        <p>当前商铺:
          <i style="color: #ee5e7b;">abc</i>
        </p>
        <div class="content">
          <p>联系人:</p>
          <p>联系电话:</p>
        </div>
      </div>
    </div>
    <div class="carts-item" v-for="(item,index) in this.cartsItem.shops" :key="index">
      <div class="cart-img">
        <img :src="item.logo" alt="">
        <div class="name">{{item.name}}
          <div class="arrow">
            <i class="gc-iconright"></i>
          </div>
        </div>
      </div>
      <div class="item" v-for="(val,keys) in item.goods" :key="keys">
        <div class="goodsInfo">
          <div class="img">
            <img :src="val.thumb" alt="">
          </div>
          <div class="info">
            <p>{{val.title}}</p>
            <p>货号:{{val.code}}</p>
          </div>
          <div class="money">￥{{val.sales_price}}</div>
        </div>
        <div class="totalMoney">
          <span>${{val.sales_price}}</span>×{{item.goods_count}}
        </div>
      </div>
      <div class="sum">
        <div class="number">
          总计
          <span>￥{{totalMoney}}</span>
        </div>
        <div class="sum-btn" @click="getAll(item)">
          <button>结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      cartsItem: "",
      totalMoney:0,
    };
  },
  components: {},
  created() {
    this.getcarts();
    //this.getAll();
  },
  methods: {
    async getcarts() {
      let res = await this.$apis.user.getCarts();
      this.cartsItem = res;
      console.log(this.cartsItem);
    },
    getAll(item) {
      var _count = item.goods_count;
      item.goods.forEach( el =>{        
       var _price = parseInt(el.sales_price)
       this.totalMoney += _price*_count;
       console.log(this.totalMoney)
      })
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
$border_colo: #bebaba;
.shop-page {
  width: 100%;
  overflow: hidden;
  background: #ededed;
  .cars-title {
    padding: 10px 0;
    border-bottom: 1px solid $border_colo;
    background: #fff;
    span {
      font-size: 15px;
      line-height: 2;
    }
  }
  .cars-Info {
    padding: 20px 20px;
    border-bottom: 1px solid $border_colo;
    background: #fff;
    margin-bottom: 10px;
    .info {
      text-align: left;
      font-size: 15px;
      .content {
        margin-top: 10px;
      }
    }
  }
  .carts-item {
    background: #fff;
    margin-bottom: 30px;
    .cart-img {
      background-color: #fff;
      height: 44px;
      padding: 0 15px;
      position: relative;
      //border-bottom: 1px solid $border_colo;
      img {
        width: 32px;
        height: 32px;
        padding: 2px;
        margin-top: 3px;
        border: 1px solid $border_colo;
        border-radius: 50%;
        overflow: hidden;
        float: left;
      }
      .name {
        margin-left: 40px;
        color: #333;
        line-height: 44px;
        font-size: 15px;
        text-align: left;
        padding-left: 10px;
        .arrow {
          display: inline-block;
          float: right;
        }
      }
    }
    .item {
      border-bottom: 1px solid $border_colo;
      border-top: 1px solid $border_colo;
      margin-bottom: 10px;
      &:first-child {
        border-top: none;
      }
      .goodsInfo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
        .img {
          width: 70px;
          height: 70px;
          border-radius: 100%;
          padding-left: 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          margin-right: 30%;
          :first-child {
            padding-bottom: 50%;
          }
        }
        .money {
          font-size: 16px;
          color: #ee5e7b;
          padding-right: 15px;
        }
      }
      .totalMoney {
        border-top: 1px solid $border_colo;
        padding: 0 15px;
        line-height: 44px;
        text-align: right;
        color: #333;
        font-size: 14px;
        span {
          color: #ee5e7b;
          padding-right: 10px;
        }
      }
    }
    .sum {
      display: flex;
      padding: 10px 15px;
      background-color: #fff;
      align-items: center;
      .number {
        flex: 1;
        text-align: left;
        font-size: 16px;
        span {
          color: #ee5e7b;
        }
      }
      .sum-btn {
        line-height: 1;
        border: 1px solid #d9cebf;
        padding: 10px 15px;
        font-size: 14px;
        border-radius: 4px;
        background-color: #ee5e7b;
        button {
          border: none;
          color: #fff;
          background-color: #ee5e7b;
        }
      }
    }
  }
}
</style>
