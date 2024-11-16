import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

//借款qpi
import { getUserConList, addContract } from "@/api/loan"
//借款仓库
export const useLoanStore = defineStore('loan', () => {

    //获取用户的所有合同
    let conList = ref([]);
    const UserConList = async (uid) => {
        let result = await getUserConList(uid)
        
        
        conList.value = result
        

    }

    //用户申请贷款
    const userAddLoandate = async (uid,data) => {

        let result = await addContract(uid,data);
        if(result == 1){
            return Promise.resolve(200)
        }
        return Promise.reject(new Error("falie"))
       
       
    }


    return {
        conList,
        UserConList,
        userAddLoandate

    }
})
