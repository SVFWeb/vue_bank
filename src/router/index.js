import { createRouter, createWebHistory } from 'vue-router'

// ----账户管理
// 个人信息
import HomeView from '@/views/Home/HomeView.vue'
// 账号设置
import SettingsView from '@/views/Home/SettingsView.vue'
// 我的财富
import WealthView from '@/views/Home/FundView.vue'

// ----资金服务
// 充值
import TopFundsView from '@/views/Serve/TopFundsView.vue'
// 提现
import WithdrawView from '@/views/Serve/WithdrawView.vue'
// 转账
import TransferView from '@/views/Serve/TransferView.vue'

// ----贷款
import LoanView from '@/views/Loan/LoanView.vue'
import ApplyLoanView from '@/views/Loan/ApplyLoanView.vue'
import LoanLog from '@/views/Loan/LoanLog.vue'


// 登录
import LoginView from '@/views/LoginView.vue'
// 注册
import SignView from '@/views/SignView.vue'
// 忘记密码
import ForgotView from '@/views/ForgotView.vue'
// 布局
import LayoutView from '@/views/LayoutView.vue'






const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 账户管理
    {
      path: '/',
      redirect: '/home',
      name: 'layout',
      component: LayoutView,
      children: [
        // 个人信息
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        //账号设置
        {
          path: '/settings',
          name: 'settings',
          component: SettingsView
        },
        // 我的财富
        {
          path: 'wealth',
          name: 'wealth',
          component: WealthView
        }
      ]
    },
    // 资金服务
    {
      path:'/serve',
      redirect:'',
      component:LayoutView,
      children:[
        {
          //充值
          path:'/serve/topfunds',
          name:'topfunds',
          component:TopFundsView,
        },
        {
          // 提现
          path:'/serve/withdraw',
          name:'withdraw',
          component:WithdrawView
        },
        {
          // 转账
          path:'/serve/transfer',
          name:'transfer',
          component:TransferView
        }
      ]
    },
    // 贷款
    {
      path: '/loan',
      redirect: '/loan/myloan',
      name: 'loan',
      component: LayoutView,
      children: [
        // 我的贷款
        {
          path: '/loan/myloan',
          name: 'myloan',
          component: LoanView
        },
        {
          path: "/loan/applyloan",
          name: "applyloan",
          component: ApplyLoanView
        },
        {
          path: "/loan/loanlog",
          name: "loanlog",
          component: LoanLog
        },

      ]
    },



    // 登录
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    // 注册
    {
      path: '/sign',
      name: 'sign',
      component: SignView
    },
    // 忘记密码
    {
      path: '/forgot',
      name: 'forgot',
      component: ForgotView
    }
  ]
})

export default router
