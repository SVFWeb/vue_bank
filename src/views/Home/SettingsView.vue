<template>
  <div class="settings">
    <div class="settings_container">
      <div class="evaluation_risk">
        <div class="mark">80</div>

        <div class="tab">
          <span>中风险</span>
        </div>

        <div class="text">
          <span>为了更好的保障您账号的安全，请您继续完善：绑定安全邮箱/设置密码/QQ微信</span>
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
              <p>15218786403</p>
              <p class="controls">修改手机</p>
            </div>
          </div>
          <div class="setting_item">
            <div class="title">
              <span>邮</span>
              <span>箱</span>
            </div>

            <div class="right">
              <p>存在风险，请绑定邮箱</p>
              <p class="controls">绑定邮箱</p>
            </div>
          </div>
          <div class="setting_item">
            <div class="title">
              <span>三方账号</span>
            </div>

            <div class="right">
              <p>存在风险，请绑定QQ微信</p>
              <p class="controls">绑定QQ</p>
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
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function changePassword() {
  router.push({ name: 'forgot', query: { action: '修改密码' } })
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
