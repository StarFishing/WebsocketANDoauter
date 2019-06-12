<template>
  <Modal v-model="modal1"
         title="系统控制指令"
         @on-ok="ok"
         @on-cancel="cancel"
         :loading="loading"
         width="800px">
    <p slot="header"
       style="color:rgb(19, 115, 218);text-align:left">
      <Icon type="ios-information-circle"
            size=20></Icon>
      <span>系统控制指令</span>
    </p>
    <Form ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="100"
          inline>
      <FormItem label="工作模式"
                prop="workPattern">
        <Select v-model="formValidate.workPattern"
                placeholder="选择模式"
                style="width:120px">
          <Option value="0">自检</Option>
          <Option value="1">频域搜索</Option>
          <Option value="2">驻留</Option>
          <Option value="3">空域搜索</Option>
          <Option value="4">中频采集</Option>
          <Option value="5">敌我1030</Option>
          <Option value="6">敌我1090</Option>
        </Select>
      </FormItem>
      <FormItem label="工作周期"
                prop="workCycle">
        <Input v-model="formValidate.workCycle"
               type="number"
               placeholder="单位：50ms"
               style="width:120px">
        </Input>
        </Select>
      </FormItem>
      <FormItem label="工作周期数"
                prop="workCycleAmount">
        <Input v-model="formValidate.workCycleAmount"
               type="number"
               placeholder="工作次数"
               style="width:120px">
        </Input>
        </Select>
      </FormItem>
      <FormItem label="起始频率"
                prop="beginFrequency">
        <Input v-model="formValidate.beginFrequency"
               type="number"
               placeholder="分辨率:1 MHz"
               style="width:120px">
        </Input>
        </Select>
      </FormItem>
      <FormItem label="终止频率"
                prop="endFrequency">
        <Input v-model="formValidate.endFrequency"
               type="number"
               placeholder="分辨率:1 MHz"
               style="width:120px">
        </Input>
        </Select>
      </FormItem>
      <FormItem label="频率步进"
                prop="steppedFrequency">
        <Input v-model="formValidate.steppedFrequency"
               type="number"
               placeholder="单位:MHz"
               style="width:120px">
        </Input>
        </Select>
      </FormItem>
      <FormItem label="带宽选择"
                prop="chooseBandwidth">
        <Select v-model="formValidate.chooseBandwidth"
                placeholder="设置带宽"
                style="width:120px">
          <Option value="0">400M</Option>
          <Option value="1">200M</Option>
          <Option value="2">40M</Option>
          <Option value="3">10M</Option>
          <Option value="4">5M</Option>
        </Select>
      </FormItem>
      <FormItem label="天线一选择"
                prop="chooseAntenna1">
        <Select v-model="formValidate.chooseAntenna1"
                placeholder="天线一"
                style="width:120px">
          <Option value="0">前</Option>
          <Option value="1">后</Option>
          <Option value="2">左</Option>
          <Option value="3">右</Option>
        </Select>
      </FormItem>
      <FormItem label="天线二选择"
                prop="chooseAntenna2">
        <Select v-model="formValidate.chooseAntenna2"
                placeholder="天线二"
                style="width:120px">
          <Option value="0">前</Option>
          <Option value="1">后</Option>
          <Option value="2">左</Option>
          <Option value="3">右</Option>
        </Select>
      </FormItem>
      <FormItem label="自检源衰减"
                prop="selfInspectionAttenuation">
        <Input v-model="formValidate.selfInspectionAttenuation"
               type="number"
               placeholder="单位:MHz"
               style="width:120px">
        </Input>
        </Select>
      </FormItem>
      <FormItem label="脉内引导批次号开关"
                prop="guidanceSwitch">
        <Select v-model="formValidate.guidanceSwitch"
                placeholder="开关"
                style="width:120px">
          <Option value="0">打开</Option>
          <Option value="1">关闭</Option>
        </Select>
      </FormItem>
      <FormItem label="脉内引导批次号"
                prop="guidance">
        <Input v-model="formValidate.guidance"
               type="number"
               placeholder="单位:MHz"
               style="width:120px">
        </Input>
        </Select>
      </FormItem>
      <FormItem label="故障检测门限"
                prop="faultDetect">
        <Input v-model="formValidate.faultDetect"
               type="number"
               placeholder="单位:MHz"
               style="width:120px">
        </Input>
        </Select>
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
  </Modal>
