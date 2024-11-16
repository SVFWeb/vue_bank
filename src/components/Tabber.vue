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
            <el-dropdown-item @click="router.push('/home')">基本信息</el-dropdown-item>
            <el-dropdown-item @click="outLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="text">
        <span style="margin-right: 10px;">{{ name }}</span>
        <span>欢迎您！</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore';
import { Avatar } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore()
const { userInfo } = storeToRefs(store)
const { getUserInfo } = store

const name = computed(() => {
  let name = userInfo.value.username.slice(0, 1)
  let gender = userInfo.value.sex === 1 ? '先生' : '女士'
  return name + gender
})

// 退出登录
async function outLogin() {
  localStorage.removeItem('token')
  router.push('/login')
  ElMessage({
    message: '退出登录成功',
    type: 'success',
  })
}

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
