<template>
  <BasicModal :width="width" v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" useWrapper="true" @ok="handleSubmit"
              :showOkBtn="isUpdate" :showCancelBtn="isUpdate">
<!--    <BasicForm v-show="!isDetail" @register="registerForm"/>-->
    <div v-show="!isDetail">
      <a-form :model="product">
        <a-form-item
          label="商品名称"
          name="module"
          :rules="[{ required: true, message: '请输入商品名称！' }]"
        >
          <a-input v-model:value="product.name" prefix="💻" placeholder="请输入商品名称"/>
        </a-form-item>
        <a-form-item
          label="计量单位"
          name="name"
          :rules="[{ required: true, message: '请输入计量单位！' }]"
        >
          <a-input v-model:value="product.module" suffix="🛒" placeholder="请输入计量单位"/>
        </a-form-item>
        <a-form-item
          label="商品图片"
          name="productImg"
        >
          <a-space direction="vertical" style="width: 100%" size="large">
            <a-upload
              v-model:file-list="product.productImg"
              list-type="picture"
              :max-count="1"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
              <a-button>
                <upload-outlined></upload-outlined>
                点击上传商品缩略图
              </a-button>
            </a-upload>
          </a-space>
        </a-form-item>
        <a-form-item
          label="单价"
          name="price"
          :rules="[{ required: true, message: '请输入单价数据！' }]"
        >
          <a-input-number
            v-model:value="product.price"
            style="width: 200px"
            :min="0"
            :max="99999999"
            :step="0.01"
            string-mode
            suffix="￥"
            placeholder="请输入单个计量单位的价钱"
          />
        </a-form-item>
        <a-form-item
          label="品牌"
          name="brandId"
        >
          <a-select
            v-model:value="product.brandId"
            show-search
            placeholder="请选择品牌"
            style="width: 200px"
            v-model="product.brandId"
            :options="brandData"
            :filter-option="filterOption"
            :fieldNames="{ label: 'name', value: 'id', options: brandData }"
            :autoClearSearchValue="true"
          ></a-select>
        </a-form-item>
        <a-form-item
          label="厂家"
          name="collaboratorId"
        >
          <a-select
            v-model:value="product.collaboratorId"
            show-search
            placeholder="请选择供货商"
            style="width: 200px"
            v-model="product.collaboratorId"
            :options="collaboratorData"
            :filter-option="filterOption"
            :fieldNames="{ label: 'name', value: 'id', options: brandData }"
            :autoClearSearchValue="true"
          ></a-select>
        </a-form-item>
      </a-form>
    </div>
    <a-descriptions v-show="isDetail" bordered>
      <a-descriptions-item label="商品名称" :span="2">{{detailData.relationName+'-'+detailData.name}}</a-descriptions-item>
      <a-descriptions-item label="计量单位">{{detailData.module}}</a-descriptions-item>
      <a-descriptions-item label="图片展示"><img width="110" height="90" alt="" src="../img/capoo.gif"/>{{detailData.productImg}}</a-descriptions-item>
      <a-descriptions-item label="单价">{{detailData.price}}￥</a-descriptions-item>
      <a-descriptions-item label="品牌">{{detailData.brandName}}</a-descriptions-item>
      <a-descriptions-item label="厂家" :span="2">{{detailData.collaboratorName}}</a-descriptions-item>
      <a-descriptions-item label="状态">
        <a-badge status="processing" v-show="detailData.status === '0'" :text="detailData.status_dictText" />
        <a-badge status="warning" v-show="detailData.status === '1'" :text="detailData.status_dictText" />
        <a-badge status="error" v-show="detailData.status === '2'" :text="detailData.status_dictText" />
      </a-descriptions-item>
      <a-descriptions-item label="存放区域">{{detailData.location_dictText}}</a-descriptions-item>
      <a-descriptions-item label="最后一次进价">{{detailData.latestPurchasePrice}}￥</a-descriptions-item>
      <a-descriptions-item label="平均进价">{{detailData.avgPurchasePrice}}￥</a-descriptions-item>
      <a-descriptions-item label="备注信息" :span="3">
        范例详情信息
        <br />
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
        {{detailData.remark}}
      </a-descriptions-item>
    </a-descriptions>
  </BasicModal>
</template>

<script lang="ts" setup>
import {ref, computed, unref, reactive} from 'vue';
import {BasicModal, useModalInner} from '/@/components/Modal';
import {BasicForm, useForm} from '/@/components/Form/index';
import {brandData, collaboratorData, ProductModel} from '../BkProduct.data';
    import {saveOrUpdate} from '../BkProduct.api';
import options from "@zxcvbn-ts/core/src/Options";
    // Emits声明
    const emit = defineEmits(['register','success']);
    //是否为更新操作
    const isUpdate = ref(true);
    //是否为详情操作
    const isDetail = ref(false);
    const width = ref(600);
    //商品类型
    const product = reactive<ProductModel> ({
      amount: 0,
      brandId: 0,
      collaboratorId: 0,
      module: "",
      name: "",
      price: 0,
      remark: "",
      productImg: [],
    });
    /**
     * 验证方法
     * @param input
     * @param option
     */
    const filterOption = (input: string, option: any) =>{
      return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    //表单配置
    const [registerForm, {setProps,resetFields, setFieldsValue, validate}] = useForm({
        //labelWidth: 150,
        schemas: undefined,
        showActionButtonGroup: false,
        baseColProps: {span: 24}
    });
    const detailData = ref({
      relationName: null,
      amount: null,
      avgPurchasePrice: null,
      brandId: null,
      brandName: null,
      collaboratorId: null,
      collaboratorName: null,
      id: null,
      latestPurchasePrice: null,
      location: null,
      location_dictText: null,
      module: null,
      name: null,
      price: null,
      productImg: null,
      relationId: null,
      remark: null,
      status: null,
      status_dictText: null,
    });
    //表单赋值
    const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
      console.log("update value",isUpdate.value);
      if(!data.isDetail){
        width.value = 600;
        isDetail.value = false;
        //重置表单
        await resetFields();
        setModalProps({confirmLoading: false,showCancelBtn:!!data?.showFooter,showOkBtn:!!data?.showFooter});
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          //表单赋值
          await setFieldsValue({
            ...data.record,
          });
        }
        // 隐藏底部时禁用整个表单
        await setProps({disabled: !data?.showFooter})
      }else {
        width.value = 1100;
        isUpdate.value = false;
        isDetail.value = true;
        detailData.value = data.record;
        console.log("detail：",detailData.value);
      }
    });

  //表单提交事件
  async function handleSubmit(v) {
    try {
      let values = await validate();
      setModalProps({confirmLoading: true});
      //提交表单
      await saveOrUpdate(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({confirmLoading: false});
    }
  }

    //设置标题
    const title = computed(() => (!unref(isUpdate) ? '详情' : '新增'));
</script>

<style lang="less" scoped>
	/** 时间和数字输入框样式 */
  :deep(.ant-input-number){
		width: 100%
	}

	:deep(.ant-calendar-picker){
		width: 100%
	}

  :deep(.ant-form-item-label){
    width: 100px;
  }
</style>
