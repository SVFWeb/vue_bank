<template>
  <div class="fund">
    <el-scrollbar>
      <div class="fund_container">
        <div class="fund_view">
          <div class="title">
            <span>资金总览</span>
          </div>

          <div class="card_container">
            <div class="card">
              <div class="header">
                <span>钱包</span>
              </div>

              <div class="detail_list">
                <div class="datail_item">
                  <div class="text">
                    <span>可用余额（元）</span>
                  </div>

                  <div class="number">
                    <span>0.00</span>
                  </div>
                </div>
                <div class="datail_item">
                  <div class="text">
                    <span>负债情况（元）</span>
                  </div>

                  <div class="number">
                    <span>0.00</span>
                  </div>
                </div>
              </div>

              <div class="controls">
                <el-button  plain>转账</el-button>
                <el-button plain>充值</el-button>
                <el-button plain>提现</el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="fund_flow"></div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.fund {
  width: 100%;
  height: 100%;

  .fund_container {
    .fund_view {
      width: 100%;
      height: 409px;
      background-color: #ffffff;
      border-radius: 8px;

      .title {
        padding: 0 24px;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #f0f5f0;
        span {
          font-family: PingFangSC-Semibold;
          font-size: 18px;
        }
      }

      .card_container {
        padding: 24px;
        .card {
          width: calc(50% - 8px);
          padding: 0 20px 20px;
          background-color: #f3f7fe;
          border-radius: 8px;
          .header {
            font-size: 18px;
            height: 57px;
            line-height: 57px;
            border-bottom: 1px solid hsla(0, 0%, 80%, 0.3);
          }

          .detail_list {
            margin-top: 80px;
            display: flex;
            justify-content: space-between;
            .datail_item {
              width: calc(33.33333% - 10px);
              height: 100px;
              .text {
                color: hsla(0, 0%, 40%, 0.5);
                font-size: 12px;
              }
              .number {
                color: #1677ff;
                font-family: AlipayNumber-Regular;
                font-size: 24px;
                font-weight: 700;
              }
            }
          }
        }
      }
    }

    .fund_flow {
      // width: 100%;
      // height: 409px;
      // background-color: pink;
    }
  }
}
</style>
