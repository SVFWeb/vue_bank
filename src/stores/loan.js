import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

//借款qpi
import { getUserConList, userAddLoan } from "@/api/loan"
//借款仓库
export const useLoanStore = defineStore('loan', () => {

    //获取用户的所有合同
    let conList = ref([]);
    const UserConList = async (id) => {
        let result = await getUserConList(id)
        if (result.code == 200) {
            conList.value = result.data[0].uContract
            return Promise.resolve("200")
        }
        return Promise.reject(new Error("falie"))
    }

    //用户申请贷款
    const userAddLoandate = async (data) => {

        let result = await userAddLoan(data);
        if (result.code == 200) {
            console.log("仓库的请求数据", result);
            return Promise.resolve("200")
        }
        return Promise.reject(new Error("falie"))
    }


    return {
        conList,
        UserConList,
        userAddLoandate

    }
})
