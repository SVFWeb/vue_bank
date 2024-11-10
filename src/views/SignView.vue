<template>
  <div class="sign">
    <div class="sign_container">
      <div class="sign_form">
        <div class="top">
          <div @click="back" class="top_text">
            <el-icon><ArrowLeftBold /></el-icon>
            <span>返回</span>
          </div>
        </div>
        <div class="title">{{ !isNext ? '新用户注册' : '完善个人信息' }}</div>

        <div class="container">
          <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto" label-position="left">
            <template v-if="!isNext">
              <el-form-item prop="username" label="用户名：">
                <el-input v-model="form.username" :prefix-icon="UserFilled" placeholder="请输入用户名" size="large"></el-input>
              </el-form-item>
              <el-form-item prop="password" label="密码：">
                <el-input show-password v-model="form.password" :prefix-icon="Lock" placeholder="请输入密码" size="large"></el-input>
              </el-form-item>
              <el-form-item prop="anewPassword" label="确认密码：">
                <el-input show-password v-model="form.anewPassword" :prefix-icon="Refresh" placeholder="请重复输入密码" size="large"></el-input>
              </el-form-item>
              <el-form-item prop="iphoneNumber" label="手机号：">
                <el-input v-model="form.iphoneNumber" :prefix-icon="Iphone" placeholder="请输入手机号" size="large"></el-input>
              </el-form-item>
              <el-form-item prop="code" class="captcha_form_item" label="验证码：">
                <el-input v-model="form.code" :prefix-icon="Edit" placeholder="请输入验证码" size="large"></el-input>
                <div class="captcha"><Captcha @get-captcha-text="getCaptchaText" /></div>
              </el-form-item>
              <el-form-item prop="iphoneCode" class="code_form_item" label="手机验证码：">
                <el-input v-model="form.iphoneCode" :prefix-icon="Notification" placeholder="请输入手机验证码" size="large"></el-input>
                <div class="code"><VerificationCode /></div>
              </el-form-item>
            </template>

            <template v-else>
              <el-form-item prop="age" label="年龄">
                <el-input v-model="form.age" :prefix-icon="Watch" placeholder="请输入您的年龄" size="large"></el-input>
              </el-form-item>
              <el-form-item prop="nation" label="民族">
                <el-input v-model="form.nation" :prefix-icon="CollectionTag" placeholder="请输入民族" size="large"></el-input>
              </el-form-item>
              <el-form-item prop="gender" label="性别">
                <el-radio-group v-model="form.gender">
                  <el-radio value="male">男</el-radio>
                  <el-radio value="female">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="paymentPassword" label="支付密码">
                <el-input v-model="form.paymentPassword" :prefix-icon="Key" placeholder="请输入支付密码" size="large"></el-input>
              </el-form-item>
              <el-form-item prop="anewPaymentPassword" label="确认支付密码">
                <el-input v-model="form.anewPaymentPassword" :prefix-icon="Key" placeholder="请重复输入支付密码" size="large"></el-input>
              </el-form-item>
            </template>

            <el-form-item>
              <el-button
                v-if="!isNext"
                @click="nextForm(ruleFormRef)"
                style="width: 100%; box-shadow: 0 3px 12px 0 rgba(39, 125, 255, 0.3)"
                type="primary"
                >下一步</el-button
              >
              <el-button v-else @click="submitForm(ruleFormRef)" style="width: 100%; box-shadow: 0 3px 12px 0 rgba(39, 125, 255, 0.3)" type="primary"
                >注册用户</el-button
              >
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
import { ArrowLeftBold, UserFilled, Lock, Refresh, Iphone, Edit, Notification, CollectionTag, Watch, Key } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import Captcha from '@/components/Captcha.vue'
import VerificationCode from '@/components/VerificationCode.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// 正确的验证码
let code = ref('')
// 当前表单对象
const ruleFormRef = ref()
// 是否进入下一步
let isNext = ref(false)

const form = reactive({
  username: '',
  age: '',
  gender: '',
  // 民族
  nation: '',
  // 支付密码
  paymentPassword: '',
  // 确认支付密码
  anewPaymentPassword: '',
  // 账号密码
  password: '',
  // 确认账号密码
  anewPassword: '',
  iphoneNumber: '',
  code: '',
  iphoneCode: '',
})

const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  anewPassword: [
    { required: true, trigger: 'blur' },
    { validator: validateAnewPassword, trigger: 'blur' },
  ],
  iphoneNumber: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入正确的验证码', trigger: 'blur' },
    { validator: validateCode, trigger: 'blur' },
  ],
  iphoneCode: [{ required: true, message: '请输入正确的手机验证码', trigger: 'blur' }],
  age: [{ required: true, message: '年龄不能为空', trigger: 'blur' }],
  nation: [{ required: true, message: '民族不能为空', trigger: 'blur' }],
  gender: [{ required: true, trigger: 'change' }],
  paymentPassword: [{ required: true, message: '请输入支付密码', trigger: 'blur' }],
  anewPaymentPassword: [
    { required: true, trigger: 'blur' },
    { validator: validateAnewPaymentPassword, trigger: 'blur' },
  ],
})

function getCaptchaText(value) {
  code.value = value
}

// 密码校验
function validateAnewPassword(rules, value, callback) {
  if (value !== form.password) {
    callback(new Error('密码不一致，请重新输入'))
  } else {
    callback()
  }
}

// 支付密码校验
function validateAnewPaymentPassword(rules, value, callback) {
  if (value !== form.paymentPassword) {
    callback(new Error('支付密码不一致，请重新输入'))
  } else {
    callback()
  }
}

// 验证码校验函数
function validateCode(rules, value, callback) {
  if (value !== code.value) {
    callback(new Error('验证码错误'))
  } else {
    callback()
  }
}

// 下一步
function nextForm(formEl) {
  if (!formEl) return
  formEl.validateField(['username', 'password', 'anewPassword', 'iphoneNumber', 'code', 'iphoneCode'], (valid) => {
    if (valid) {
      isNext.value = true
    }
  })
}

// 提交表单
function submitForm(formEl) {
  if (!formEl) return
  formEl.validateField(['age', 'nation', 'gender', 'paymentPassword', 'anewPaymentPassword'], (valid) => {
    if (valid) {
      // 表单验证规则通过
      // 在此发起请求......

      router.push('/login')
      ElMessage({
        message: '注册成功',
        type: 'success',
      })
    }
  })
}

// 返回功能
function back() {
  if (isNext.value) {
    isNext.value = false
  } else {
    router.push('/login')
  }
}
</script>

<style lang="less" scoped>
.sign {
  height: 100vh;
  background-color: #f2f4f7;

  .sign_container {
    max-width: 1280px;
    height: 100vh;
    margin: 0 auto;

    .sign_form {
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
