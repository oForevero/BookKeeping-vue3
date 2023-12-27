<template>
  <a-modal :width="width" :visible="visible" v-bind="$attrs" :title="title" :useWrapper="true" @ok="submitForm" @cancel="handleCancel">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="商品类型" v-bind="validateInfos.relationId">
            <a-tree-select
              v-model:value="formData.relationId"
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
          <a-form-item label="商品名" v-bind="validateInfos.name">
            <a-input v-model:value="formData.name" placeholder="请输入商品名" ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="商品单价" v-bind="validateInfos.price">
            <a-input-number v-model:value="formData.price" placeholder="请输入商品单价" style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="计量单位" v-bind="validateInfos.module">
            <j-dict-select-tag v-model="formData.module" placeholder="请选择计量单位" dictCode="product_count"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="商品数量" v-bind="validateInfos.amount">
            <a-input-number v-model:value="formData.amount" placeholder="请输入商品数量" style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="商品备注" v-bind="validateInfos.remark">
            <a-textarea v-model:value="formData.remark" rows="4" placeholder="请输入商品备注" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="供货商" v-bind="validateInfos.collaboratorId">
            <a-select
              v-model:value="formData.collaboratorId"
              placeholder="请选择供货商"
              allowClear
              showSearch
              optionFilterProp="label"
              @popupScroll="handlePopupScroll"
              @search="handleSearch"
            >
              <template v-for="item in collaboratorData" :key="item.id">
                <a-select-option :value="item.id">{{ item.companyName }}</a-select-option>
              </template>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="品牌id" v-bind="validateInfos.brandId">
            <a-input-number v-model:value="formData.brandId" placeholder="请输入品牌id" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
import { defHttp } from '/@/utils/http/axios';
import {treeData} from "../BkProduct.data";
import { useMessage } from '/@/hooks/web/useMessage';
import { getValueType } from '/@/utils';
import { saveOrUpdate, listCollaborator } from '../BkProduct.api';
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
  relationId: undefined,
  name: '',
  price: undefined,
  module: '',
  amount: undefined,
  remark: '',
  collaboratorId: undefined,
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
  relationId: [{ required: true, message: '请选择商品类型!'},],
  name: [{ required: true, message: '请输入商品名!'},],
  price: [{ required: true, message: '请输入商品单价!'},],
  amount: [{ required: true, message: '请输入商品数量!'},],
  collaboratorId: [{ required: true, message: '请选择供货商!'}],
  brandId: [{ required: true, message: '请选择品牌!'}],
};
const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });
const width = ref<number>(800);
const visible = ref<boolean>(false);
const title = ref<string>('新增');

/**
 * 异步下拉公司事件
 */
/**
 * 异步下拉公司事件
 */
async function handlePopupScroll(e) {
  const { target } = e;
  const scrollHeight = target.scrollHeight - target.scrollTop;
  const clientHeight = target.clientHeight;
  // 下拉框不下拉的时候
  if (scrollHeight === 0 && clientHeight === 0) {
    collaboratorParam.currentPage.value = 1;
    console.log(collaboratorParam.currentPage.value);
  } else {
    // 当下拉框滚动条到达底部的时候
    if (scrollHeight < clientHeight + 5) {
      collaboratorParam.currentPage.value += 1;
      try {
        const res = await listCollaborator(collaboratorParam.currentPage.value, collaboratorParam.name, collaboratorParam.scale);
        // 将新数据追加到数组
        collaboratorData.value = [...collaboratorData.value, ...res];

        console.log(collaboratorData.value);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

/**
 * 查询时刷新数据
 */
function handleSearch(){
  listCollaborator(collaboratorParam.currentPage, collaboratorParam.name, collaboratorParam.scale).then(res=>{
    console.log(res)
  }).catch(e=>{
    console.log(e);
  })
}

/**
 * 新增
 */
function add() {
  title.value = "新增"
  visible.value = true;
  edit({});
}

/**
 * 编辑
 */
function edit(record) {
  title.value = "编辑"
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
