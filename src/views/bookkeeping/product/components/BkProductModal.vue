<template>
  <a-modal :width="width" :visible="visible" v-bind="$attrs" :title="'详情'" :useWrapper="true" @cancel="handleCancel">
    <a-descriptions bordered>
      <a-descriptions-item label="商品名称" :span="2">{{detailData.relationName+'-'+detailData.name}}</a-descriptions-item>
      <a-descriptions-item label="计量单位">{{detailData.module}}</a-descriptions-item>
      <a-descriptions-item label="图片展示">
        <img width="110" height="90" alt="" :src="noImage" v-if="!detailData.productImg" style="margin:0 auto;"/>
        <p style="text-align: center; color: #999999" v-if="!detailData.productImg">暂无数据</p>
        <img width="110" height="90" alt="" :src="domainUrl+ '/sys/common/static/' + detailData.productImg" v-if="detailData.productImg" style="margin:0 auto;"/>
      </a-descriptions-item>
      <a-descriptions-item label="单价">
        <a-tag color="green">{{detailData.price}}￥</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="品牌">{{detailData.brandName}}</a-descriptions-item>
      <a-descriptions-item label="厂家" :span="2">{{detailData.collaboratorName}}</a-descriptions-item>
      <a-descriptions-item label="状态">
        <a-badge status="processing" v-show="detailData.status === '0'" :text="detailData.status_dictText" />
        <a-badge status="warning" v-show="detailData.status === '1'" :text="detailData.status_dictText" />
        <a-badge status="error" v-show="detailData.status === '2'" :text="detailData.status_dictText" />
      </a-descriptions-item>
      <a-descriptions-item label="存放区域">
        {{detailData.location_dictText}}
      </a-descriptions-item>
      <a-descriptions-item label="最新进价">
        <a-tag color="red">{{detailData.latestPurchasePrice}}￥</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="平均进价">
        <a-tag color="blue">{{detailData.avgPurchasePrice}}￥</a-tag>
      </a-descriptions-item>
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
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, nextTick, defineExpose } from 'vue';
  import noImage from '/@/assets/images/no_img.png';
  import JImageUpload from "/@/components/Form/src/jeecg/components/JImageUpload.vue";
  import {useGlobSetting} from "/@/hooks/setting";
  const { domainUrl } = useGlobSetting();

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
  const width = ref<number>(1100);
  const visible = ref<boolean>(false);
  const registerForm = ref();
  const emit = defineEmits(['register', 'success']);

  /**
   * 编辑
   * @param record
   */
  function edit(record) {
    visible.value = true;
  }

  /**
   * 取消按钮回调事件
   */
  function handleCancel() {
    visible.value = false;
  }

  function showDetail(record){
    console.log('Edit 方法被调用');
    visible.value = true;
    detailData.value = record;
  }

  defineExpose({
    edit, showDetail
  });

</script>

<style>
  /**隐藏样式-modal确定按钮 */
  .jee-hidden {
    display: none !important;
  }
</style>
