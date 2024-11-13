<template>
    <div class="topfunds">
        <div class="topfunds_container">

            <div class="topfunds_balance">
                <div class="left">
                    <div class="icon">
                        <el-icon>
                            <SuccessFilled />
                        </el-icon>
                    </div>
                    <div class="text">
                        充值到
                        <span>余额</span>
                    </div>
                </div>
                <div class="right">
                    <span>0.00</span>
                    元
                </div>
            </div>

            <el-divider style="margin: 0;" />

            <div v-loading="loading" class="topfunds_tabs">
                <el-tabs v-model="activeName" style="border: none;" type="border-card">
                    <el-tab-pane label="储蓄卡" name="bankCard">
                        <div class="topfunds_bank_card">
                            <el-radio-group v-model="radio1">
                                <el-radio value="1" size="large">
                                    <div class="image image1">
                                        <span>**6666</span>
                                    </div>
                                </el-radio>
                                <el-radio value="2" size="large">
                                    <div class="image image2">
                                        <span>**5650</span>
                                    </div>
                                </el-radio>
                                <el-radio value="3" size="large">
                                    <div class="image image3">
                                        <span>**3455</span>
                                    </div>
                                </el-radio>
                                <el-radio value="4" size="large">
                                    <div class="image image4">
                                        <span>**9234</span>
                                    </div>
                                </el-radio>
                                <el-radio value="5" size="large">
                                    <div class="image image5">
                                        <span>**4524</span>
                                    </div>
                                </el-radio>
                                <el-radio value="6" size="large">
                                    <div class="image image1">
                                        <span>**6232</span>
                                    </div>
                                </el-radio>
                                <el-radio value="7" size="large">
                                    <div class="image image2">
                                        <span>**5454</span>
                                    </div>
                                </el-radio>
                            </el-radio-group>
                        </div>
                        <el-divider />
                        <div class="form">
                            <el-form :model="form" label-width="auto" style="max-width: 200px" :rules="rules"
                                ref="ruleFormRef">
                                <el-form-item prop="funds" label="充值金额：">
                                    <el-input v-model="form.funds" />
                                </el-form-item>
                                <el-form-item prop="password" label="支付密码：">
                                    <el-input v-model="form.password" />
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="btn">
                            <el-button type="primary" @click="submitForm(ruleFormRef)">确认充值</el-button>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>

        <el-dialog v-model="dialogVisible" title="请确认充值" width="500" :before-close="handleClose">
            <span>充值余额为：{{ form.funds }} 元</span>

            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="againTopFunds">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>

<script setup>
import { SuccessFilled } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';

const activeName = ref('bankCard')
const radio1 = ref('1')
const dialogVisible = ref(false)
const ruleFormRef = ref()
// 加载
const loading = ref(false)

const form = reactive({
    funds: '',
    password: ''
})

const rules = reactive({
    funds: [{ required: true, message: '请输入正确的金额', trigger: 'change' },],
    password: [{ required: true, message: '支付密码不能为空', trigger: 'change' },]
})

const handleClose = (done) => {
    ElMessageBox.confirm('确定放弃充值余额吗？')
        .then(() => {
            done()
        })
}

// 表单校验
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            dialogVisible.value = true
        }
    })
}

//再次确认充值
function againTopFunds() {
    dialogVisible.value = false
    // 请求接口
    loading.value = true
    setTimeout(() => {
        loading.value = false
    }, 2000)
    //显示充值成功的提示
}


</script>

<style lang="less" scoped>
.topfunds {
    width: 100%;
    height: 100%;

    .topfunds_container {
        margin: 0 auto;
        width: 950px;
        height: 500px;
        background-color: #ffffff;
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.04);

        .topfunds_balance {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            width: 470px;
            height: 70px;

            .left {
                display: flex;
                line-height: 70px;

                .icon {
                    margin-right: 10px;
                    font-size: 30px;
                    color: green;
                }

                .text {
                    font-size: 14px;

                    span {
                        font-weight: 700;
                    }
                }
            }

            .right {
                font-size: 14px;

                span {
                    font-weight: bold;
                    color: #598e00;
                }
            }
        }

        .topfunds_tabs {
            .topfunds_bank_card {
                padding: 20px 25px 0 15px;
                width: 100%;
                height: 200px;
                background-color: #f4f6fd;

                .image {
                    position: relative;
                    width: 190px;
                    height: 36px;
                    background-repeat: no-repeat;
                    background-color: #ffffff;
                    border: 1px solid #ddd;

                    span {
                        position: absolute;
                        top: 10px;
                        right: 25px;
                        font-size: 11px;
                        color: black;
                    }

                    &:hover {
                        border-color: #fa3
                    }

                }

                .image1 {
                    background-image: url('../../../public/image/TopFunds/10001.png');
                }

                .image2 {
                    background-image: url('../../../public/image/TopFunds/10002.png');
                }

                .image3 {
                    background-image: url('../../../public/image/TopFunds/10003.png');
                }

                .image4 {
                    background-image: url('../../../public/image/TopFunds/10004.png');
                }

                .image5 {
                    background-image: url('../../../public/image/TopFunds/10005.png');
                }


            }
        }


    }
}
</style>