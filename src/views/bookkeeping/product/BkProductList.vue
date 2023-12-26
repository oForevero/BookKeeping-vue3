<template>
  <div style="height: 100%">
    <a-row style="height: 100%">
      <a-col :span="4" style="height:100%">
        <BasicTree title="商品类型" toolbar search :treeData="treeData" :beforeRightClick="getRightMenuList"
                   :fieldNames="{children: 'children', title: 'relationName', key: 'id', value:'id'}"
                   @select="onProductTypeSelect"
                   :defaultExpandAll="true"/>
      </a-col>
      <a-col :span="20" style="height:100%">
        <!--查询区域-->
        <div class="jeecg-basic-table-form-container">
          <a-form @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-row :gutter="24">
            </a-row>
          </a-form>
          <!--引用表格-->
          <BasicTable @register="registerTable" :rowSelection="rowSelection">
            <!--插槽:table标题-->
            <template #tableTitle>
              <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
              <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
              <j-upload-button  type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
              <a-dropdown v-if="selectedRowKeys.length > 0">
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="1" @click="batchHandleDelete">
                      <Icon icon="ant-design:delete-outlined"></Icon>
                      删除
                    </a-menu-item>
                  </a-menu>
                </template>
                <a-button>批量操作
                  <Icon icon="mdi:chevron-down"></Icon>
                </a-button>
              </a-dropdown>
            </template>
            <!--操作栏-->
            <template #action="{ record }">
              <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
            </template>
            <!--字段回显插槽-->
            <template #htmlSlot="{text}">
              <div v-html="text"></div>
            </template>
            <!--省市区字段回显插槽-->
            <template #pcaSlot="{text}">
              {{ getAreaTextByCode(text) }}
            </template>
            <template #price="{text}">
              <a-tag color="green">{{text}}￥</a-tag>
            </template>
            <template #fileSlot="{text}">
              <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
              <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)">下载</a-button>
            </template>
          </BasicTable>
        </div>
      </a-col>
    </a-row>
    <!-- 表单区域 -->
    <BkProductModal ref="detailModal" @success="handleSuccess"></BkProductModal>
    <BkProductForm ref="modifyModal" @success="handleSuccess"></BkProductForm>
  </div>
</template>

<script lang="ts" name="top.mccat-bkProduct" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './BkProduct.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './BkProduct.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import BkProductModal from './components/BkProductModal.vue';
  import BkProductForm from "./components/BkProductForm.vue"
  import {treeData} from "./BkProduct.data";
  import {BasicTree, ContextMenuItem} from "/@/components/Tree";
  import {getAreaTextByCode} from "../../../components/Form/src/utils/Area";

  const queryParam = ref<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const detailModal = ref();
  const modifyModal = ref();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: 'bk_product',
      api: list,
      columns,
      canResize:false,
      useSearchForm: false,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: (params) => {
        return Object.assign(params, queryParam.value);
      },
    },
    exportConfig: {
      name: "bk_product",
      url: getExportUrl,
    },
	  importConfig: {
	    url: getImportUrl,
	    success: handleSuccess
	  },
  });
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys }] = tableContext;
  const labelCol = reactive({
    xs: { span: 24 },
    sm: { span: 7 },
  });
  const wrapperCol = reactive({
    xs: { span: 24 },
    sm: { span: 16 },
  });

  /**
   * 左侧树选中事件
   * @param keys
   */
  function onProductTypeSelect(keys, e){
    console.log(e.node);
    if(!e.node){
      queryParam.value.lft = '';
      queryParam.value.rgt = '';
      return;
    }
    let lft = e.node.lft;
    let rgt = e.node.rgt;
    queryParam.value.lft = lft;
    queryParam.value.rgt = rgt;
    reload();
  }

  /**
   * 右键list按钮
   * @param node
   */
  function getRightMenuList(node: any): ContextMenuItem[] {
    return [
      {
        label: '新增',
        handler: () => {
          console.log('点击了新增', node);
        },
        icon: 'bi:plus',
      },
      {
        label: '修改',
        handler: () => {
          console.log('点击了修改', node);
        },
        icon: 'bi:edit',
      },
      {
        label: '删除',
        handler: () => {
          console.log('点击了删除', node);
        },
        icon: 'bx:bxs-folder-open',
      },
    ];
  }

  /**
   * 新增事件
   */
  function handleAdd() {
    modifyModal.value.add();
  }
  
  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    modifyModal.value.edit(record);
  }
   
  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    detailModal.value.showDetail(record);
  }
   
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }
   
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }
   
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
   
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
    ];
  }
   
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      }, {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        }
      }
    ]
  }

  /**
   * 查询
   */
  function searchQuery() {
    reload();
  }
  
  /**
   * 重置
   */
  function searchReset() {
    queryParam.value = {};
    selectedRowKeys.value = [];
    //刷新数据
    reload();
  }
  



</script>

<style lang="less" scoped>
  .jeecg-basic-table-form-container {
    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
    .query-group-cust{
      width: calc(50% - 15px);
      min-width: 100px !important;
    }
    .query-group-split-cust{
      width: 30px;
      display: inline-block;
      text-align: center
    }
  }
</style>
