<template>
    <div class="withdraw">
        <el-scrollbar>
            <div class="withdraw_container">

                <div class="withdraw_head">

                    <div class="title">
                        <h2>提取余额到银行卡</h2>
                    </div>

                    <div class="balance">
                        余额：
                        <span>{{ userInfo.balance }}</span>
                        元
                    </div>

                </div>

                <el-divider />

                <div v-loading="loading" class="withdraw_form">
                    <el-form :model="form" label-width="auto" style="max-width: 300px" :rules="rules" ref="ruleFormRef">
                        <el-form-item label="选择银行卡：">
                            <ul class="withdraw_list">
                                <li @click="isActive = index" :class="{ active: isActive === index }"
                                    v-for="(item, index) in 5" :key="index">

                                    <div class="right">
                                        <img :src="`../../../public/image/TopFunds/1000${index + 1}.png`" alt="" />
                                        <span>尾号：{{ randomNumber * (index + 1) }}</span>
                                    </div>

                                    <div class="left">
                                        <span>单笔50000.00元，单日…</span>
                                    </div>

                                </li>
                            </ul>
                        </el-form-item>
                        <el-form-item prop="funds" label="提现金额：">
                            <el-input v-model="form.funds"/>
                        </el-form-item>
                        <el-form-item prop="password" label="支付密码：">
                            <el-input show-password v-model="form.password" />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm(ruleFormRef)">确认提现</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-dialog v-model="dialogVisible" title="请确认提现" width="500" :before-close="handleClose">
                    <span>提现余额为：{{ form.funds }} 元</span>

                    <template #footer>
                        <div class="dialog-footer">
                            <el-button type="primary" @click="againWithdraw">
                                确认
                            </el-button>
                        </div>
                    </template>
                </el-dialog>

            </div>
        </el-scrollbar>
    </div>
</template>

<script setup>
import { useFlowStore } from '@/stores/useFlowStore';
import { useUserStore } from '@/stores/useUserStore';
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia';
import { ref, reactive } from 'vue';

const userStore = useUserStore()
const flowStore = useFlowStore()
const { userInfo } = storeToRefs(userStore)
const { balanceUser, getUserInfo } = userStore
const { addPaymentRecord, getAllPaymentRecord } = flowStore
const randomNumber = ref(Math.floor(Math.random() * (1000 - 99 + 1)) + 1000)
// 当前选择的银行卡
const isActive = ref(0)
const ruleFormRef = ref()
const dialogVisible = ref(false)
// 加载
const loading = ref(false)

const form = reactive({
    funds: '',
    password: ''
})

const rules = reactive({
    funds: [{ required: true, message: '请输入正确的金额', trigger: 'change' },],
    password: [
        { required: true, message: '支付密码不能为空', trigger: 'change' },
        { validator: validatePassword, trigger: 'change' }
    ]
})

// 表单校验
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            dialogVisible.value = true
        }
    })
}

const handleClose = (done) => {
    ElMessageBox.confirm('确定放弃提现余额吗？')
        .then(() => {
            done()
        })
}

// 支付密码校验
function validatePassword(rules, value, callback) {
    if (value != userInfo.value.paymentPassword) {
        callback(new Error('支付密码错误'))
    } else {
        callback()
    }
}

async function againWithdraw() {
    dialogVisible.value = false
    loading.value = true

    if (form.funds > userInfo.value.balance) {
        ElMessage({
            message: '余额不足',
            type: 'error',
        })
        loading.value = false
    } else {

        await balanceUser({
            uid: userInfo.value.id,
            uBalance: '-' + form.funds
        })

        await getUserInfo({ uid: userInfo.value.id })

        await addPaymentRecord({
            time: Date.now(),
            id: userInfo.value.id,
            user_name: userInfo.value.username,
            financial_type: "提现",
            income_money: '-' + form.funds,
            // 要先更新用户数据，才能拿到计算后的金额
            compute_money: userInfo.value.balance,
            remark: ""
        })

        await getAllPaymentRecord(localStorage.getItem('token'))


        setTimeout(() => {
            // 消息提示
            ElMessage({
                message: '已成功提现到银行卡上',
                type: 'success',
            })
            loading.value = false
        }, 500)
    }
    ruleFormRef.value.resetFields()
}

</script>

<style lang="less" scoped>
.withdraw {
    width: 100%;
    height: 100%;

    .withdraw_container {
        margin: 0 auto;
        width: 988px;
        background: #ffffff;
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.04);

        .withdraw_head {
            display: flex;
            padding: 15px 30px;
            width: 928px;
            height: 29px;

            .title {
                margin-right: 40px;

                h2 {
                    color: #4d4d4d;
                    font: 700 18px / 28px \5FAE\8F6F\96C5\9ED1;
                }

            }

            .balance {
                font-size: 12px;

                span {
                    font-size: 20px;
                    font-family: Tahoma;
                    color: #fc491e;
                    padding-right: 3px;
                }
            }
        }

        .withdraw_form {
            padding: 15px 15px 15px 100px;
            width: 100%;
            height: 100%;

            .withdraw_list {

                li {
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    padding: 7px 7px 7px 0px;
                    width: 731px;
                    border: 1px solid #ececec;
                    border-radius: 3px 3px;
                    cursor: pointer;

                    .right {
                        margin-left: -90px;
                        display: flex;
                        align-items: center;

                        span {
                            margin-left: 20px;
                        }
                    }

                    .left {
                        color: #9a9a9a;
                        font-size: 12px;
                    }
                }

                .active {
                    border-color: #90c1dc;
                }
            }
        }

    }
}
</style>