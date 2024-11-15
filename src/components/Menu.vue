<template>
  <div class="menu_container">
    <el-scrollbar>
      <el-row class="tac">
        <el-col>
          <el-menu router :default-active="route.path" :default-openeds="['1', '2', '3']" class="el-menu-vertical-demo">
            <el-sub-menu :index="'1'">
              <template #title>
                <el-icon>
                  <Histogram/>
                </el-icon>
                <span>账户管理</span>
              </template>

              <el-menu-item-group>
                <el-menu-item index="/home">个人信息</el-menu-item>
                <el-menu-item index="/settings">账号设置</el-menu-item>
                <el-menu-item index="/wealth">资金查询</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu :index="'2'">
              <template #title>
                <el-icon>
                  <TrendCharts />
                </el-icon>
                <span>资金服务</span>
              </template>

              <el-menu-item-group>
                <el-menu-item index="/serve/topfunds">充值</el-menu-item>
                <el-menu-item index="/serve/withdraw">提现</el-menu-item>
                <el-menu-item index="/serve/transfer">转账</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu :index="'3'">
              <template #title>
                <el-icon>
                  <Grid />
                </el-icon>
                <span>贷款</span>
              </template>

              <el-menu-item-group>
                <el-menu-item index="/loan/applyloan">申请贷款</el-menu-item>
                <el-menu-item index="/loan/myloan">我的贷款</el-menu-item>

                <el-menu-item index="/loan/loanlog">贷款日志</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>


          </el-menu>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script setup>
import {  Histogram ,TrendCharts,Grid} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  width: 100%;
  height: calc(100vh - 80px);
}
</style>
