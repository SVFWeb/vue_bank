import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

//借款qpi
import { getUserConList, addContract ,updataAmount,delContract,userUpdateLiability} from "@/api/loan"
//借款仓库
export const useLoanStore = defineStore('loan', () => {
    //获取用户的所有合同
    let conList = ref([]);
    const UserConList = async (uid) => {
        let result = await getUserConList(uid)
       
        
        conList.value = result
    }
    //所有合同的借款金额总数
    const totleSum = computed(() =>{
        let sum = 0;
        for (let index = 0;index < conList.value.length; index++) {
            sum = sum + conList.value[index].cLoanAmount
        }
        return sum
    })
    //用户申请贷款
    const userAddLoandate = async (uid,data) => {
        let result = await addContract(uid,data);  
        if(result == 1){
            return Promise.resolve(200)
        }
        return Promise.reject(new Error("falie")) 
    }

    //修改用户某一条合同里面的金额
    const userUpdateConAmount = async (cid,cLoanAmount) =>{
        let result = await updataAmount(cid,cLoanAmount)
        if(result == 1){
            return Promise.resolve("1")
        }  
    }
    //删除某一条合同
    const userRemoveConract = async (cid) =>{
        let result = await delContract(cid);
      
          return Promise.resolve("1")
        
    }
    //修改用户负债
    const updateUserLiability = async (uid,uLiability) =>{

        let result = await userUpdateLiability(uid,uLiability)
        console.log("仓库数据",result);
        
        if(result == "负债更新成功"){
            return Promise.resolve("1")
        }
    }
    


    return {
        conList,
        UserConList,
        userAddLoandate,
        totleSum,
        userUpdateConAmount,
        userRemoveConract,
        updateUserLiability

    }
})
