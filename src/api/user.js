import request from "@/util/request"

//登录
export const reqLogin = (data) => request.post('/user/login', data)

//获取用户信息
export const reqUserInfo=(data)=>request.post('/user/userinfo',data)