<template>
  <a-modal :title="'合作方员工管理'" :width="width" :visible="visible" @cancel="handleCancel" cancelText="关闭">
    <BasicTable v-if="visible" @register="registerTable" :rowSelection="rowSelection" :search-info="searchInfo">
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
      <template #defaultEmployee="{ record }">
        <a-tag v-show="record.id===parenRecord.employeeId" color="green">默认员工</a-tag>
        <a-tag v-show="record.id!==parenRecord.employeeId" color="gray">普通员工</a-tag>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <BkCollaboratorEmployeeModal @success="handleSuccess" ref="employeeModal"></BkCollaboratorEmployeeModal>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, nextTick, defineExpose } from 'vue';
  import {
    batchDelete,
    deleteOne,
    getExportUrl, getImportUrl,
    list
  } from "/@/views/bookkeeping/collaboratorEmployee/BkCollaboratorEmployee.api";
  import {useListPage} from "/@/hooks/system/useListPage";
  import {columns} from "/@/views/bookkeeping/collaboratorEmployee/BkCollaboratorEmployee.data";
  import {
    searchFormSchema
  } from "/@/views/bookkeeping/collaboratorEmployee/BkCollaboratorEmployee.data";
  import {BasicTable, TableAction} from "/@/components/Table";
  const confirmLoading = ref<boolean>(false);
  const { createMessage } = useMessage();
  import BkCollaboratorEmployeeModal
    from "/@/views/bookkeeping/collaboratorEmployee/components/BkCollaboratorEmployeeModal.vue";
  import {saveOrUpdate} from "/@/views/bookkeeping/collaborator/BkCollaborator.api";
  import {useMessage} from "/@/hooks/web/useMessage";
  //注册model
  const employeeModal = ref();
  const title = ref<string>('');
  const width = ref<number>(1300);
  const visible = ref<boolean>(false);
  const searchInfo = {companyId:null, employeeName: null};
  const emit = defineEmits(['register', 'success']);
  const parenRecord = ref();
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
    tableProps:{
      title: '',
      api: list,
      columns,
      showIndexColumn: true,
      canResize:false,
      formConfig: {
        schemas: searchFormSchema,
        autoSubmitOnEnter:true,
        showAdvancedButton:true,
        fieldMapToNumber: [
        ],
        fieldMapToTime: [
        ],
      },
      actionColumn: {
        width: 220,
        fixed:'right'
      },
    },
    exportConfig: {
      name:"合作方管理-员工数据",
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess
    },
  })
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys }] = tableContext;
  /**
   * 编辑
   * @param record
   */
  function show(record) {
    parenRecord.value = record;
    searchInfo.companyId = record.id;
    visible.value = true;
  }

  /**
   * 取消按钮回调事件
   */
  function handleCancel() {
    visible.value = false;
  }

  /**
   * 新增事件
   */
  function handleAdd() {
    let record = {companyId: parenRecord.value.id};
    employeeModal.value.add({
      record,
      isUpdate: false,
      showFooter: true,
    });
    employeeModal.value.disableSubmit = false;
  }
  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    employeeModal.value.edit({
      record,
      isUpdate: true,
      showFooter: true,
    });
    employeeModal.value.disableSubmit = false;
  }
  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    employeeModal.value.edit({
      record,
      isUpdate: true,
      showFooter: false,
    });
    employeeModal.value.disableSubmit = true;
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({id: record.id}, handleSuccess);
  }
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ids: selectedRowKeys.value}, handleSuccess);
  }
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * 设为默认员工
   * @param record
   */
  async function handleSetDefaultEmployee(record){
    await saveOrUpdate({id: parenRecord.value.id, employeeId: record.id}, true)
      .then((res) => {
        if (res.success) {
          parenRecord.value.employeeId = record.id;
          createMessage.success(res.message);
          reload();
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }
  /**
   * 操作栏
   */
  function getTableAction(record){
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: '设为默认员工',
        onClick: handleSetDefaultEmployee.bind(null, record),
        ifShow: record.id!==parenRecord.value.employeeId,
      },
    ]
  }
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record){
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

  defineExpose({
    show,
  });
</script>

<style>
  /**隐藏样式-modal确定按钮 */
  .jee-hidden {
    display: none !important;
  }
</style>
