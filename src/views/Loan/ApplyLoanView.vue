<script setup>
import { reactive, ref, useTemplateRef } from 'vue';

//借款仓库
import { useLoanStore } from '@/stores/loan';
//仓库实例
const loanStore = useLoanStore();
//弹出消息提示
import { ElMessage } from 'element-plus'


const Propsform = reactive({

    dialogFormVisible: false,//控制弹出层
    isShow: false, //隐私政策弹出层
    form: { //表单数据
        id: "u1",
        contract: "",
        name: "",
        region: "",
        loanMoney: "", //借款金额
        phone: "", //用户电话
        date: "", //时间戳
    },
    chenk: false,//单选框
    user_index: '1',// 1用户协议 2 隐私政策
})
//表单规则
const rules = reactive({
    name: [
        { required: true, message: '用户名必填的', trigger: 'blur' },
        { min: 2, max: 5, message: '用户名应在2-5个字符', trigger: 'blur' },
    ],
    loanMoney: [
        { required: true, message: '金额必填的', trigger: 'blur' },
        { min: 4, max: 5, message: '不得少于1千', trigger: 'blur' },
    ],
    date: [
        { required: true, message: '时间必填的', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '电话必填的', trigger: 'blur' },
        { min: 11, max: 11, message: '不得少于11位', trigger: 'blur' },
    ],
    region: [
        { required: true, message: '地址必填的', trigger: 'blur' },
    ],

})

//弹出层关闭
const handleClose = (done) => {
    done()
}
//表单实例
const form1 = ref();
//点击申请按钮后回调
const subim_form = async () => {



    //表单规则校验 、、form1.value.validate 返回一个布尔值
    const result = await form1.value.validate(value => { })
    //所有的表单符合规则之后为true并且勾选了用户协议之后就提交请求 
    if (result && Propsform.chenk) {
        //将表单中的数据包装对象携带发送请求
        console.log("表单数据", Propsform.form);

        Propsform.dialogFormVisible = false
        //发送请求
        /*  loanStore.userAddLoandate(Propsform.form).then(re =>{
     
             if (re =="200") {
             
             return    ElMessage({
                     message:"申请成功了",
                     type:"success"
                 })
             }
             return  ElMessage({
                     message:"申请成功了",
                     type:"success"
             })
         }) */

        //数据为空
        Propsform.form.name = "";
        Propsform.form.contract = "";
        Propsform.form.date = "";
        Propsform.form.loanMoney = "";
        Propsform.form.phone = "";
        Propsform.chenk = false
        Propsform.form.region = ""




    }


}

</script>

