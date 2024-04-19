<template>
  <a-modal :width="width" :visible="visible" v-bind="$attrs" :title="title" :useWrapper="true" @ok="submitForm" @cancel="handleCancel">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="父商品类型" v-bind="validateInfos.parentRelationId">
            <a-tree-select
              v-model:value="formData.parentRelationId"
              show-search
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择商品类型"
              allow-clear
              tree-default-expand-all
              :tree-data="treeData"
              :field-names="{
                children: 'children',
                label: 'relationName',
                value: 'id',
              }"
              tree-node-filter-prop="name"
            ></a-tree-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="商品类型名称" v-bind="validateInfos.relationName">
            <a-input v-model:value="formData.relationName" placeholder="请输入商品名" ></a-input>
          </a-form-item>
        </a-col>
<!--        <a-col :span="24">
          <a-form-item label="价格倍率" v-bind="validateInfos.price">
            <a-input-number v-model:value="formData.price" placeholder="请输入价格倍率" style="width: 100%" />
          </a-form-item>
        </a-col>-->
        <a-col :span="24">
          <a-form-item label="类型备注" v-bind="validateInfos.relationRemark">
            <a-textarea v-model:value="formData.remark" rows="4" placeholder="请输入商品备注" />
          </a-form-item>
        </a-col>
<!--        <a-col :span="24">
          <a-form-item label="商品品牌" v-bind="validateInfos.brandId">
            <a-select
              v-model:value="formData.brandId"
              placeholder="请选择品牌"
              allowClear
              showSearch
              optionFilterProp="label"
            >
              <template v-for="item in brandData" :key="item.id">
                <a-select-option :value="item.id" :label="item.name">{{item.name}}</a-select-option>
              </template>
            </a-select>
          </a-form-item>
        </a-col>-->
      </a-row>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup name="bkProductRelationForm">
import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { getValueType } from '/@/utils';
import { saveOrUpdate, listCollaborator } from '../BkProduct.api';
import { Form } from 'ant-design-vue';
import {treeData} from "../BkProduct.data";
const props = defineProps({
  formDisabled: { type: Boolean, default: false },
  formData: { type: Object, default: ()=>{} },
  formBpm: { type: Boolean, default: true }
});
const formRef = ref();
const useForm = Form.useForm;
const emit = defineEmits(['success']);
const formData = reactive<Record<string, any>>({
  id: '',
  parentRelationId: undefined,
  relationName: '',
  relationRemark: '',
  brandId: undefined,
});
const collaboratorData = ref<any>([]);
const collaboratorParam = ref<any>({name: '', types: '1, 2', currentPage: 1})
const { createMessage } = useMessage();
const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
const confirmLoading = ref<boolean>(false);
//表单验证
const validatorRules = {
  parentRelationId: [],
  relationName: [{ required: true, message: '请输入商品类型名称!'},],
};
const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });
const width = ref<number>(800);
const visible = ref<boolean>(false);
const title = ref<string>('新增');

/**
 * 新增
 */
function add(item) {
  console.log(item.id)
  formData.parentRelationId = item.id
  console.log(formData.parentRelationId)
  title.value = "新增"
  visible.value = true;
  edit({});
}

/**
 * 编辑
 */
function edit(record) {
  if(Object.keys(record).length !== 0){
    title.value = "编辑"
  }
  visible.value = true;
  nextTick(() => {
    resetFields();
    //重设请求参数
    collaboratorParam.value = {name: '', types: '1, 2', currentPage: 1};
    //设置treedata的最开始参数
    listCollaborator(1, '', null).then(res=>{
      collaboratorData.value = res;
    })
    //赋值
    Object.assign(formData, record);
  });
}

/**
 * 取消按钮回调事件
 */
function handleCancel() {
  visible.value = false;
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
        visible.value = false;
        emit('success');
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
