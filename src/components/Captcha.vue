<template>
  <div class="captcha">
    <div class="captcha_container">
      <canvas class="canvas" @click="foo" ref="captchaCanvas" width="80" height="38"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const emit= defineEmits(['getCaptchaText'])

// 当前的验证码值
const captchaText = ref('')
const captchaCanvas = ref(null)

const generateCaptcha = () => {
  const ctx = captchaCanvas.value.getContext('2d')
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  captchaText.value = ''

  // 生成随机字符
  for (let i = 0; i < 4; i++) {
    captchaText.value += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  // 绘制验证码
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, captchaCanvas.value.width, captchaCanvas.value.height)
  ctx.font = '20px Arial'
  ctx.fillStyle = '#000'
  ctx.fillText(captchaText.value, 10, 25)

  // 添加干扰线
  ctx.strokeStyle = '#aaa'
  for (let i = 0; i < 5; i++) {
    ctx.beginPath()
    ctx.moveTo(Math.random() * captchaCanvas.value.width, Math.random() * captchaCanvas.value.height)
    ctx.lineTo(Math.random() * captchaCanvas.value.width, Math.random() * captchaCanvas.value.height)
    ctx.stroke()
  }

  // 向父组件传递当前的‘验证码’
  emit('getCaptchaText',captchaText.value)
}

const foo = () => {
  generateCaptcha()
}

onMounted(() => {
  generateCaptcha()
})
</script>

<style scoped></style>
