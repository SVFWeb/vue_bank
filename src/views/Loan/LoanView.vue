<script setup>
import { onMounted, onUpdated, reactive, ref, computed, nextTick } from "vue";
import { useLoanStore } from "@/stores/loan";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/useUserStore";
import { RouterLink } from "vue-router";
import { useFlowStore } from "@/stores/useFlowStore";

const userStore = useUserStore();
const loanStore = useLoanStore();
const flowStore = useFlowStore()
const { getAllPaymentRecord, addPaymentRecord } = flowStore
const { conList, totleSum } = storeToRefs(loanStore);
const { userInfo } = storeToRefs(userStore)

let PropsObj = reactive({
  IsShow: false,
  dialogVisible: false,
  checked1: 0, //申请提前还款的收集数组
  input: "", //申请提前还款的收集字段
  Zindex: "2", //控制 2为点击 1为联系方式
  ZDindex: "1", //控制贷款提醒文本
  DK_DK_show: "0",
  total: 0, //总的借款
  data: [], //循环的input数据存放
});
//合同测试数据
onMounted(() => {
  //获取用户合同数据

  loanStore.UserConList(localStorage.getItem("token"));
  //数据挂载之后
});

//提交还款
const subimhander = async (item, index) => {

  if (typeof PropsObj.data[index] != "number") {
    return ElMessage({
      type: "error",
      message: "只能为整数",
    });
  }

  if (PropsObj.data[index] > item.cLoanAmount) {
    return ElMessage({
      type: "error",
      message: "不能大于还款金额",
    });
  }

  // 金额进行修改
  await loanStore.userUpdateConAmount(item.cid, PropsObj.data[index])
  //修改负债
  await loanStore.updateUserLiability(item.uid, "-" + PropsObj.data[index])
  //修改用户余额
  await userStore.balanceUser({ uid: userInfo.value.id, uBalance: "-" + PropsObj.data[index], })
  //当输入的金额和当前合同的金额一致时 则会删除
  if (PropsObj.data[index] == item.cLoanAmount) {
    await loanStore.userRemoveConract(item.cid)
  }

  // 更新操作
  await loanStore.UserConList(localStorage.getItem("token"));
  await userStore.getUserInfo({ uid: localStorage.getItem("token") });

  await addPaymentRecord({
    time: Date.now(),
    id: userInfo.value.id,
    user_name: userInfo.value.username,
    financial_type: '还款',
    income_money: PropsObj.data[index],
    compute_money: userInfo.value.liability,
    remark: "余额还款"
  })

  await getAllPaymentRecord(userInfo.value.id)


  ElMessage({
    type: "success",
    message: "还款成功",
  });

  //重置表单
  PropsObj.data[index] = "";
};

//提前还款申请弹出层回调
const PropsHander = () => {
  PropsObj.dialogVisible = true;
};
//提前还款申请弹出层回调弹出层关闭回调
const handleClose = (done) => {
  done();
  PropsObj.data.forEach((item, index) => {
    PropsObj.data[index] = "";
  });
};
</script>

