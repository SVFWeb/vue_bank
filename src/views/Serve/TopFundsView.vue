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

            <div class="topfunds_tabs">
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
                        <div class="btn">
                            <el-button type="primary">下一步</el-button>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="充值码" name="topCode">

                    </el-tab-pane>

                </el-tabs>
            </div>

        </div>
    </div>
</template>

<script setup>
import { SuccessFilled } from '@element-plus/icons-vue'

import { ref } from 'vue';
const activeName = ref('bankCard')
const radio1 = ref('1')

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