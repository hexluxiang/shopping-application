<template>
  <div class="menuspage">
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
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.order_nav {
      display: flex;
      justify-content: space-around;
      //margin: 25px 0;
      .nav_item {
        padding: 22px;
      }
      .nav_item span {
        display: block;
        margin: 8px 5px;
      }
    }
</style>

