<template>
  <div class="forgot">
    <div class="forgot_container">
      <div class="forgot_form">
        <div class="top">
          <div @click="back" class="top_text">
            <el-icon>
              <ArrowLeftBold />
            </el-icon>
            <span>返回</span>
          </div>
        </div>
        <div class="title">{{ route.query.action ? '修改密码' : isNext ? '重置密码' : '忘记密码' }}</div>
        <div class="container">
          <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto" label-position="left">
            <template v-if="!isNext">
              <el-form-item prop="iphoneNumber" label="手机号：">
                <el-input v-model="form.iphoneNumber" :prefix-icon="Iphone" placeholder="请输入手机号"
                  size="large"></el-input>
              </el-form-item>
              <el-form-item prop="code" class="captcha_form_item" label="验证码：">
                <el-input v-model="form.code" :prefix-icon="Edit" placeholder="请输入验证码" size="large"></el-input>
                <div class="captcha">
                  <Captcha @get-captcha-text="getCaptchaText" />
                </div>
              </el-form-item>
              <el-form-item prop="iphoneCode" class="code_form_item" label="手机验证码：">
                <el-input v-model="form.iphoneCode" :prefix-icon="Notification" placeholder="请输入手机验证码"
                  size="large"></el-input>
                <div class="code">
                  <VerificationCode />
                </div>
              </el-form-item>
            </template>

            <template v-else>
              <el-form-item prop="password" label="密码：">
                <el-input show-password v-model="form.password" :prefix-icon="Lock" placeholder="请输入密码"
                  size="large"></el-input>
              </el-form-item>
              <el-form-item prop="anewPassword" label="确认密码：">
                <el-input show-password v-model="form.anewPassword" :prefix-icon="Refresh" placeholder="请重复输入密码"
                  size="large"></el-input>
              </el-form-item>
            </template>

            <el-form-item>
              <el-button v-if="!isNext" @click="nextForm"
                style="width: 100%; box-shadow: 0 3px 12px 0 rgba(39, 125, 255, 0.3)" type="primary">下一步</el-button>
              <el-button v-else @click="submitForm"
                style="width: 100%; box-shadow: 0 3px 12px 0 rgba(39, 125, 255, 0.3)" type="primary">确认修改</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="footer">
          <p>登录即表示同意平台 <span>《隐私政策》 </span> 和 <span>《用户协议》</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeftBold, Lock, Refresh, Iphone, Edit, Notification } from '@element-plus/icons-vue'
import Captcha from '@/components/Captcha.vue'
import VerificationCode from '@/components/VerificationCode.vue'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore'

const store = useUserStore()
const { forgotUser } = store
const router = useRouter()
const route = useRoute()
// 正确的验证码
let code = ref('')
// 当前表单对象
const ruleFormRef = ref()
// 是否进入了下一步
let isNext = ref(false)


const form = reactive({
  iphoneNumber: '',
  code: '',
  iphoneCode: '',
  password: '',
  anewPassword: '',
})

const rules = reactive({
  iphoneNumber: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入正确的验证码', trigger: 'blur' },
    { validator: validateCode, trigger: 'blur' },
  ],
  iphoneCode: [{ required: true, message: '请输入正确的手机验证码', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  anewPassword: [
    { required: true, message: '请重新确认密码', trigger: 'blur' },
    { validator: validateAnewPassword, trigger: 'blur' },
  ],
})

// 获取到验证码组件正确的验证码
function getCaptchaText(value) {
  code.value = value
}

// 验证码校验函数
function validateCode(rules, value, callback) {
  if (value !== code.value) {
    callback(new Error('验证码错误'))
  } else {
    callback()
  }
}

// 密码校验
function validateAnewPassword(rules, value, callback) {
  if (value !== form.password) {
    callback(new Error('密码不一致，请重新输入'))
  } else {
    callback()
  }
}

// 下一步
function nextForm() {
  ruleFormRef.value.validateField(['iphoneNumber', 'code', 'iphoneCode'], (valid) => {
    if (valid) {
      isNext.value = true
    }
  })
}

// 提交表单
function submitForm() {
  ruleFormRef.value.validateField(['password', 'anewPassword'], (valid) => {
    if (valid) {
      // 表单验证规则通过
      forgotUser({
        uPhone: form.iphoneNumber,
        uAccountPassword: form.password
      })
    }
  })
}

// 返回功能
function back() {
  if (isNext.value) {
    isNext.value = false
    // 重置表单信息
    form.iphoneNumber = ''
    form.code = ''
    form.iphoneCode = ''
    form.password = ''
    form.anewPassword = ''
  } else {
    router.go(-1)
  }
}
</script>

<style lang="less" scoped>
.forgot {
  height: 100vh;
  background-color: #f2f4f7;

  .forgot_container {
    max-width: 1280px;
    height: 100vh;
    margin: 0 auto;

    .forgot_form {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 540px;
      background: #ffffff;
      box-shadow: 0px 0px 20px 0px rgba(175, 187, 204, 0.2);
      border-radius: 16px;
      color: #a8a8b3;
      padding: 40px;

      .top {
        .top_text {
          width: 45px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
        }
      }

      .title {
        color: #181e33;
        font-size: 20px;
        margin: 25px 0 30px 30px;
      }

      .container {
        width: 400px;
        margin: 0 auto;

        .captcha_form_item {
          position: relative;

          .captcha {
            height: 38px;
            position: absolute;
            right: 0;
          }
        }

        .code_form_item {
          position: relative;

          .code {
            position: absolute;
            right: 0;
          }
        }
      }

      .footer {
        width: 100%;
        margin-top: 25px;
        text-align: center;
        font-size: 12px;

        span {
          color: #3a8bff;
        }
      }
    }
  }
}
</style>