<template>
    <el-scrollbar>
        <div class="top">
            <div class="main_top">
                <!-- 头部列表 -->
                <div class="main_top_list">

                    <div class="main_top_list_item">

                        <div class="item_img">
                            <img src="../../../public/image/D-1.png" alt="">
                        </div>

                        <div class="list_item_right">
                            <P>品类全</P>
                            <p>百家合作机构,方案选择多</p>
                        </div>
                    </div>
                    <div class="main_top_list_item">

                        <div class="item_img">
                            <img src="../../../public/image/D-2.png" alt="">
                        </div>

                        <div class="list_item_right">
                            <P>门槛低</P>
                            <p>资料简单,据资质宽松适配</p>
                        </div>
                    </div>
                    <div class="main_top_list_item">

                        <div class="item_img">
                            <img src="../../../public/image/D-1.png" alt="">
                        </div>

                        <div class="list_item_right">
                            <P>品质优</P>
                            <p>10年信誉品牌,服务专业优质</p>
                        </div>
                    </div>
                    <div class="main_top_list_item">

                        <div class="item_img">
                            <img src="../../../public/image/D-4.png" alt="">
                        </div>

                        <div class="list_item_right">
                            <P>流程快</P>
                            <p>4步申请,轻松放款</p>
                        </div>
                    </div>

                </div>
                <div class="main_item" @click="Propsform.dialogFormVisible = true">
                    <div class="main_item_top">
                        个人贷
                    </div>
                    <div class="main_item_banner">
                        大额资金首选，条件限制宽松，通过率高，利息低
                    </div>
                    <div class="main_item_center">
                        主要形式：
                        <span>个人信息</span>|
                        <span>个人</span>
                    </div>
                    <hr>
                    <div class="main_item_butt">
                        <div class="main_item_butt_text">
                            <p class="text_col">1~2万</p>
                            <p class="butt_text_fon">可贷额度</p>
                        </div>
                        <div class="main_item_butt_text">
                            <p>3%~16.8%</p>
                            <p class="butt_text_fon">年化利率</p>
                        </div>
                        <div class="main_item_butt_text">
                            <p>1~20年</p>
                            <p class="butt_text_fon">还款期限</p>
                        </div>
                    </div>
                </div>
                <div class="main_item" @click="Propsform.dialogFormVisible = true">
                    <div class="main_item_top">
                        微捷贷
                    </div>
                    <div class="main_item_banner">
                        大额资金首选，条件限制宽松，通过率高，利息低
                    </div>
                    <div class="main_item_center">
                        主要形式：
                        <span>征信</span>|
                        <span>信息</span>
                    </div>
                    <hr>
                    <div class="main_item_butt">
                        <div class="main_item_butt_text">
                            <p class="text_col">2~3万</p>
                            <p class="butt_text_fon">可贷额度</p>
                        </div>
                        <div class="main_item_butt_text">
                            <p>3.5</p>
                            <p class="butt_text_fon">年化利率</p>
                        </div>
                        <div class="main_item_butt_text">
                            <p>1~20年</p>
                            <p class="butt_text_fon">还款期限</p>
                        </div>
                    </div>
                </div>
                <div class="main_item" @click="Propsform.dialogFormVisible = true">
                    <div class="main_item_top">
                        闪信贷
                    </div>
                    <div class="main_item_banner">
                        大额资金首选，条件限制宽松，通过率高，利息低
                    </div>
                    <div class="main_item_center">
                        主要形式：
                        <span>经营</span>|
                        <span>发票</span>
                    </div>
                    <hr>
                    <div class="main_item_butt">
                        <div class="main_item_butt_text">
                            <p class="text_col">3~4万</p>
                            <p class="butt_text_fon">可贷额度</p>
                        </div>
                        <div class="main_item_butt_text">
                            <p>3%~16.8%</p>
                            <p class="butt_text_fon">年化利率</p>
                        </div>
                        <div class="main_item_butt_text">
                            <p>1~20年</p>
                            <p class="butt_text_fon">还款期限</p>
                        </div>
                    </div>
                </div>
                <div class="main_item" @click="Propsform.dialogFormVisible = true">
                    <div class="main_item_top">
                        科技贷
                    </div>
                    <div class="main_item_banner">
                        大额资金首选，条件限制宽松，通过率高，利息低
                    </div>
                    <div class="main_item_center">
                        主要形式：
                        <span>融资</span>|
                        <span>技术</span>
                    </div>
                    <hr>
                    <div class="main_item_butt">
                        <div class="main_item_butt_text">
                            <p class="text_col">4~5万</p>
                            <p class="butt_text_fon">可贷额度</p>
                        </div>
                        <div class="main_item_butt_text">
                            <p>3%~16.8%</p>
                            <p class="butt_text_fon">年化利率</p>
                        </div>
                        <div class="main_item_butt_text">
                            <p>1~20年</p>
                            <p class="butt_text_fon">还款期限</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 申请贷款的弹出层 -->
            <el-dialog v-model="Propsform.dialogFormVisible" title="申请贷款" width="400" :before-close="handleClose"
                :center="true">
                <el-form :model="Propsform.form" :rules="rules" ref="form1" :validate="subim_form">
                    <div class="main_form_item">
                        <el-form-item prop="contract">
                            <el-select v-model="Propsform.form.contract" placeholder="贷款名称">
                                <el-option label="个人贷" value="个人贷" />
                                <el-option label="微捷贷" value="微捷贷" />
                                <el-option label="闪信贷" value="闪信贷" />
                                <el-option label="科技贷" value="科技贷" />

                            </el-select>
                        </el-form-item>
                        <el-form-item prop="name">
                            <el-input v-model="Propsform.form.name" placeholder="请输入姓名" />
                        </el-form-item>
                        <el-form-item prop="loanMoney">
                            <el-input v-model="Propsform.form.loanMoney" autocomplete="off" placeholder="请输入借款金额（元）" />
                        </el-form-item>
                        <el-form-item prop="phone">
                            <el-input v-model="Propsform.form.phone" autocomplete="off" placeholder="请输入您的电话" />
                        </el-form-item>
                        <el-form-item prop="date">
                            <el-date-picker style="width: 100%;" v-model="Propsform.form.date" type="datetime"
                                placeholder="Select date and time" format="YYYY/MM/DD hh:mm:ss"
                                value-format="YYYY-MM-DD h:mm:ss" />
                        </el-form-item>

                        <el-form-item prop="region">
                            <el-select v-model="Propsform.form.region" placeholder="城市名">
                                <el-option label="南宁" value="南宁" />
                                <el-option label="钦州" value="钦州" />
                                <el-option label="桂林" value="桂林" />
                                <el-option label="北海" value="北海" />
                                <el-option label="柳州" value="柳州" />
                                <el-option label="贵港" value="贵港" />
                                <el-option label="其他城市" value="其他城市" />
                            </el-select>
                        </el-form-item>
                        <div class="xieyi">
                            <el-checkbox v-model="Propsform.chenk"></el-checkbox>
                            <p>
                                同意之后选中<a class="xie_butt" href="JavaScript:;"
                                    @click="Propsform.user_index = '1'; Propsform.isShow = true">《用户协议》</a>
                                与<a class="xie_butt" href="javaScript:;"
                                    @click="Propsform.user_index = '2'; Propsform.isShow = true">《隐私政策》</a>
                            </p>
                        </div>
                        <el-button @click="subim_form" class="form_button" type="primary">提交申请</el-button>
                    </div>
                </el-form>

            </el-dialog>

            <!-- 用户协议和隐私政策 弹出层 -->
            <el-dialog v-model="Propsform.isShow" width="864" :before-close="handleClose" :center="true">
                <div class="user">
                    <div class="user_xieyi" v-if="Propsform.user_index == '1'">
                        <h2>用户协议</h2>
                        同意用户协议表示本网站会对你的个人信息进行收集
                    </div>

                    <div class="user_yinsi" v-if="Propsform.user_index == '2'">
                        <h2>隐私政策</h2>
                        <img src="../../../public/image/yinsi.png" alt="">
                    </div>
                </div>


            </el-dialog>

        </div>
    </el-scrollbar>


