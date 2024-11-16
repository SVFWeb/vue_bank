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
                    <span>{{ userInfo.balance }}</span>
                  </div>
                </div>
                <div class="datail_item">
                  <div class="text">
                    <span>负债情况（元）</span>
                  </div>

                  <div class="number">
                    <span>{{ userInfo.liability }}</span>
                  </div>
                </div>
              </div>

              <div class="controls">
                <el-button @click="router.push('/serve/transfer')" plain>转账</el-button>
                <el-button @click="router.push('/serve/topfunds')" plain>充值</el-button>
                <el-button @click="router.push('/serve/withdraw')" plain>提现</el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="fund_flow">
          <div class="head">
            <span>资金流水</span>
          </div>

          <div class="flow_form">
            <el-table :data="newPaymentRecord" style="width: 100%" height="200">
              <el-table-column fixed prop="time" label="交易时间" width="200" />
              <el-table-column prop="user_name" label="用户账户" width="200" />
              <el-table-column prop="financial_type" label="财务类型" width="200" />
              <el-table-column prop="income_money" label="收支金额" width="200" />
              <el-table-column prop="compute_money" label="账户余额" width="200" />
              <el-table-column prop="remark" label="备注" width="200" />
            </el-table>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import router from '@/router';
import { useFlowStore } from '@/stores/useFlowStore';
import { useUserStore } from '@/stores/useUserStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const flowStore=useFlowStore()
const { userInfo } = storeToRefs(userStore)
const { newPaymentRecord } = storeToRefs(flowStore)



</script>

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
      margin-top: 20px;
      width: 100%;
      background-color: #ffffff;
      border-radius: 8px;

      .head {
        padding: 0 24px;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #f0f5f0;

        span {
          font-family: PingFangSC-Semibold;
          font-size: 18px;
        }
      }

      .flow_form {
        padding: 0 20px;
        margin-top: 20px
      }
    }
  }
}
</style>
