<template>
  <div class="transfer">
    <div class="transfer_container">

      <div class="transfer_header">

        <div class="left_txt">
          <h2>快捷支付</h2>
        </div>
        <div class="right_txt">
          <span>付款过程安全流畅</span>
          <img src="../../../public/image/user_black.png" alt="">
        </div>

      </div>

      <div v-loading="loading" class="transfer_form">

        <el-form :model="form" label-width="auto" style="max-width: 500px" label-position="left" :rules="rules"
          ref="ruleFormRef">

          <el-form-item prop="payee" style="width: 400px; margin-bottom: 35px" label="选择收款人：">
            <el-select v-model="form.payee" placeholder>
              <el-option v-for="(item, index) in allUser" :label="item.userName" :value="item.uid" />
            </el-select>
          </el-form-item>

          <el-form-item prop="way" style="margin-bottom: 35px" label="选择付款方式：">
            <el-radio-group v-model="form.way">
              <el-radio value="1" border>余额</el-radio>
              <el-radio value="2" border>银行卡</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item prop="funds" style="width: 300px; margin-bottom: 35px" label="转账金额：">
            <el-input v-model="form.funds" :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="(value) => value.replace(/\$\s?|(,*)/g, '')" />
          </el-form-item>

          <el-form-item prop="password" style="width: 250px; margin-bottom: 35px" label="支付密码：">
            <el-input v-model="form.password" show-password />
          </el-form-item>

          <el-form-item label="备注：">
            <el-input v-model="form.remark" type="textarea" />
          </el-form-item>
        </el-form>
      </div>

      <el-divider style="margin: 0;" />

      <div class="transfer_btn">
        <el-button type="primary" @click="submitForm(ruleFormRef)">确认转账</el-button>
        <p>您是实名认证用户，本月还可免费向用户账号转账20000.00元</p>
      </div>

      <el-dialog v-model="dialogVisible" title="请确认付款" width="500" :before-close="handleClose">
        <span>转账余额为：{{ form.funds }} 元</span>

        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="againTopFunds">
              确认
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { storeToRefs } from 'pinia';

const store = useUserStore()
const { userInfo, allUser } = storeToRefs(store)
const ruleFormRef = ref()
const dialogVisible = ref(false)
// 加载
const loading = ref(false)

const form = reactive({
  payee: '',
  way: '',
  funds: '',
  password: '',
  remark: ''
})

const rules = reactive({
  payee: [{ required: true, message: '请输入选择收款人', trigger: 'change' }],
  way: [{ required: true, message: '请选择付款方式', trigger: 'change' }],
  funds: [{ required: true, message: '请输入转账金额', trigger: 'change' }],
  password: [
    { required: true, message: '请输入正确的支付密码', trigger: 'change' },
    { validator: validatePassword, trigger: 'change' }
  ],
})

// 支付密码校验
function validatePassword(rules, value, callback) {
  if (value != userInfo.value.paymentPassword) {
    callback(new Error('支付密码错误'))
  } else {
    callback()
  }
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

const handleClose = (done) => {
  ElMessageBox.confirm('确定放弃付款吗？')
    .then(() => {
      ruleFormRef.value.resetFields()
      done()
    })
}

//再次确认充值
function againTopFunds() {
  
  dialogVisible.value = false
  loading.value = true

  setTimeout(() => {
    // 消息提示
    ElMessage({
      message: '已成功转账到用户账户上',
      type: 'success',
    })
    loading.value = false
    ruleFormRef.value.resetFields()
  }, 500)
}

</script>

<style lang="less" scoped>
.transfer {
  width: 100%;
  height: 100%;

  .transfer_container {
    margin: 0 auto;
    width: 960px;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.04);

    .transfer_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 35px;
      width: 100%;
      height: 100px;
      border-bottom: 1px solid #EBEBEB;

      .left_txt {
        color: #4d4d4d;
        font: 700 18px / 28px \5FAE\8F6F\96C5\9ED1;
      }

      .right_txt {
        span {
          font-size: 14px;
          color: #333333;
          margin-right: 15px;
        }
      }
    }

    .transfer_form {
      padding: 30px 15px 15px 100px;
    }

    .transfer_btn {
      padding: 25px 0 0 100px;

      p {
        margin-top: 20px;
        font-size: 12px;
        color: #999999;
      }
    }

  }
}
</style>