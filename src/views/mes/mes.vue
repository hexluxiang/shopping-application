<template>
  <div class="mespage">
    <div class="mes-header">
      <h1 class="mes-title">消息</h1>
    </div>
    <div class="order-notice">
      <div class="notice-cells">
        <div class="cells-group">
          <div class="icon-notice">
            <i class="gc-iconnotification" style="color: pink;font-size: 14px;"></i>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      firsName: "hlx"
    };
  },
  components: {},
  watch: {
    firsName:function(newN,old) {
      console.log(newN,old);
    }
  }
};
</script>

<style scoped lang="scss">
.mes-header {
  background: #ffffff;
  border-bottom: 1px solid #e6e6e6;
  .mes-title {
    margin: 0 88px;
    height: 40px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
  }
}
.notice-cells {
  margin-top: 10px;
  .cells-group {
    padding: 8px 15px;
    display: flex;
    align-items: center;
  }
}
</style>
