import request from "@/util/request"

//登录
export const reqLogin = (data) => request.post('/user/login', data)

//获取用户信息
export const reqUserInfo = (data) => request.post('/user/userinfo', data)

// 用户注册
export const reqRegisterUser = (data) => request.post('/user/register', data)

// 修改用户密码
export const reqForgotUser = (data) => request.post('/user/update/password', data)