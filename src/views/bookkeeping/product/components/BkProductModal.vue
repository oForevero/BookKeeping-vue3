<template>
  <a-modal
    title="详情"
    :width="width"
    :visible="visible"
    @cancel="visible = false"
    :okButtonProps="{ class: { 'jee-hidden': disableSubmit } }"
    cancelText="关闭"
  >
    <!--    <BkProductForm ref="registerForm" @ok="submitCallback" :formDisabled="disableSubmit" :formBpm="false" />-->
    <a-descriptions bordered>
      <a-descriptions-item label="商品名称" :span="2">{{ detailData.relationName + '-' + detailData.name }}</a-descriptions-item>
      <a-descriptions-item label="计量单位">{{ detailData.module }}</a-descriptions-item>
      <a-descriptions-item label="图片展示"
        ><img width="110" height="90" alt="" src="../img/capoo.gif" />{{ detailData.productImg }}</a-descriptions-item
      >
      <a-descriptions-item label="单价">
        <a-tag color="green"> {{ detailData.price }}￥ </a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="品牌">
        <a-tag color="blue">
          {{ detailData.brandName }}
        </a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="厂家" :span="2">
        <a-tag color="orange">
          {{ detailData.collaboratorName }}
        </a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="状态">
        <a-badge status="processing" v-show="detailData.status === '0'" :text="detailData.status_dictText" />
        <a-badge status="warning" v-show="detailData.status === '1'" :text="detailData.status_dictText" />
        <a-badge status="error" v-show="detailData.status === '2'" :text="detailData.status_dictText" />
      </a-descriptions-item>
      <a-descriptions-item label="存放区域">{{ detailData.location_dictText }}</a-descriptions-item>
      <a-descriptions-item label="最后一次进价">
        <a-tag color="red"> {{ detailData.latestPurchasePrice }}￥ </a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="平均进价">
        <a-tag color="red"> {{ detailData.avgPurchasePrice }}￥ </a-tag>
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
        {{ detailData.remark }}
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, nextTick, defineExpose } from 'vue';

  const width = ref<number>(1100);
  const visible = ref<boolean>(false);
  const disableSubmit = ref<boolean>(false);
  const registerForm = ref();
  //const emit = defineEmits(['register', 'success']);
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

  /**
   * 编辑
   * @param record
   */
  function detail(record) {
    visible.value = true;
    nextTick(() => {
      detailData.value = record;
    });
  }
  defineExpose({
    detail,
  });
</script>

<style>
  /**隐藏样式-modal确定按钮 */
  .jee-hidden {
    display: none !important;
  }
</style>
