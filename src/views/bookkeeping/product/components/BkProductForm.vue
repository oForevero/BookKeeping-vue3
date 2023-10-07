<template>
  <a-modal :title="title" :width="800" :visible="visible" @cancel="visible = false" cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-row>
          <!--          <a-col :span="24">
            <a-form-item label="关系id" v-bind="validateInfos.relationId">
              <a-input-number v-model:value="formData.relationId" placeholder="请输入关系id" style="width: 100%" />
            </a-form-item>
          </a-col>-->
          <a-col :span="24">
            <a-form-item label="商品名称" v-bind="validateInfos.name">
              <a-input v-model:value="formData.name" prefix="💻" placeholder="请输入商品名称" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="计量单位" v-bind="validateInfos.module">
              <a-input v-model:value="formData.module" suffix="🛒" placeholder="请输入计量单位" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="商品图片">
              <a-space direction="vertical" style="width: 100%" size="large">
                <a-upload
                  v-model:file-list="formData.productImg"
                  list-type="picture"
                  :max-count="1"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                >
                  <a-button>
                    <upload-outlined />
                    点击上传商品缩略图
                  </a-button>
                </a-upload>
              </a-space>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="单价" v-bind="validateInfos.price">
              <a-input-number
                v-model:value="formData.price"
                style="width: 200px"
                :min="0"
                :max="99999999"
                :step="0.01"
                string-mode
                suffix="￥"
                placeholder="请输入单个计量单位的价钱"
              />
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
            <a-form-item label="品牌" name="brandId">
              <a-select
                v-model:value="formData.brandId"
                show-search
                placeholder="请选择品牌"
                style="width: 200px"
                :options="brandData.records"
                :filter-option="filterOption"
                :fieldNames="{ label: 'name', value: 'id', options: brandData.records }"
                :autoClearSearchValue="true"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="供货商id，0对应无厂商，临时购买，其他对应厂家" v-bind="validateInfos.collaboratorId">
              <a-input-number
                v-model:value="formData.collaboratorId"
                placeholder="请输入供货商id，0对应无厂商，临时购买，其他对应厂家"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="品牌id" v-bind="validateInfos.brandId">
              <a-input-number v-model:value="formData.brandId" placeholder="请输入品牌id" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../BkProduct.api';
  import { Form } from 'ant-design-vue';
  import { brandData } from '../BkProduct.data';
  const visible = ref<boolean>(false);
  const title = ref<string>('新增');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  const props = defineProps({
    formData: { type: Object, default: () => {} },
    formBpm: { type: Boolean, default: true },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    relationId: undefined,
    productImg: '商品图片',
    name: '',
    price: undefined,
    module: '',
    amount: undefined,
    remark: '',
    collaboratorId: undefined,
    brandId: undefined,
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    relationId: [{ required: true, message: '请输入关系id!' }],
    name: [{ required: true, message: '请输入商品名!' }],
    price: [{ required: true, message: '请输入商品单价!' }],
    amount: [{ required: true, message: '请输入商品数量!' }],
    collaboratorId: [{ required: true, message: '请输入供货商id，0对应无厂商，临时购买，其他对应厂家!' }],
  };
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });

  /**
   * 新增
   */
  function add() {
    title.value = '新增';
    edit({});
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(() => {
      title.value = '修改';
      visible.value = true;
      resetFields();
      //赋值
      Object.assign(formData, record);
    });
  }
  /**
   * 验证方法
   * @param input
   * @param option
   */
  const filterOption = (input: string, option: any) => {
    return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
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