</template>

<style lang="less" scoped>
.main_top {
    width: 1200px;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 0 auto;

    .main_top_list {
        width: 1176px;

        display: flex;
        justify-content: space-around;
        background-color: white;
        margin-bottom: 40px;
        padding: 30px 0;

        .main_top_list_item {

            width: 280px;
            height: 52px;
            display: flex;
            justify-content: space-around;
            flex-wrap: nowrap;
            flex: .4;
            margin-left: 10px;

            .list_item_right {
                p {
                    width: 200px;
                }

            }

            & .list_item_right p:nth-child(1) {
                font-size: 18px;
                font-weight: bold;
            }

            & .list_item_right p:nth-child(4) {}
        }


    }

    .main_item {
        width: 580px;
        height: 250px;
        background-color: white;
        padding: 50px 30px 0 30px;

        text-align: center;
        position: relative;
        margin-bottom: 40px;

        .main_item_top {
            position: absolute;
            left: 240px;
            top: 6px;
            font-size: 18px;
        }

        hr {
            margin: 30px 0 18px 0;
        }

        .main_item_banner {
            color: #666;
            font-size: 18px;
        }

        .main_item_center {
            font-size: 14px;
            margin-top: 40px;
            color: #999;

            span {
                display: inline-block;
                padding: 0 15px;
                color: #00c06f;
            }
        }

        .main_item_butt {
            display: flex;
            justify-content: space-between;

            .main_item_butt_text {
                width: 175px;

                p {
                    font-weight: bold;
                }

                .text_col {
                    color: orange;
                }

                .butt_text_fon {
                    font-size: 14px;
                    color: #999;
                    font-weight: normal;
                }

            }

        }

    }
}

.user_xieyi,
.user_yinsi {
    text-align: center;
    margin-bottom: 20px;
}
</style>