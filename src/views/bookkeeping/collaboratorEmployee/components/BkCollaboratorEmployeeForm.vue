<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="员工姓名" v-bind="validateInfos.employeeName">
            <a-input v-model:value="formData.employeeName" placeholder="请输入员工姓名" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="员工手机号" v-bind="validateInfos.employeePhone">
            <a-input-number v-model:value="formData.employeePhone" placeholder="请输入员工手机号" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="合作状态" v-bind="validateInfos.employeeStatus">
            <j-dict-select-tag dict-code="worker_status" v-model:value="formData.employeeStatus" :stringToNumber="true" :disabled="disabled" />
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
import { saveOrUpdate } from '../BkCollaboratorEmployee.api';
import { Form } from 'ant-design-vue';
import JDictSelectTag from "/@/components/Form/src/jeecg/components/JDictSelectTag.vue";

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
  employeeName: '',
  employeePhone: undefined,
  employeeStatus: 0,
});
const { createMessage } = useMessage();
const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
const confirmLoading = ref<boolean>(false);
//表单验证
const validatorRules = {
  employeeName: [{ required: true, message: '请输入员工姓名!'},],
  employeeStatus: [{ required: true, message: '请选择工作状态!'},],
};
const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });

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

const showDetail = ref(false);


/**
 * 新增
 */
function add(record) {
  edit(record);
}

/**
 * 编辑
 * @param record
 */
function edit(record) {
  nextTick(() => {
    resetFields();
    Object.assign(formData, record.record);
  });
}

/**
 * 提交表单
 */
async function submitForm() {
  await validate();
  confirmLoading.value = true;
  const isUpdate = ref<boolean>(false);
  let model = formData;
  if (model.id) {
    isUpdate.value = true;
  }
  for (let data in model) {
    if (model[data] instanceof Array) {
      let valueType = getValueType(formRef.value.getProps, data);
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
