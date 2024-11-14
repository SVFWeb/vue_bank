import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  
  // 当前用户信息
  const userInfo = ref()

  // 用户登录
  async function getUserLogin(data) {
    const res = await reqLogin(data)
    if (res) {
      localStorage.setItem('token', res.uid)
      router.push('/home')

      ElMessage({
        message: '成功登录',
        type: 'success',
      })
    }else{
      console.log('登录失败');
    }
  }

  // 获取用户信息
  async function getUserInfo(data){
    const res=await reqUserInfo(data)
    userInfo.value=res  
  }


  return { userInfo, getUserLogin,getUserInfo }
})