</template>
<script>
import * as storage from '@/api/localstorage.js'
import { post } from '@/api/axios.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      equipmentID: '',
      isOnly: 'NO',
      modal1: false,
      loading: true,
      formValidate: {
        workPattern: '2',
        workCycle: '20',
        workCycleAmount: '1',
        beginFrequency: '500',
        endFrequency: '500',
        steppedFrequency: '100',
        chooseBandwidth: '0',
        chooseAntenna1: '0',
        chooseAntenna2: '0',
        selfInspectionAttenuation: '0',
        guidanceSwitch: '1',
        guidance: '0',
        faultDetect: '0'
      },
      ruleValidate: {
        workPattern: [
          { required: true, message: '选择工作模式', trigger: 'change' }
        ],
        workCycle: [
          { required: true, message: '输入工作周期', trigger: 'blur' }
        ],
        workCycleAmount: [
          { required: true, message: '输入工作周期数', trigger: 'blur' }
        ],
        beginFrequency: [
          { required: true, message: '输入起始频率', trigger: 'blur' }
        ],
        endFrequency: [
          { required: true, message: '输入终止频率', trigger: 'blur' }
        ],
        steppedFrequency: [
          { required: true, message: '设置频率步进', trigger: 'blur' }
        ],
        chooseBandwidth: [
          { required: true, message: '选择工作模式', trigger: 'change' }
        ],
        chooseAntenna1: [
          { required: true, message: '天线一未选择', trigger: 'change' }
        ],
        chooseAntenna2: [
          { required: true, message: '天线二未选择', trigger: 'change' }
        ],
        selfInspectionAttenuation: [
          { required: true, message: '设置衰减值', trigger: 'blur' }
        ],
        guidanceSwitch: [
          { required: true, message: '选择开关', trigger: 'change' }
        ],
        guidance: [
          { required: true, message: '输入批次号', trigger: 'blur' }
        ],
        faultDetect: [
          { required: true, message: '设置门限值', trigger: 'blur' }
        ]
      }

    }
  },
  mounted () {
    let id = this.equipmentID
    if (storage.get(id)) {
      if (storage.get(id).systemcommand) {
        this.formValidate = storage.get(id).systemcommand
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
      console.log(this.formValidate)
      const url = '/deployment/sendSystemConrolCMD/communication'
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.sendRequst(url)
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
      let obj = this.formValidate
      obj.host = this.host
      console.log(obj.host)
      console.log(obj)
      post(url, obj).then((data) => {
        if (data.code === 1) {
          setTimeout(() => {
            this.changeLoading()
            storage.set(this.equipmentID, { 'systemcommand': this.formValidate })
            this.handleReset('formValidate')
            this.modal1 = false
            this.$Message.success('设定完成')
          }, 1000)
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
    },
    setId (id) {
      this.equipmentID = id
    }
  },
  computed: {
    ...mapGetters(['host'])
  },
  watch: {
    // modal1 (newvalue, oldvalue) {
    //   // 使用上次操作的值
    //   let id = this.equipmentID
    //   if (storage.get(id)) {
    //     if (storage.get(id).systemcommand) {
    //       this.formValidate = storage.get(id).systemcommand.systemcommand
    //     }
    //   }
    // }

  }
}
</script>
<style>
.ivu-modal {
  width: auto;
  margin: 0 auto;
  position: relative;
  outline: 0;
  top: 100px;
  width: 800px;
  margin-bottom: 50px;
}
</style>
