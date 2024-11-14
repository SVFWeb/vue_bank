<template>
  <div class="login">
    <div class="login_container">

      <div class="login_title">
        <div class="logo">
          <img src="../../public/image/logo.png" alt="" />
        </div>
        <el-divider class="divider" direction="vertical" />
        <div class="text">
          <span>个人网上银行</span>
        </div>
      </div>

      <div class="login_banner">
        <img src="../../public/image/banner.png" alt="" />

        <div class="form">
          <div class="title">
            <span>用户名登录</span>
          </div>
          <el-divider class="divider" />

          <div class="container">
            <!-- 登录表单 -->
            <el-form :model="form" :rules="rules" ref="ruleFormRef">
              <el-form-item prop="username">
                <el-input size="large" placeholder="请输入手机号" v-model="form.username" :prefix-icon="User" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input size="large" show-password placeholder="请输入登录密码" v-model="form.password"
                  :prefix-icon="Lock" />
              </el-form-item>
              <el-form-item prop="code" class="captcha_form_item">
                <el-input size="large" placeholder="验证码" v-model="form.code" :prefix-icon="Edit" />
                <!-- 验证码 -->
                <div class="captcha">
                  <Captcha @get-captcha-text="getCaptchaText" />
                </div>
              </el-form-item>
              <el-form-item>
                <el-button style="width: 100%" @click="submitForm(ruleFormRef)" type="primary">登录</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="bottom_text">
            <span @click="router.push('/sign')">账号注册</span>
            <el-divider direction="vertical" />
            <span @click="router.push('/forgot')">忘记密码</span>
          </div>
        </div>
      </div>

      <div class="login_serve">
        <div class="title">
          <div class="left"><img src="../../public/image/leftspot.jpg" alt="" /></div>
          <span>服务中心</span>
          <div class="right"><img src="../../public/image/rightspot.jpg" alt="" /></div>
        </div>
        <div class="serve_list">
          <div class="item">
            <div class="item_image item_1"></div>
            <div class="item_text">证书下载</div>
          </div>
          <div class="item">
            <div class="item_image item_2"></div>
            <div class="item_text">如何开通网银</div>
          </div>
          <div class="item">
            <div class="item_image item_3"></div>
            <div class="item_text">K宝首次登录</div>
          </div>
          <div class="item">
            <div class="item_image item_4"></div>
            <div class="item_text">K令首次登录</div>
          </div>
          <div class="item">
            <div class="item_image item_5"></div>
            <div class="item_text">常见问题</div>
          </div>
        </div>
      </div>

      <div class="login_warn">
        <div class="warn_top_list">
          <div class="item">网站声明</div>
          <div class="item_line"></div>
          <div class="item">网站地图</div>
          <div class="item_line"></div>
          <div class="item">联系我们</div>
          <div class="item_line"></div>
          <div class="item">客服热线：<span>95599</span></div>
        </div>
        <div class="warn_bottom_list">
          <div class="item">中国农业银行版权所有</div>
          <div class="item_line"></div>
          <div class="item">京ICP备05049539</div>
        </div>
      </div>

      <div class="footer"></div>
    </div>
  </div>
</template>

<script setup>
import Captcha from '@/components/Captcha.vue'
import { User, Lock, Edit } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';

import { useUserStore } from '@/stores/useUserStore';

// 正确的验证码
let code = ref('')
// 当前表单对象
const ruleFormRef = ref()
const router = useRouter()

//用户仓库
const store = useUserStore()


const form = reactive({
  username: '15222222222',
  password: 'nbnb1234',
  code: '',
})

const rules = reactive({
  username: [{ required: true, message: '请输入正确手机号', trigger: 'change' }],
  password: [{ required: true, message: '登录密码不能为空', trigger: 'change' }],
  code: [{ required: true, message: '请输入正确的验证码', trigger: 'change' }, { validator: validateCode, trigger: 'change' }],
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


// 提交表单
async function submitForm(formEl) {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      // 表单验证规则通过
      store.getUserLogin({
        uPhone: form.username,
        uAccountPassword: form.password
      })
    }
  })
}
</script>

<style lang="less" scoped>
.login {

  .login_container {
    max-width: 1280px;
    margin: 0 auto;

    .login_title {
      display: flex;
      align-items: center;
      width: 922px;
      height: 81px;

      .logo {
        width: 198px;
        height: 40px;
      }

      .divider {
        height: 28px;
        margin: 0 20px;
      }

      .text {
        span {
          font-size: 19px;
          color: #595959;
        }
      }
    }

    .login_banner {
      height: 420px;

      img {
        height: 420px;
        position: absolute;
        left: -1px;
      }

      .form {
        padding: 0 30px;
        position: absolute;
        top: 130px;
        right: 280px;
        width: 321px;
        height: 363px;
        background: #fdfdfd;
        border-radius: 5px;

        .title {
          margin-top: 16px;
          width: 100%;
          height: 30px;
          text-align: center;
          font-weight: 700;
          font-size: 16px;
        }

        .divider {
          margin: 0;
        }

        .container {
          margin-top: 30px;

          .captcha_form_item {
            position: relative;

            .captcha {
              height: 38px;
              position: absolute;
              right: 0;
            }
          }
        }

        .bottom_text {
          span {
            color: #0b7bc2;
            font-size: 12px;
            cursor: pointer;
          }
        }
      }
    }

    .login_serve {
      overflow: hidden;
      width: 100%;
      height: 300px;
      border-bottom: 1px solid #e8e8e8;

      .title {
        margin-top: 55px;
        margin-bottom: 25px;
        display: flex;
        justify-content: center;

        span {
          font-size: 24px;
          margin: 0 75px;
        }
      }

      .serve_list {
        display: flex;
        justify-content: space-around;

        .item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .item_image {
            margin-bottom: 20px;
            width: 64px;
            height: 64px;
            background: url('../../public/image/integration.png');
          }

          .item_1 {
            background-position: -18px 1039px;
          }

          .item_2 {
            background-position: -121px 1039px;
          }

          .item_3 {
            background-position: -326px 1039px;
          }

          .item_4 {
            background-position: -428px 1039px;
          }

          .item_5 {
            background-position: -531px 1039px;
          }
        }
      }
    }

    .login_warn {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 40px;
      width: 100%;

      .warn_top_list {
        display: flex;
        margin-bottom: 20px;

        .item {
          font-size: 12px;

          &:last-child {
            span {
              color: #ffa900;
            }
          }
        }

        .item_line {
          margin: 0 22px;
          width: 1px;
          height: 13px;
          border-left: 1px solid #333;
        }
      }

      .warn_bottom_list {
        display: flex;

        .item {
          font-size: 12px;

          &:last-child {
            color: #ffa900;
          }
        }

        .item_line {
          margin: 0 22px;
          width: 1px;
          height: 13px;
          border-left: 1px solid #333;
        }
      }
    }

    .footer {
      width: 100%;
      height: 30px;
    }
  }
}
</style>
