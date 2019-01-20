<template>
  <div class="homepage">
    <van-nav-bar class="home-head" fixed left-text="返回" @click-left="selectCity" @click-right="search">
      <div slot="left" class="gc-city">
        <i>福州</i>
        <i class="gc-iconunfold"></i>
      </div>
      <div slot="title" class="gc-title" :style="{backgroundImage:`url(${titleImgLink})`}">
        <span>敢潮</span>
        <i>好货</i>
      </div>
      <div slot="right" class="gc-icon-size" style="font-size: 24px;">
        <i class="gc-iconsearch"></i>
        <i class="gc-iconscan"></i>
      </div>
    </van-nav-bar>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index" :autoplay="1000">
        <img class="vanImg" :v-lazy="image.img" :src='image.img' />
      </van-swipe-item>
    </van-swipe>
    <div class="roll-mess">
      <i class="gc-iconnotification"></i>
      <marquee direction="up" scrolldelay="700">
        <span>有事通知xxxxxxxxxxxxxxxxxxxxeee</span>
        <span>促销促销促销促销促销促销促销促销促销</span>
        <span>123123131231321321321231</span>
      </marquee>
    </div>
    <div class="gc-nav">
      <div class="content">
        <div class="item" v-for="(item,index) in navImg" :key="index">
          <img :src="item.url" alt="">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="gc-home">
      <div class="myBusiness">
        <div class="i-my">
          <p>
            <span>
              我的
              <i>商圈</i>
            </span>
            <span>您收藏过的商圈</span>
          </p>
        </div>
        <div class="i-all">
          <span>全部商圈</span>
          <i class="gc-iconright"></i>
        </div>
      </div>
      <div class="home-items">
        <div class="item" v-for="(item,index) in area" :key="index">
          <img :src="item.cover" alt="">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="gc-home-wrapper">
      <div class="home-banner">
        <div class="banner-content" style="height:100px" v-for="(item,index) in this.homeInfos.banner" :key="index">
          <img :src="item.img" alt="">
        </div>
      </div>
      <!-- <div class="home-goodList">
        <div class="goods-item-inner" v-for="(item,index) in this.homeInfos.goods" :key="index">
          <div class="goods-item-img" @click="goodsDetail(item,true)">
            <img :src="item.thumb" alt="">
          </div>
          <div class="goods-item-info">
            <p class="goods-item-info_name">{{item.title}}</p>
            <p class="goods-item-info_price">{{item.sales_price}}</p>
          </div>
        </div>
      </div> -->
      <homeGoodsList :goodsList="this.homeInfos.goods"></homeGoodsList>
    </div>
    <div class="gc-home-shop">
      <div class="gc-cell">
        <div class="gc-cell-title">
          <span>旺铺
            <i class="gc-pink">推荐</i>
          </span>
          <p>为您定制的专业资源</p>
        </div>
      </div>
      <div class="home-shop-item">
        <div class="shop-item" v-for="(item,index) in this.homeInfos.shop" :key="index" @click="goToShop(item,true)">
          <div class="item-top">
            <img :src="item.logo" alt="" class="item-logo">
            <div class="item-info">
              <div class="shop-name">{{item.name}}</div>
              <div class="info-label">
                <span>
                  <i class="gc-icontimefill"></i>1年</span>
                <span>
                  <i class="gc-icontimefill"></i>身份认证</span>
                <span>
                  <i class="gc-icontimefill"></i>工商认证</span>
              </div>
            </div>
            <button class="shop-btn">进店</button>
          </div>
          <div class="item-content">
            <div class="item-li" v-for="(val,index) in item.goods" :key="index">
              <div class="item-img" v-if="val.thumb"><img :src="val.thumb" alt=""></div>
              <div class="item-price">{{val.sales_price}}</div>
            </div>
          </div>
          <div class="item-bottom">
            <div class="item-addr">
              <i class="gc-iconlocationfill"></i>
              <div class="addr">{{item.addr}}</div>
            </div>
            <div class="item-watch">
              <i class="gc-iconattention"></i>
              <span>{{item.views}}人</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <detail :show="show" :goods_info="goods" :total="goodsNum" :goods_Id="goodsId" @show-pop='coloseDetail'></detail> -->
     <shopDetail :shopFlag="shopFlag" :shopItem="shopItem" @show-pop='coloseDetail'></shopDetail>
     <!-- 1.点击店铺进入
          2.返回则回到home
          3.在店铺里点击商品进入详情   
      -->
  </div>
  </div>
