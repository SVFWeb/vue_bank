<script setup>
import { ref, onMounted} from 'vue';
import { storeToRefs } from 'pinia';
import { useLoanStore } from '@/stores/loan';

const loanStore = useLoanStore();
//对仓库进行解构
const {conList} = storeToRefs(loanStore)
//测试数据
onMounted(() =>{
    //获取合同列表
   loanStore.UserConList("1731423774183")
  
})

</script>

<template>
    <div class="loan_top">
        <div class="loan_main">
            <h1>我的贷款记录</h1>
            <!-- -->
            <div class="loan_one_log"  v-for="item,index in conList" :key="index" >
                <div class="loan_one_text">
                    <!-- <p>用户名：{{ item.cid }}</p> -->
                    <p class="DK_suss">贷款已完成:</p>
                    <p>
                        <!--  -->
                        <span>贷款时间：{{ item.cTime }}</span>
                    </p>
                    <p>
                        <span>贷款名称：科技贷</span>
                        <span class="line_sp">|</span>
                        <!--  -->
                        <span>贷款金额：<span style="color: orange;">￥{{item.cLoanAmount}}（元）</span></span>
                    </p>
                </div>
                <div class="loan_one_bd">

                </div>
            </div>
           
        </div>
    </div>
</template>

<style scoped lang="less">

.loan_main{
    width: 1200px;
    background-color: white;

    h1{
        width: 1200px;
        padding: 0 38px;
    }
    .loan_one_log{
        width: 1200px;
        padding: 20px 40PX;
        margin-bottom: 10px;
       
        .loan_one_text{
            width: 100%;
            border: 1px solid #eaeaea;
            padding: 25px 30px;

            .DK_suss{
                font-size: 18px;
                color: #83c44e;
            }
            .line_sp{
                margin: 0  10px;
                color: #eaeaea;
            }
        }
    }
}

</style>