<template>
  <div class="top">
    <div class="gu_main">
      <!-- 头部 -->
      <div class="main_top">
        <RouterLink to="/loan/applyloan">
          <div class="main_item1">
            <i>
              <img src="../../../public/image/D-Foot-img/D-edit.png" alt="" />
            </i>
            <p>贷款申请</p>
          </div>
        </RouterLink>
        <div class="main_item2" @click="PropsHander">
          <i>
            <img src="../../../public/image//D-Foot-img/D-huan.png" alt="" />
          </i>
          <p>提前贷款申请</p>
        </div>
        <div class="main_item3" @click="
          PropsObj.IsShow = true;
        PropsObj.DK_DK_show = '5';
        ">
          <i>
            <img src="../../../public/image//D-Foot-img/D-jindu.png" alt="" />
          </i>
          <p>贷款申请进度查询</p>
        </div>
      </div>
      <!-- 中间 -->
      <div class="main">
        <div class="main_left">
          <div class="main_left_top">
            <a href="javaScript:;" @click="PropsObj.ZDindex = '1'" :class="{ active: PropsObj.ZDindex == '1' }">贷款提醒</a>
            <a href="javaScript:;" @click="PropsObj.ZDindex = '2'" :class="{ active: PropsObj.ZDindex == '2' }">征信提醒</a>
            <a href="javaScript:;" @click="PropsObj.ZDindex = '3'" :class="{ active: PropsObj.ZDindex == '3' }">还款提醒</a>
          </div>
          <div class="main_left_text">
            <p v-if="PropsObj.ZDindex == '1'">
              如果您需要申请贷款，请查看 贷款申请流程 贷款办理时间：
              必须在指定的时间内才能申请助学贷款，
              一般为每年6月-9月，具体以当地县区资助中心办理时间为准，请随时关注。
            </p>
            <p v-if="PropsObj.ZDindex == '2'">
              您的贷款、还款记录已报送人民银行个人征信系统，请务必按时还款。
              如有违约，会影响您的信用记录，有关不良记录将保留至逾期贷款结清后5年，今后在办理信用卡、申请房贷与车贷等其它各类贷款时会有不良影响。
              请珍惜您的信用记录，及时还款。
            </p>
            <p v-if="PropsObj.ZDindex == '3'">
              目前助学贷款还款方式支持对应代理结算机构APP（您可以在“学生在线系统-我的贷款-合同信息”查看代理结算机构）、云闪付或银联POS机等多种方式还款，根据监管要求，还款后请及时查看还款情况。
              正常还款日：每年11月1日至12月20日（最后一年到期日为8月31日的合同，需要在8月31日之前还款；最后一年到期日为9月20日的合同，需要在9月20日之前还款，具体以合同为准）
              提前还款日：一般每月（除了11月）的15日(含)前提交申请，利息计算至当月20日，请于当月20日前还款；16日以后提交申请，利息计算至次月20日，请于次月20日前还款；其他特殊情况以合同约定为准。
              逾期还款日：1月至10月的1日至20日，11月1日至12月20日可以进行逾期还款。（11月逾期还款利息计算到12月20日）
            </p>
          </div>
        </div>
        <div class="main_right">
          <div class="main_right_top">
            <a href="javaScript:;">本人所属资助中心联系方式</a>
          </div>
          <!-- 资助中心联系方式 -->
          <div class="main_right_text">
            <div class="main_right_pp">
              <p>
                <img src="../../../public/image/Z-zh-img/Z-1-name.png" alt="" />
                资助中心名称：xx市xx区学生资助管理中心
              </p>
              <p>
                <img src="../../../public/image/Z-zh-img/Z-2-ding.png" alt="" />
                资助中心地址：xx省xx市xx路xxx号xxx教育局
              </p>
              <p>
                <img src="../../../public/image/Z-zh-img/Z-3-youbian.png" alt="" />
                邮政编码：535xxx
              </p>
              <p>
                <img src="../../../public/image/Z-zh-img/Z-4-qq.png" alt="" />
                QQ：273xxx011
              </p>
              <p>
                <img src="../../../public/image/Z-zh-img/Z-5-PhoneRen.png" alt="" />
                联系人：xxx
              </p>
              <p>
                <img src="../../../public/image/Z-zh-img/Z-6-PHONE.png" alt="" />
                联系电话：0xxx-xxxx375
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <div class="butt">
        <div class="butt_item">
          <i>
            <img src="../../../public/image//D-Foot-img/D-Foot-book.png" alt="" />
          </i>
          <div class="butt_item_right">
            <p>申请流程</p>
            <span> 首贷的申请流程及所需材料</span>
            <a href="javaScript:;" @click="
              PropsObj.IsShow = true;
            PropsObj.DK_DK_show = '1';
            ">点击查看 ></a>
          </div>
        </div>
        <div class="butt_item">
          <i>
            <img src="../../../public/image//D-Foot-img/D-Foot-mouey+.png" alt="" />
          </i>
          <div class="butt_item_right">
            <p>续贷帮助</p>
            <span> 续贷的申请流程及所需材料</span>
            <a href="javaScript:;" @click="
              PropsObj.IsShow = true;
            PropsObj.DK_DK_show = '2';
            ">点击查看 ></a>
          </div>
        </div>
        <div class="butt_item">
          <i>
            <img src="../../../public/image//D-Foot-img/D-Foot-help.png" alt="" />
          </i>
          <div class="butt_item_right">
            <p>常见问题</p>
            <span>初次贷款申请，续贷等其他常见问题</span>
            <a href="javaScript:;" @click="
              PropsObj.IsShow = true;
            PropsObj.DK_DK_show = '3';
            ">点击查看 ></a>
          </div>
        </div>
        <div class="butt_item">
          <i>
            <img src="../../../public/image//D-Foot-img/D-foot-huan-help.png" alt="" />
          </i>
          <div class="butt_item_right">
            <p>提前还款帮助</p>
            <span>提前还款申请时间及查询</span>
            <a href="javaScript:;" @click="
              PropsObj.IsShow = true;
            PropsObj.DK_DK_show = '4';
            ">点击查看 ></a>
          </div>
        </div>
      </div>
    </div>

    <!-- 提前还款申请弹出层回调弹出层 -->
    <el-dialog v-model="PropsObj.dialogVisible" title="提前还款申请" width="964" :before-close="handleClose">
      <div class="huan_top">
        <div class="quan_butt">
          <el-button type="success" @click="chenckAll">全部结清</el-button>
          <p>
            贷款总额：<span>{{ totleSum }}（元）</span>
          </p>
        </div>

        <div class="huan_main1" v-for="(item, index) in conList" :key="item">
          <div class="huan_top_flex">
            <p>{{ item.cName }}</p>
            <p>
              合计（元）：<span style="color: red">￥{{ item.cLoanAmount }}</span>
            </p>
          </div>

          <div class="huan_main">
            <div class="huan_he">
              <div class="huan_chenk">
                <!--  :label="item.id"  -->
                <el-checkbox @change="chenckChange($event)" value="11">
                  <hr />
                </el-checkbox>
              </div>
            </div>
            <div class="huan_yue">
              <p>合同余额（元）</p>
              <p>￥{{ item.cLoanAmount }}</p>
            </div>

            <div class="huan_main_ban_kong"></div>

            <div class="huan_butt">
              <div class="huan_butt_width"></div>

              <el-input size="small" v-model.number.trim="PropsObj.data[index]" style="width: 165px" />
            </div>
            <div class="huan_subim">
              <el-button class="butt" @click="subimhander(item, index)" type="primary">提交申请</el-button>
            </div>
          </div>
        </div>

        <div class="huan_main2" v-if="conList.length < 1">
          <p>暂时还没有借款合同哦</p>
        </div>
      </div>
    </el-dialog>

    <!-- 底部查看帮助弹出层 -->
    <el-dialog v-model="PropsObj.IsShow" width="964" :before-close="handleClose">
      <div class="ti_huan_dk_help" v-if="PropsObj.DK_DK_show == '5'">
        <h1>首贷流程图</h1>
        <div class="dk_help_text">
          <div class="dk_help_head">
            <p>合同名称</p>
          </div>
          <div class="dk_help_next">
            <el-steps style="max-width: 1000px" :active="3" align-center finish-status="success" simple>
              <el-step title="提交申请" />
              <el-step title="远程受理" />
              <el-step title="签订合同" />
              <el-step title="审批中" />
              <el-step title="审批通过" />
            </el-steps>
          </div>
        </div>
      </div>

      <div class="one1" v-if="PropsObj.DK_DK_show == '1'">
        <h1>首贷流程图</h1>
        <div class="one1_img">
          <img src="../../../public/image/dk-liucheng.png" alt="" />
        </div>
        <div class="one1_text">
          <p>首贷的申请流程及所需材料:</p>
          <p>
            1.注册学生在线服务系统:登录国家开发银行
            助学贷款学生在线系统(https://sls.cdb.com.cn)，注册学生在线服务系统(
            );"
          </p>

          <p>
            2.填写申请表:在线填写申请表，填写后导出并打印，借款学生本人签字;"
          </p>

          <p>
            3、填写家庭经济困难学生认定申请表;导出家庭经济困难学生认定申请表,填写后由借款学生和共同借款人签字。注意:属于高中预申请无需提供认定申请表。
          </p>

          <p>4，所需材料:"</p>

          <p>4.1.借款学生本人签字的《申请表》原件:"</p>

          <p>
            4.2,借款学生和共同借款人本人签字的家庭经济困难学生认定申请表原件(未通过预申请学生需要提供);"
          </p>

          <p>4.3.借款学生及共同借款人双方的身份证原件;"</p>

          <p>4.4.录取通知书或学生证原件:"</p>

          <p>
            4.5.户口簿原件;注:如果学生及共同借款人不在同一本户口簿上，需出示双方户口簿原件;"
          </p>

          <p>
            5.签订合同:借款学生及共同借款人一同携带所需材料，到户籍所在县级资助中心签订合同并领取回执单。"
          </p>

          <p>
            6.提交回执单:借款学生尽快将回执单交给高校老师，由老师录入系统。注:10月10日后无法录入回执。"
          </p>
        </div>
        <div class="one1_wen">
          <p>
            温馨提示：如学生的《学生证》原件遗失，可由高校开具的《学生在校证明》代替，县级资助中心留存《学生在校证明》原件。
            学生可登录国家开发银行助学贷款信息网点击 学生在线服务系统左侧
            助学贷款介绍中查看助学贷款范围
          </p>
        </div>
      </div>
      <div class="one2" v-if="PropsObj.DK_DK_show == '2'">
        <h1>续贷的申请流程及所需材料</h1>

        <div class="one2_img">
          <img src="../../../public/image/dk-help.png" alt="" />
        </div>
      </div>
      <div class="one3" v-if="PropsObj.DK_DK_show == '3'">
        <h1>常见问题</h1>
        <div class="one3_text">
          <h4>一、还款、还利息、提前还款、扣款日、扣款审批中</h4>
          <p>
            建议您登录学生在线系统（https://sls.cdb.com.cn）、国家开发银行助学贷款APP或阅读借款合同查询您的还款计划，并按期足额还款。如果您的助学贷款账户为支付宝账户(****.cdb@sina.cn)，那么您可以登录任意支付宝，首页搜索“国家开发银行助学贷款”小程序,通过“我要还款”功能使用主动还款功能，
            或存钱到此支付宝余额里（**不能**存在余额宝或者支付宝账户绑定的银行卡），指定支付宝账号要实名认证，等待系统自动扣款。如果您的助学贷款账户是代理结算银行账户，您可以登录代理结算银行手机终端App
            搜索“助学贷款”进入国家开发银行助学贷款专区的“我要还款”功能中进行还款，
            或存钱到绑定的代理结算银行账户中等待系统自动扣款。也可以通过云闪付APP或去全国任意一个支持POS机还款的县级资助管理部门，
            用银联卡（须为借记卡）还款。您可以在系统提示的还款日下个月初登录学生在线系统查询还款情况。
          </p>
          <p>还款结算时间说明：</p>
          <p>1、通过主动还款的方式，结算时间为系统扣款时间次日零点开始结算。</p>
          <p>
            2、通过把钱存到指定还款账户等待被动扣款的方式，扣款时间为系统上还款时间次日零点开始陆续扣款。
          </p>

          <h4>1.自付本息还款时间</h4>
          <p class="H_text_hei2">
            您在就读高校期间的利息由财政全额贴息，贴息截止日后，本息由学生自己承担。建议您按期登录学生在线系统或阅读借款合同查询您的还款计划，并按期足额还款。
          </p>
          <p class="H_text_hei2">
            如您在贷款期间，考上了更高一级的学位，比如专科升本科，本科升研究生，则在上学期间，其贷款利息依旧由地方财政进行补贴，一直到其毕业为止。在升学毕业之前，需联系资助中心老师办理就学信息变更及还款计划变更，如不变更，则默认视为其已经毕业，需要按照国家开发银行规定，自付利息。（变更时间截至到7月31日）。
          </p>

          <h4>2.正常还款</h4>
          <p class="H_text_hei2">
            助学贷款：按照《借款合同》约定，借款学生从贴息截止日当年开始，宽限期内只偿还利息，宽限期后偿还部分本金和利息，每年需在11月1日-12月20日还款，最后一年以合同到期日为准还清贷款。系统提示的还款日期下月初登录系统查询还款记录。
          </p>

          <p class="H_text_hei2">宽限期：2015年之前签订合同，宽限期为2年；</p>
          <p class="H_text_hei2">2015年(含）之后签订合同，宽限期为3年；</p>
          <p class="H_text_hei2">2020年（含）之后签订合同，宽限期为5年。</p>
          <p class="H_text_hei2">
            高校助学贷款：按照《借款合同》约定，借款学生从贴息截止日当年开始进行还款，每年需在11月1日-12月20日偿还一次利息，最后一年以合同到期日为准，利随本清。温馨提示：系统提示的还款日期下月初登录系统查询还款记录。
          </p>

          <h4>3.提前还款</h4>
          <p class="H_text_hei3">提前还款前，需要提交申请。</p>
          <p class="H_text_hei3">
            每天均可提交提前还款申请，不同申请日期对应不同的还款日，具体为：每月15日前申请，还款日为当月20日；每月15日之后申请，还款日为次月20日；10月16日-12月15日之间申请，
            还款日期为12月20日。提前还款申请提交完毕后，在系统显示的还款日期前通过代理结算机构或POS机刷卡还款。
          </p>
          <p class="H_text_hei3">
            温馨提示：系统提示的还款日期下月初登录系统查询还款记录；
            提前还款失败或者是错过还款时间下次需要重新申请；部分提前还款剩余金额还需按照合同约定正常还款。
          </p>

          <h4>4.逾期还款</h4>
          <p class="H_text_hei3">
            借款人在应还款日未能按照合同约定还款，则视为逾期。学生贷款逾期，则会有罚息，罚息期间收取130%的利息，且将还款记录上传至中国人民银行征信系统，罚息仅限本金逾期，利息逾期期间无罚息。
          </p>
          <p class="H_text_hei3">
            贷款逾期后，借款人每个月（11月除外）（时间：在1月-10月的1日-20日，11月1日-12月20日之间）可进行逾期还款，还款日（结息日）为当月20日，逾期还款无需借款人申请或资助中心审批。
          </p>
          <p class="H_text_hei3">
            温馨提示：系统提示的还款日期下月初登录系统查询还款记录。
          </p>

          <h4>5.还款结果查询</h4>
          <p class="H_text_hei3">
            需要在系统显示的还款日期下月初登录学生在线系统查询还款记录。
          </p>
        </div>
      </div>
      <div class="one4" v-if="PropsObj.DK_DK_show == '4'">
        <h1>提前还款申请时间及查询</h1>
        <div class="one4_text">
          <p>
            学生可随时登录学生在线服务系统申请提前还款：1-10月，15日前申请，显示当月20日为还款日期；16日后申请，显示还款日期为次月20日；
            10月16日-12月15日之间申请，显示还款日期为12月20日。
          </p>
          <p>
            提交申请后，系统会显示相关信息，需在扣款日期前，通过对应代理结算机构APP（您可以在“学生在线系统-我的贷款-合同信息”查看代理结算机构）、
            云闪付或银联POS机刷卡等方式还款。建议在系统显示的扣款日期次月月初，登录学生在线系统中查询还款是否成功。
          </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.top {
  width: 100%;
  height: 100%;
  background-color: #f4f5f6;

  .gu_main {
    width: 1215px;

    .main_top {
      width: 1215px;
      height: 180px;
      background-color: white;
      display: flex;
      justify-content: space-evenly;
      text-align: center;
      padding: 20px 0;

      .main_item1 {
        width: 350px;
        height: 148px;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-image: url("../../../public/image//D-Foot-img/Top-back-red.png");
        border-radius: 10px;
        cursor: pointer;

        i {
          display: flex;
          justify-content: center;
        }

        img {
          display: flex;
          justify-content: center;
          width: 48px;
          height: 48pxpx;
        }

        p {
          margin-top: 17px;
          color: white;
          font-size: 21px;
        }
      }

      .main_item2 {
        width: 350px;
        height: 148px;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-image: url("../../../public/image//D-Foot-img/Top-back-yell.png");
        border-radius: 10px;
        cursor: pointer;

        i {
          display: flex;
          justify-content: center;
        }

        img {
          display: flex;
          justify-content: center;
          width: 48px;
          height: 48px;
        }

        p {
          font-size: 21px;
          margin-top: 17px;
          color: white;
        }
      }

      .main_item3 {
        width: 350px;
        height: 148px;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-image: url("../../../public/image//D-Foot-img/Top-back-green.png");
        border-radius: 10px;
        cursor: pointer;

        i {
          display: flex;
          justify-content: center;
        }

        img {
          display: flex;
          justify-content: center;
          width: 48px;
          height: 48px;
        }

        p {
          font-size: 21px;
          margin-top: 17px;
          color: white;
        }
      }

      p {
        margin-top: 6px;
      }
    }

    .main {
      width: 1215px;
      height: 297px;
      background-color: #f4f5f6;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      flex: 0.2;

      .main_left {
        width: 765px;
        height: 297px;
        background-color: white;
        padding: 12px 20px 0 12px;
        margin-right: 10px;

        .main_left_top {
          width: 490px;
          display: flex;
          border-bottom: 1px solid #eaeaea;

          a {
            display: block;
            text-decoration: none;
            width: 70px;
            line-height: 2.9rem;
            margin-right: 15px;
          }
        }

        // 移入出下划线
        .active {
          text-decoration: none;
          border-bottom: 1px solid red;
          color: red;
        }

        .main_left_text {
          width: 730px;

          padding: 7.5px 15px;
          background-color: #f5f7fa;

          p {
            margin-top: 0.85px;
            font-size: 14px;
            padding: 20px;
          }
        }
      }

      .main_right {
        width: 439px;
        height: 297px;
        background-color: white;
        display: flex;

        flex-direction: column;

        .main_right_top {
          width: 272px;
          height: 28px;

          a {
            width: 200px;
            display: block;
            line-height: 2.8rem;
            margin-left: 15px;
          }
        }

        .main_right_top a:hover {
          border-bottom: 1px solid red;
        }

        .main_right_text {
          display: flex;
          justify-content: center;

          a {
            line-height: 180px;
          }

          .main_right_pp {
            width: 439px;
            height: 212px;
            display: flex;
            flex-direction: column;
            padding: 30px 20px 0 20px;
            margin-left: 10px;

            p {
              font-size: 15px;
            }
          }
        }
      }
    }

    .butt {
      width: 1215px;
      height: 148px;
      background-color: white;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .butt_item {
        width: 303px;
        height: 101px;
        background-color: white;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        i {
          display: flex;
          width: 50px;
          height: 50px;
        }

        .butt_item_right {
          width: 94px;
          margin: 0 0 0 19px;

          p {
            font-size: 16px;
          }

          span {
            font-size: 14px;
            display: block;
            color: #969292;
          }

          a {
            width: 100%;
            color: red;
            font-size: 15px;
            display: block;
            margin-top: 2px;
          }
        }
      }
    }
  }
}

.huan_top {
  width: 864px;

  margin: 0 auto;

  .quan_butt {
    p {
      margin: 10px 0;
      font-size: 18px;

      span {
        color: orange;
      }
    }
  }

  .huan_main1 {
    margin-bottom: 30px;
  }

  .huan_main2 {
    width: 100%;
    height: 100px;
    margin: 0 auto;
    text-align: center;

    p {
      font-size: 20px;
    }
  }

  .huan_top_flex {
    height: 53px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    padding: 16px 18px;
    border: 1px solid #eaeaea;
    border-bottom: none;
  }

  .huan_main {
    height: 90px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid #eaeaea;

    .huan_yue {
      margin-right: 20px;
    }

    .huan_yue p:nth-child(2) {
      font-size: 1.625rem;
      font-weight: 600;
      margin-top: 8px;
    }

    .huan_e {
      margin-left: 18px;
    }

    .huan_e p:nth-child(2) {
      font-size: 1.625rem;
      font-weight: 600;
      margin-top: 8px;
    }

    .huan_main_ban_kong {
      flex: 0.5;
    }

    .huan_butt {
      display: flex;
      flex-direction: column;

      .huan_butt_width {
        text-align: center;
        width: 75px;
        height: 10px;
        margin: 0 auto;
        margin-bottom: 10px;
      }
    }

    .huan_subim {
      .butt {
        margin-top: 20px;
      }
    }

    .huan_he,
    .huan_butt,
    .huan_e,
    .huan_yue,
    .huan_subim {
      margin: 8px;
    }
  }
}

//底部弹出层样式
.ti_huan_dk_help {
  margin: 0 34px;

  .dk_help_text {
    .dk_help_head {
      width: 100%;
      height: 60px;
      padding: 19px 22px;
      border: 1px solid #eaeaea;
      border-bottom: none;
      font-size: 16px;
    }

    .dk_help_next {
      height: 185px;
      padding: 22px;
      border: 1px solid #eaeaea;
      line-height: 120px;
    }
  }
}

.one1 {
  h1 {
    border-bottom: 2px solid #eaeaea;
  }

  .one1_text {
    margin: 30px 0;
  }
}

.one2 {
  h1 {
    border-bottom: 2px solid #eaeaea;
    margin-bottom: 10px;
  }

  .one2_img {
    width: 864px;
    height: 1105px;
    margin: 0 auto;
    border: 1px solid #eaeaea;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}

.one3_text {
  padding: 10px 20px;

  & p:nth-child(2) {
    text-indent: 2rem;
  }

  & p:nth-child(3) {
    text-indent: 2rem;
  }

  & p:nth-child(4) {
    text-indent: 2rem;
  }

  & p:nth-child(5) {
    text-indent: 2rem;
  }

  .H_text_hei2,
  .H_text_hei3 {
    text-indent: 2rem;
  }

  h4 {
    font-size: 18px;
    font-weight: bold;
    background-color: #eaeaea;
    margin: 10px 0;
  }
}

.one4 {
  h1 {
    border-bottom: 2px solid #eaeaea;
    margin-bottom: 10px;
  }

  p {
    text-indent: 2rem;
    margin: 20px 6px;
  }
}
</style>