</template>

<script>
import { titleImgLink, navImgLink } from "./imgLink.js";
import detail from "./goodsDetail";
import shopDetail from "./shopDetail";
import homeGoodsList from "./homeGoodsList"

export default {
  data() {
    return {
      homeInfos: {},
      images: [],
      area: [],
      //goods: {},
      navImg: [
        {
          url: navImgLink,
          name: "商品"
        },
        {
          url: "http://wx.xiahe.me/img/wh.91531b1.png",
          name: "新品"
        },
        {
          url: "http://wx.xiahe.me/img/hot.548875d.png",
          name: "爆款"
        },
        {
          url: "http://wx.xiahe.me/img/product.5f63101.png",
          name: "尾货"
        }
      ],
      titleImgLink,
      //show: false,//列表商品flag
      shopFlag:false,//店铺flag
      //goodsNum: {}, //商品出库入库数量
      //goodsId: "" ,//商品id
      shopItem:{},//店铺商品
      hx:0
    };
  },
  components: {
    detail,
    shopDetail,
    homeGoodsList
  },
  methods: {
    async get() {
      let res = await this.$apis.user.getHomeInfo({
        cid: 350100
      });
      this.homeInfos = res;
      console.log(this.homeInfos); //首页所有请求内容
      this.images = this.homeInfos.slider;
      this.area = this.homeInfos.area;
      // this.banner = this.homeInfos.banner
      // console.log(this.banner)
    },
    selectCity() {
      console.log("city");
      console.log(this.$data);
      console.log(vm.setnum());
    },
    search() {
      console.log("scan");
    },
    coloseDetail(flag) {
      //this.show = flag;
      this.shopFlag = flag;
    },
    goToShop(item,flag){
      console.log(12345)
        this.shopFlag = flag;
        this.shopItem = item;
        console.log('=======================');
        console.log(this.shopItem);
        console.log('=======================');        
    }
  },
  created() {
    this.get();
  },
  computed:{
    getnum:function(){
      return this.hx *10;
    },
    setnum:{
     get:function (val) {
       return this.hx*100
     },
     set:function(val) {
      this.hx = 0.1 
     }
    }
  }
};
</script>

<style lang="scss" scoped>
$color1: white;
$color2: black;
$width: 100%;
$borderBOTM: 1px solid silver;

