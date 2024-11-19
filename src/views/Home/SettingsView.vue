<template>
  <div class="settings">
    <div v-loading="false" class="settings_container">
      <div class="evaluation_risk">
        <div class="mark">{{ mark }}</div>

        <div class="tab">
          <span>{{ mark == 100 ? '低风险' : '中风险' }}</span>
        </div>

        <div class="text">
          <span>为了更好的保障您账号的安全，请您继续完善个人信息</span>
        </div>
      </div>

      <div class="account_setting">
        <div class="title">账号设置</div>

        <div class="setting_list">
          <div class="setting_item">
            <div class="title">
              <span>密</span>
              <span>码</span>
            </div>

            <div class="right">
              <p>如有需求，可修改密码</p>
              <p class="controls" @click="changePassword">修改密码</p>
            </div>
          </div>

          <div class="setting_item">
            <div class="title">
              <span>手</span>
              <span>机</span>
            </div>

            <div class="right">
              <p>{{ userInfo.phone }}</p>
              <p class="controls">修改手机</p>
            </div>
          </div>
          <div class="setting_item">
            <div class="title">
              <span>邮</span>
              <span>箱</span>
            </div>

            <div class="right">
              <p>{{ userInfo.email == undefined ? '存在风险，请绑定邮箱' : userInfo.email }}</p>
              <p class="controls" @click="changeDialog('绑定或修改邮箱', 1)">{{ userInfo.email == undefined ? '绑定邮箱' : '修改邮箱'
                }}</p>
            </div>
          </div>
          <div class="setting_item">
            <div class="title">
              <span>三方账号</span>
            </div>

            <div class="right">
              <p>{{ userInfo.wechat == undefined ? '存在风险，请绑定微信' : userInfo.wechat }}</p>
              <p class="controls" @click="changeDialog('绑定或修改微信', 2)">{{ userInfo.wechat == undefined ? '绑定微信' : '修改微信'
                }}</p>
            </div>
          </div>
          <div class="setting_item">
            <div class="title">
              <span>登录记录</span>
            </div>

            <div class="right">
              <p>登录记录存在风险，请查看记录</p>
              <p class="controls">查看记录</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="提示" width="500">
      <p>{{ text }}</p>
      <span></span>
      <el-input v-model="input1" style="width: 240px" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false; input1 = ''">取消</el-button>
          <el-button type="primary" @click="OnceMore">
            确认修改
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore()
const { changeUserInfo, getUserInfo } = store
const { userInfo } = storeToRefs(store)
const dialogVisible = ref(false)
const input1 = ref()
const text = ref()
const num = ref()


const mark = computed(() => {
  let value = Object.values(userInfo.value)
  let res = value.filter(item => item == undefined)
  return 100 - res.length * 10
})

function changePassword() {
  router.push({ name: 'forgot', query: { action: '修改密码' } })
}

function changeDialog(value1, value2) {
  text.value = value1
  num.value = value2
  dialogVisible.value = true
}

async function OnceMore() {
  switch (num.value) {
    case 1:
      await changeUserInfo({ uid: userInfo.value.id, email: input1.value })
      break
    case 2:
      await changeUserInfo({ uid: userInfo.value.id, wechat: input1.value })
      break
  }
  dialogVisible.value = false
  ElMessage({
    message: '成功绑定',
    type: 'success',
  })
  await getUserInfo({ uid: userInfo.value.id })
  input1.value = ''
}

</script>

<style lang="less" scoped>
.settings {
  height: 100%;

  .settings_container {
    height: 100%;

    .evaluation_risk {
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding-top: 24px;
      width: 1000px;
      height: 184px;
      margin-bottom: 10px;
      background-image: url('../../../public/image/settingsRisk.png');

      .mark {
        text-align: center;
        width: 83px;
        height: 100px;
        line-height: 100px;
        background-size: cover;
        color: #fff;
        font-size: 40px;
        background-image: url('../../../public/image/settingRiskMark.png');
      }

      .tab {
        line-height: 20px;
        text-align: center;
        min-width: 35px;
        height: 20px;
        padding: 0 8px;
        background: #fc1944;
        border-radius: 12px;
        color: #fff;
      }

      .text {
        height: 24px;
        line-height: 24px;
      }
    }

    .account_setting {
      padding: 35px 20px 0 15px;
      width: 1000px;
      height: calc(100% - 194px);
      background-color: #ffffff;

      .title {
        font-size: 18px;
        font-weight: 600;
        color: #2e2e2e;
      }

      .setting_list {
        .setting_item {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          width: 100%;
          padding: 32px 0 16px 15px;
          border-bottom: 1px solid #f0f5f0;

          .title {
            display: flex;
            justify-content: space-between;
            width: 56px;
            height: 24px;
            font-size: 14px;
            font-weight: normal;
          }

          .right {
            display: flex;

            .controls {
              cursor: pointer;
              display: inline-block;
              min-width: 56px;
              margin-left: 32px;
              color: #1989fa;
            }
          }
        }
      }
    }
  }
}
</style>
