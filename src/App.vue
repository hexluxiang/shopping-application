<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='scss'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50;
  margin-top: 60px; */
}
* {
            margin: 0;
            padding: 0;
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
</style>
