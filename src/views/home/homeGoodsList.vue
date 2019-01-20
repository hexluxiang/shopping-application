<template>
  <div class="page">
    <div class="home-goodList">
      <div class="goods-item-inner" v-for="(item,index) in goodsList" :key="index">
        <div class="goods-item-img" @click="goodsDetail(item,true)">
          <img :src="item.thumb" alt="">
        </div>
        <div class="goods-item-info">
          <p class="goods-item-info_name">{{item.title}}</p>
          <p class="goods-item-info_price">{{item.sales_price}}</p>
        </div>
      </div>
    </div>
    <detail :show="show" :goods_info="goods" :total="goodsNum" :goods_Id="goodsId" @show-pop='coloseDetail'></detail>
  </div>
</template>

<script type="text/ecmascript-6">
import detail from "./goodsDetail";
export default {
  data() {
    return {
      show: false, //列表商品flag
      goods: {},
      goodsNum: {}, //商品出库入库数量
      goodsId: "" //商品id
    };
  },
  components: {
    detail
  },
  props: {
    goodsList: {
      type: [Object, Array],
      default() {
        return {};
      }
    }
  },
  methods: {
    goodsDetail(item, flag) {
      console.log(typeof item.goods_id);
      this.goodsId = item.goods_id;
      this.$apis.user
        .getShopDetail({
          goods_id: item.goods_id
        })
        .then(res => {
          //console.log(res);
          this.goods = res;
        });

      this.$apis.user
        .getGoodsNum({
          goods_id: item.goods_id
        })
        .then(res => {
          //console.log(res);
          this.goodsNum = res;
          //console.log(this.goodsNum);
        });
      this.show = flag;
    },
    coloseDetail(flag) {
      this.show = flag;
      //this.shopFlag = flag;
    }
  }
};
</script>

<style scoped lang="scss">
.home-goodList {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
</style>

