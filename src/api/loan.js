import request from "@/util/request"


//获取到用户的所有的合同列表
export function getUserConList(uid){
    return request({
        url:`/cont/finduid`,
        method:"post",
        data:{
            uid:uid
        }
    })

}
//更新余额
//String cid,  Integer cLoanAmount
//http://localhost:8080/cont/updateAmount?cid=1&cLoanAmount=4000
export function updataAmount(cid,cLoanAmount){
    return request({
        url:`/cont/updateAmount?cid=${cid}&cLoanAmount=${cLoanAmount}`,
        method:"post",
       
    })
} 

//添加合同
/**
 * 
 *{
    "uid":"1731423774183",
    "cid":"232",
    "cName":"个人贷",
    "cLoanAmount":"1235",
    "cTime":"2010-02-05 00:57:25"
}       
 */
export function addContract(uid,data){
    return request({
        url:"/cont/addcontract",
        method:"post",
        data:{
            uid:uid,//当前用户id
            cid: new Date().getTime(),
            cName:data.contract,
            cLoanAmount:data.loanMoney,
            cTime:data.date
        }
    })
}

//删除合同
export function delContract(cid){
    return request({
        url:"/cont/delonecid",
        method:"post",
        data:{
            cid:cid
        }
    })
}

//用户修改负债
///update/liability
export function userUpdateLiability(uid,uLiability){
    return request({
        url:"/user/update/liability",
        method:"PUT",
        data:{
            uid:uid,
            uLiability:uLiability
        }
    })
}

