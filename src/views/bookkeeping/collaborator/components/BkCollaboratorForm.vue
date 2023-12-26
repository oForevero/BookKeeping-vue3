<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="厂商/个体 公司名称" v-bind="validateInfos.companyName">
            <a-input v-model:value="formData.companyName" placeholder="请输入厂商/个体 公司名称" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="厂商/个体 公司固话/手机号码" v-bind="validateInfos.companyTel">
	          <a-input-number v-model:value="formData.companyTel" placeholder="请输入厂商/个体 公司固话/手机号码" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="是否还在合作，0为正常，1为不合作" v-bind="validateInfos.collaboratorStatus">
	          <a-input-number v-model:value="formData.collaboratorStatus" placeholder="请输入是否还在合作，0为正常，1为不合作" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="厂商/个体 默认员工id，当商户规模为厂家（2）时来添加员工作为采购/供货人" v-bind="validateInfos.employeeId">
	          <a-input-number v-model:value="formData.employeeId" placeholder="请输入厂商/个体 默认员工id，当商户规模为厂家（2）时来添加员工作为采购/供货人" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="商户状态，0为只采购不销售（也就是客户），1为只销售不采购（也就是供货商），2为合作同行（既是客户又供货商）" v-bind="validateInfos.collaboratorType">
	          <a-input-number v-model:value="formData.collaboratorType" placeholder="请输入商户状态，0为只采购不销售（也就是客户），1为只销售不采购（也就是供货商），2为合作同行（既是客户又供货商）" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="默认匿名账户为0（有且只有一个）个体为 1  厂商为 2" v-bind="validateInfos.collaboratorScale">
	          <a-input-number v-model:value="formData.collaboratorScale" placeholder="请输入默认匿名账户为0（有且只有一个）个体为 1  厂商为 2" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../BkCollaborator.api';
  import { Form } from 'ant-design-vue';
  
  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: ()=>{} },
    formBpm: { type: Boolean, default: true }
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    companyName: '',   
    companyTel: undefined,
    collaboratorStatus: undefined,
    employeeId: undefined,
    collaboratorType: undefined,
    collaboratorScale: undefined,
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    companyName: [{ required: true, message: '请输入厂商/个体 公司名称!'},],
    companyTel: [{ required: true, message: '请输入厂商/个体 公司固话/手机号码!'},],
    collaboratorStatus: [{ required: true, message: '请输入是否还在合作，0为正常，1为不合作!'},],
    collaboratorType: [{ required: true, message: '请输入商户状态，0为只采购不销售（也就是客户），1为只销售不采购（也就是供货商），2为合作同行（既是客户又供货商）!'},],
    collaboratorScale: [{ required: true, message: '请输入默认匿名账户为0（有且只有一个）个体为 1  厂商为 2!'},],
  };
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });

  // 表单禁用
  const disabled = computed(()=>{
    if(props.formBpm === true){
      if(props.formData.disabled === false){
        return false;
      }else{
        return true;
      }
    }
    return props.formDisabled;
  });

  
  /**
   * 新增
   */
  function add() {
    edit({});
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(() => {
      resetFields();
      //赋值
      Object.assign(formData, record);
    });
  }

  /**
   * 提交数据
   */
  async function submitForm() {
    // 触发表单验证
    await validate();
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    //时间格式化
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
    }
    //循环数据
    for (let data in model) {
      //如果该数据是数组并且是字符串类型
      if (model[data] instanceof Array) {
        let valueType = getValueType(formRef.value.getProps, data);
        //如果是字符串类型的需要变成以逗号分割的字符串
        if (valueType === 'string') {
          model[data] = model[data].join(',');
        }
      }
    }
    await saveOrUpdate(model, isUpdate.value)
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }


  defineExpose({
    add,
    edit,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    min-height: 500px !important;
    overflow-y: auto;
    padding: 24px 24px 24px 24px;
  }
</style>
