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
            <el-table :data="tableData" style="width: 100%" height="250">
              <el-table-column fixed prop="date" label="交易时间" width="250" />
              <el-table-column prop="name" label="用户账户" width="300" />
              <el-table-column prop="zip" label="财务类型" width="220" />
              <el-table-column prop="state" label="收支金额" width="220" />
              <el-table-column prop="city" label="账户余额" width="220" />
            </el-table>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import router from '@/router';
import { useUserStore } from '@/stores/useUserStore';
import { storeToRefs } from 'pinia';

const store = useUserStore()
const { userInfo } = storeToRefs(store)
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
]
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
