import { defineStore } from 'pinia'
import dayjs from 'dayjs';
import { computed, reactive } from 'vue'
import { reqUserPaymentRecord, reqAddPaymentRecord } from '@/api/flow'

export const useFlowStore = defineStore('flow', () => {
    // 当前用户的所有支付记录
    let paymentRecord = reactive([])

    // 获取用户的所有支付记录
    async function getAllPaymentRecord(id) {
        const res = await reqUserPaymentRecord(id)
        if (res === '暂无数据') {
            paymentRecord.splice(0, paymentRecord.length)
        } else {
            Object.assign(paymentRecord, res)
        }

    }

    // 添加支付记录
    async function addPaymentRecord(data) {
        await reqAddPaymentRecord(data)
    }

    const newPaymentRecord = computed(() => {
        const res = paymentRecord.map(item => {
            return {
                ...item,
                time: dayjs(Number(item.time)).format('YYYY-MM-DD')
            }
        })
        // console.log(res);

        return res
    })

    return { newPaymentRecord, addPaymentRecord, getAllPaymentRecord }
})
