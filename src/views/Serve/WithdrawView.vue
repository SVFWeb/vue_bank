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
                        <span>0.00</span>
                        元
                    </div>

                </div>

                <el-divider />

                <div class="withdraw_form">
                    <el-form>
                        <el-form-item label="选择银行卡：">
                            <ul class="withdraw_list">
                                <li :class="{ active: isActive === index }" v-for="(item, index) in 5" :key="index">
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
                        <el-form-item label="提现金额：">

                        </el-form-item>
                        <el-form-item label="支付密码：">

                        </el-form-item>

                        <el-form-item>

                        </el-form-item>
                    </el-form>
                </div>

            </div>
        </el-scrollbar>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const randomNumber = ref(Math.floor(Math.random() * (1000 - 99 + 1)) + 1000)
// 当前选择的银行卡
const isActive = ref(0)

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
            padding: 15px;
            width: 100%;
            height: 600px;

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