.homepage {
  .home-head {
    width: $width;
    background: $color1;
    color: $color1;

    span {
      color: #ee5e7b;
      padding-right: 5px;
      font-size: 18px;
      line-height: 25px;
    }
  }

  .gc-city {
    height: 26px;
    line-height: 26px;
    padding: 0 10px;
    background: #e6e6e6;
    color: #4d4d4d;
    border-radius: 12px;
    margin-bottom: 10px;
  }

  .gc-title {
    background: no-repeat;
    background-position: right center;
    background-size: auto 25px;
    width: 100px;
    margin-left: 28%;
  }

  .gc-icon-size {
    font-size: 32px;
    color: #555;
  }

  .vanImg {
    width: 100%;
    height: 240px;
  }

  .roll-mess {
    display: flex;
    padding: 5px 15px;
    border-bottom: $borderBOTM;

    i {
      color: #ee5e7b;
      font-size: 18px;
    }

    marquee {
      height: 30px;

      span {
        display: block;
        font-size: 20px;
        line-height: 20px;
        padding: 10px 0;
        overflow: hidden;
        white-space: nowrap;
        margin-left: 25px;
      }
    }
  }

  .gc-nav {
    padding: 15px 0;
    background: $color1;
    border-bottom: $borderBOTM;

    .content {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .item {
        img {
          width: 45px;
          height: 45px;
        }

        span {
          display: block;
        }
      }
    }
  }

  .gc-home {
    width: 100%;
    overflow: hidden;
    margin-top: 10px;
    border-bottom: $borderBOTM;

    .myBusiness {
      display: flex;
      padding: 8px 15px;
      font-size: 15px;
      border-bottom: $borderBOTM;

      .i-my {
        flex: 1;

        p {
          float: left;

          span {
            i {
              color: #ee5e7b;
            }
          }
        }
      }
    }

    .home-items {
      display: flex;
      width: 100%;
      align-items: center;
      padding: 8px 10px;

      .item {
        width: 30%;
        margin-right: 2%;
        height: auto;
        min-height: 105px;
        text-align: center;

        img {
          position: relative;
          border: 1px solid #e5e5e5;
          width: 100%;
          min-height: 105px;
          overflow: hidden;
          border-radius: 10px;
        }

        span {
          text-align: center;
          height: 30px;
          line-height: 30px;
          color: #666;
          font-size: 14px;
        }
      }
    }
  }

  .gc-home-wrapper {
    margin-top: 10px;
    margin-bottom: 40px;

    .home-banner {
      .banner-content {
        height: 100px;
        width: 100%;
        overflow: visible;
        margin-bottom: 10px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .home-goodList {
      .goods-item-inner {
        display: inline-block;
        width: 50%;
        padding-right: 5px;
        box-sizing: border-box;

        .goods-item-img {
          width: 100%;
          height: 175px;
          overflow: hidden;

          img {
            width: 100%;
          }
        }

        .goods-item-info {
          padding: 10px;
          font-size: 14px;
          color: #333;
          text-align: left;

          .goods-item-info_name {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          .goods-item-info_price {
            color: #ee5e7b;
            font-size: 18px;
          }
        }
      }
    }
  }
  .gc-home-shop {
    border-top: 1px solid #d5d1cf;
    background-color: #efefef;
    .gc-cell {
      padding: 0px 15px;
      background: #fff;
      height: 40px;
      border-bottom: 1px solid #d5d1cf;
      .gc-cell-title {
        text-align: left;
        padding-top: 15px;
        font-size: 15px;
        i {
          color: #ee5e7b;
        }
        p {
          color: #999;
          font-size: 12px;
          display: inline-block;
          padding-left: 10px;
        }
      }
    }
    .home-shop-item {
      margin-bottom: 40px;
      .shop-item {
        border-bottom: 1px solid #d5d1cf;
        background-color: #fff;
        padding: 15px;
        margin-top: 10px;
        .item-top {
          display: flex;
          align-items: center;
          .item-logo {
            width: 50px;
            height: 50px;
            border-radius: 100%;
            margin-right: 10px;
          }
          .item-info {
            flex: 1;
            .shop-name {
              font-size: 16px;
              text-align: left;
              line-height: 1.5;
            }
            .info-label {
              text-align: left;
              span {
                font-size: 12px;
                display: inline-block;
                color: #999;
                margin-right: 8px;
                i {
                  color: #87c6d4;
                }
              }
            }
          }
          .shop-btn {
            padding: 7px 9px;
            font-size: 12px;
            border-radius: 4px;
            background: #fff;
            border: 1px solid;
            color: #2373cf;
          }
        }
        .item-content {
          display: flex;
          margin-top: 15px;
          .item-li {
            position: relative;
            margin-right: 10px;
            border-radius: 10px;
            overflow: hidden;
            .item-img {
              background-repeat: no-repeat;
              background-position: 50%;
              background-size: cover;
              width: 100%;
              height: 100%;
              img {
                width: 103px;
              }
            }
            .item-price {
              position: absolute;
              bottom: 0;
              width: 100%;
              padding: 0 5px;
              font-weight: 300;
              background: rgba(0, 0, 0, 0.7);
              height: 30px;
              line-height: 30px;
              color: #fff;
              font-size: 14px;
            }
          }
        }
        .item-bottom {
          text-align: left;
          i {
            color: #87c6d4;
            font-size: 18px;
          }
          .item-addr {
            margin: 10px 0;
            position: relative;
            color: #666;
            display: flex;
            .addr {
              font-size: 14px;
              line-height: 1.5;
              padding: 0 15px;
            }
          }
          .item-watch {
            span {
              color: #999;
              display: inline-block;
              vertical-align: top;
              font-size: 14px;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }
}
</style>
