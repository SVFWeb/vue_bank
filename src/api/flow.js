import request from "@/util/request"

// 添加支付记录
export const reqAddPaymentRecord=(data)=>request.post('/flow/add',data)

// 获取该用户支付的所有记录
export const reqUserPaymentRecord=(id)=>request.get(`/flow/${id}`)