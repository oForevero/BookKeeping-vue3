<template>
  <BasicModal :width="width" v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" useWrapper="true" @ok="handleSubmit"
              :showOkBtn="isUpdate" :showCancelBtn="isUpdate">
<!--    <BasicForm v-show="!isDetail" @register="registerForm"/>-->
    <a-form :model="productModel">
      
    </a-form>
    <div v-show="!isDetail">
      <
    </div>
    <a-descriptions v-show="isDetail" bordered>
      <a-descriptions-item label="商品名称" :span="2">{{detailData.relationName+'-'+detailData.name}}</a-descriptions-item>
<!--      <a-descriptions-item label="商品名">{{detailData.name}}</a-descriptions-item>-->
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
import {ref, computed, unref} from 'vue';
    import {BasicModal, useModalInner} from '/@/components/Modal';
    import {BasicForm, useForm} from '/@/components/Form/index';
    import {formSchema} from '../BkProduct.data';
    import {saveOrUpdate} from '../BkProduct.api';
    // Emits声明
    const emit = defineEmits(['register','success']);
    //是否为更新操作
    const isUpdate = ref(true);
    //是否为详情操作
    const isDetail = ref(false);
    const width = ref(600);
    //商品类型
    const productModel = ref({});
    //表单配置
    const [registerForm, {setProps,resetFields, setFieldsValue, validate}] = useForm({
        //labelWidth: 150,
        schemas: formSchema,
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
</style>
