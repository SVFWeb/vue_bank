//用户api
import request from "@/util/request"

export function getUser(){
    return request({
        url:"/getUserList",
        method:"get"
    })
}