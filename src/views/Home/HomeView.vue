<template>
  <div class="home">
    <div class="home_container">
      <div class="home_top">
        <div class="top">

          <el-avatar size="large" class="top_avatar" :icon="UserFilled" />

          <div class="top_info">
            <div class="info_usrname">
              <span>{{ userInfo?.username }}</span>
            </div>

            <div class="info_medal">
              <img src="../../../public/image/xinxiu.png" alt="" />
              <img src="../../../public/image/qixiebiaobing.png" alt="" />
            </div>

            <div class="info_vip">
              <div class="text">开通会员全站VIP福利满满，更有千元大奖等你拿</div>
              <div class="vip">开通会员</div>
            </div>
          </div>
        </div>

        <div class="bottom">
          <el-icon class="icon">
            <Coin />
          </el-icon>
          <span class="text">我的余额</span>
          <span class="num">{{ userInfo.balance }}</span>
          <div class="manage" @click="router.push('/wealth')">去管理</div>
        </div>
      </div>

      <div class="home_info">
        <div class="title">
          <span>基本信息</span>
        </div>

        <div class="form">
          <ul class="info_table">
            <li>用户昵称</li>
            <li>用户账户</li>
            <li>用户性别</li>
            <li>用户年龄</li>
            <li>用户民族</li>
          </ul>

          <ul class="info_text">
            <li> {{ userInfo?.username }} </li>
            <li>{{ userInfo.id }}</li>
            <li>{{ userInfo.sex === 1 ? '男' : '女' }}</li>
            <li>{{ userInfo.age }}</li>
            <li>{{ userInfo.ethnicGroup }}</li>
          </ul>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Coin, UserFilled } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/useUserStore';
import router from '@/router';

const store = useUserStore()
const { userInfo } = storeToRefs(store)

</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;

  .home_container {
    height: 100%;

    .home_top {
      margin-bottom: 10px;
      width: 1000px;
      height: 222px;

      .top {
        display: flex;
        padding: 24px 0 0 24px;
        height: 150px;
        background-color: #ffffff;
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.04);
        margin-bottom: 4px;

        .top_avatar {
          width: 92px;
          height: 92px;
          margin-right: 16px;
          border-radius: 50%;
          font-size: 50px;
          color: var(--el-color-primary);
          background-color: #f1f4f4fb;
        }

        .top_info {
          display: flex;
          justify-content: space-evenly;
          flex-direction: column;
          flex: 1;

          .info_usrname {
            color: #222226;
            font-weight: 500;
            font-size: 20px;
          }

          .info_medal {
            img {
              width: 30px;
              height: 30px;
              margin-right: 4px;
              vertical-align: middle;
            }
          }

          .info_vip {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 422px;
            height: 32px;
            background: linear-gradient(270deg, #f8c883, #fae8d0);
            border-radius: 16px;
            padding: 0 2px 0 8px;
            font-size: 14px;
            line-height: 32px;

            .vip {
              cursor: pointer;
              width: 74px;
              height: 28px;
              border-radius: 14px 14px 14px 13px;
              background: #fff;
              text-align: center;
              line-height: 28px;
            }
          }
        }
      }

      .bottom {
        display: flex;
        align-items: center;
        height: 48px;
        background: #fdfdfd;
        padding-left: 25px;
        font-size: 14px;

        .icon {
          margin-right: 5px;
          color: orange;
          font-size: 20px;
        }

        .text {
          color: #fc5531;
          margin-right: 8px;
        }

        .num {
          color: #222226;
          font-weight: 500;
          margin-right: 85px;
        }

        .manage {
          cursor: pointer;
          width: 72px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border-radius: 15px;
          font-size: 14px;
          color: #fff;
          background: #fc5531;
        }
      }
    }

    .home_info {
      padding-left: 16px;
      width: 1000px;
      height: calc(100% - 222px);
      box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.04);
      background-color: #ffffff;

      .title {
        height: 47px;
        font-size: 18px;
        font-weight: 600;
        color: #2e2e2e;
        line-height: 47px;
        border-bottom: 2px solid #f5f6f7;
      }

      .form {
        display: flex;
        padding-left: 15px;

        ul {
          margin-right: 40px;

          li {
            margin-top: 40px;
            color: #555666;
          }
        }
      }
    }
  }
}
</style>
