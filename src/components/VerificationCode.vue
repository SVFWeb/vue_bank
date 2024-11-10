<template>
  <div>
    <button @click="sendCode" :disabled="isCounting">
      {{ isCounting ? countdown + 's重新获取' : '获取验证码' }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const countdown = ref(60)
const isCounting = ref(false)
let timer = null

const sendCode = () => {
  if (isCounting.value) return // 如果正在倒计时，返回

  ElMessage({
    message: '成功获取验证码',
    type: 'success',
  })

  // 启动倒计时
  isCounting.value = true
  countdown.value = 30

  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      isCounting.value = false
    }
  }, 1000)
}

// 清理定时器
watch(isCounting, (newVal) => {
  if (!newVal && timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
