import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { reqLogin, reqChangeUserInfo, reqGetAllUserInfo, reqUserInfo, reqRegisterUser, reqForgotUser, reqBalanceUser } from '@/api/user'
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', () => {
  const router = useRouter()

  // 当前用户信息
  const userInfo = reactive({
    username: '',
    id: '',
    age: 0,
    ethnicGroup: '',
    balance: 0,
    liability: 0,
    password: '',
    paymentPassword: '',
    phone: '',
    sex: 0,
    email:'',
    wechat:''
  })

  // 所有用户的 uid 、 user_name和u_balance
  const allUser = reactive([])


  // 用户登录
  async function getUserLogin(data) {
    const res = await reqLogin(data)
    if (res.message === '登录成功') {
      localStorage.setItem('token', res.user.uid)
      router.push('/home')
      ElMessage({
        message: res.message,
        type: 'success',
      })
    } else if (res.message === '该手机号未进行注册') {
      ElMessage(res)
    } else {
      ElMessage({
        message: res.message,
        type: 'error',
      })
    }
  }

  // 获取用户信息
  async function getUserInfo(data) {
    const res = await reqUserInfo(data)
    if (res) {
      userInfo.username = res.userName
      userInfo.id = res.uid
      userInfo.age = res.uAge
      userInfo.ethnicGroup = res.uEthnicGroup
      userInfo.balance = res.uBalance
      userInfo.liability = res.uLiability
      userInfo.password = res.uAccountPassword
      userInfo.paymentPassword = res.uPaymentPassword
      userInfo.phone = res.uPhone
      userInfo.sex = res.uSex
      userInfo.email=res.email
      userInfo.wechat=res.wechat
    }
  }

  // 用户注册
  async function registerUser(data) {
    const res = await reqRegisterUser(data)
    if (res === '注册成功') {
      router.push('/login')
      ElMessage({
        message: res,
        type: 'success',
      })
    } else {
      router.push('/sign')
      ElMessage({
        message: res,
        type: 'error',
      })
    }
  }

  // 修改用户密码
  async function forgotUser(data) {
    const res = await reqForgotUser(data)
    if (res) {
      localStorage.clear()
      router.push('/login')
      ElMessage({
        message: '修改成功',
        type: 'success',
      })
    }
  }

  // 修改用户金额
  async function balanceUser(data) {
    await reqBalanceUser(data)
  }

  // 获取所有用户的 uid 和 user_name
  async function getAllUserInfo(id) {
    const res = await reqGetAllUserInfo(id)
    Object.assign(allUser, res)
  }

  // 修改用户信息
  async function changeUserInfo(data) {
    await reqChangeUserInfo(data)
  }

  return { userInfo, allUser, changeUserInfo, getUserLogin, getUserInfo, registerUser, forgotUser, balanceUser, getAllUserInfo }
})
