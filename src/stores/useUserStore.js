import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqRegisterUser } from '@/api/user'
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
  })

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

  return { userInfo, getUserLogin, getUserInfo, registerUser }
})
