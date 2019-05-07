<template>
  <Modal v-model="modal1"
         title="选择校对时间"
         @on-ok="ok"
         @on-cancel="cancel"
         :loading="loading">
    <p slot="header"
       style="color:rgb(19, 115, 218);text-align:left">
      <Icon type="ios-information-circle"
            size=20></Icon>
      <span>选择校对时间</span>
    </p>
    <div class="content">
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80">
        <FormItem label="时间">
          <Row>
            <Col span="11">
            <FormItem prop="date">
              <DatePicker type="date"
                          placeholder="Select date"
                          v-model="formValidate.date"></DatePicker>
            </FormItem>
            </Col>
            <Col span="2"
                 style="text-align: center">-</Col>
            <Col span="11">
            <FormItem prop="time">
              <TimePicker type="time"
                          placeholder="Select time"
                          v-model="formValidate.time"></TimePicker>
            </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="更新所有">
          <RadioGroup v-model="isOnly">
            <Radio label="YES">
              <span>是</span>
            </Radio>
            <Radio label="NO">
              <span>否</span>
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </div>

  </Modal>

</template>
<style scoped>
.content {
  width: 80%;
  padding: 10px 0 0 0;
  margin-left: 5%;
  position: relative;
}
</style>

<script>
import { GMTToStr } from '@/api/transformDate'
import { post } from '@/api/axios.js'
import * as storage from '@/api/localstorage.js'
export default {
  props: {
    equipmentID: {// 设备ID
      type: String,
      default: ''
    }
  },
  data () {
    return {
      modal1: false,
      loading: true,
      isOnly: 'NO', // 判断是否全部更新
      formValidate: {
        date: '',
        time: ''
      },
      ruleValidate: {
        date: [
          { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: '请选择时间', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    changeLoading () {
      // 避免点击确定模态框直接关闭
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    ok () {
      this.handleSubmit('formValidate')
    },
    cancel () {
      this.handleReset('formValidate')
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let urlN = '/deployment/sendSystemTiming/communication'
          let urlY = '/deployment/sendAllSendSystemTiming/communication'
          if (this.isOnly === 'NO') {
            this.sendRequst(urlN)
          } else if (this.isOnly === 'YES') {
            this.sendRequst(urlY)
          }
        } else {
          this.$Message.error('输入不完整')
          return this.changeLoading()
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    changeShowstate () {
      this.modal1 = true
    },
    sendRequst (url) {
      // 转换时间格式
      let dataTime = GMTToStr(this.formValidate.date, this.formValidate.time)
      let obj = { 'time': dataTime, 'host': '192.168.31.69' }
      post(url, obj).then((data) => {
        if (data.code === 1) {
          setTimeout(() => {
            this.changeLoading()
            // 发送成功将表单数据存到本地
            storage.set(this.equipmentID, { 'date': this.formValidate })
            // 清空表单，避免下次打开有初始值
            this.handleReset('formValidate')
            this.modal1 = false
            this.$Message.success({
              content: '指令发送成功',
              duration: 1
            })
          }, 500)
        } else {
          this.$Message.error({
            content: '指令提交失败',
            duration: 1
          })
          return this.changeLoading()
        }
      }).catch(() => {
        this.$Message.error({
          content: '网络请求出错',
          duration: 1
        })
        return this.changeLoading()
      })
    }
  },
  mounted () {
    // 使用上次操作的值
    let id = this.equipmentID
    if (storage.get(id)) {
      if (storage.get(id).date) {
        this.formValidate.date = storage.get(id).date.date
        this.formValidate.time = storage.get(id).date.time
      }
    }
  }
}
</script>
