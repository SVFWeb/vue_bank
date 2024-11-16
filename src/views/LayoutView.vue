<template>
  <div class="layout">
    <div class="layout_container">
      <!-- 顶部 -->
      <div class="layout_tabber">
        <Tabber />
      </div>

      <!-- 菜单 -->
      <div class="layout_menu">
        <Menu />
      </div>

      <!-- 内容 -->
      <div class="layout_main">
        <RouterView />
      </div>

    </div>
  </div>
</template>

<script setup>
import Menu from '@/components/Menu.vue'
import Tabber from '@/components/Tabber.vue';
import { useFlowStore } from '@/stores/useFlowStore';
import { useUserStore } from '@/stores/useUserStore';
import { onMounted } from 'vue'

const flowStore = useFlowStore()
const useStore = useUserStore()
const { getUserInfo, getAllUserInfo } = useStore
const { getAllPaymentRecord } = flowStore

onMounted(async () => {
  await getUserInfo({ uid: localStorage.getItem('token') })

  await getAllUserInfo(localStorage.getItem('token'))

  await getAllPaymentRecord(localStorage.getItem('token'))

})


</script>

<style lang="less" scoped>
.layout {
  .layout_container {
    position: relative;
    width: 100%;
    height: 100vh;

    .layout_tabber {
      position: absolute;
      width: 100%;
      height: 80px;
      top: 0px;
    }

    .layout_menu {
      position: absolute;
      bottom: 0;
      width: 260px;
      height: calc(100vh - 80px);
    }

    .layout_main {
      padding: 20px;
      position: absolute;
      left: 260px;
      top: 80px;
      width: calc(100% - 260px);
      height: calc(100vh - 80px);
      background: #f0f1ef;
    }
  }
}
</style>
