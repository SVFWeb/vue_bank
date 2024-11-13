import request from "@/util/request"

//获取到用户的所有的合同列表
export function getUserConList(id){
    return request({
        url:`/users/findcon/${id}`,
        method:"get"
    })
}

//用户申请贷款
/**
 *   cid:nanoid.nanoid(),
    cName:
    cLoanAmount:
    cTime:
 */
export function userAddLoan(data){
    return request({
        url:`/users/addListone/${data.id}`,
        method:"post",
        data:{
            cName:data.contract,
            cLoanAmount:data.loanMoney,
            cTime:data.date
        }
    })
}