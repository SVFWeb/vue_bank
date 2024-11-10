<template>
  <div class="tabber_container">
    <div class="logo">
      <img src="../../public/image/logo.png" alt="" />
    </div>

    <div class="info">
      <el-dropdown>
        <div class="picture">
          <el-icon>
            <Avatar />
          </el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="text">
        <span>张先生</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Avatar } from '@element-plus/icons-vue'
</script>

<style lang="less" scoped>
.tabber_container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    width: 198px;
    height: 40px;
    margin-left: 50px;
  }

  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 80px;

    .picture {
      margin-right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      cursor: pointer;
      color: var(--el-color-primary);
    }

    .text {
      font-size: 14px;
    }
  }
}
</style>
