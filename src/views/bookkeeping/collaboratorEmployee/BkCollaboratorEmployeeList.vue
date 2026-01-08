<template>
  <div>
    <BasicModal v-bind="$attrs" title="员工管理" :cancelText="'关闭'" :showOkBtn="false"
                :width="900" @register="registerModal">
      <!--引用表格-->
      <BasicTable @register="registerTable" :rowSelection="rowSelection" :search-info="extraSearchInfo">
        <!--插槽:table标题-->
        <template #tableTitle>
          <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增
          </a-button>
          <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出
          </a-button>
          <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">
            导入
          </j-upload-button>
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
          <TableAction :actions="getTableAction(record)"
                       :dropDownActions="getDropDownAction(record)"/>
        </template>
        <!--字段回显插槽-->
        <template #htmlSlot="{text}">
          <div v-html="text"></div>
        </template>
        <template #wordStatus="{text}">
          <a-tag :color="text===1?'green':'red'">{{ text }}</a-tag>
        </template>
        <!--省市区字段回显插槽-->
        <template #pcaSlot="{text}">
          {{ getAreaTextByCode(text) }}
        </template>
        <template #fileSlot="{text}">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined"
                    size="small" @click="downloadFile(text)">下载
          </a-button>
        </template>
      </BasicTable>
      <!-- 表单区域 -->
      <BkCollaboratorEmployeeModal @success="handleSuccess"
                                   ref="employeeModal"></BkCollaboratorEmployeeModal>
    </BasicModal>

  </div>
</template>

<script lang="ts" name="bookkeeping-bkCollaboratorEmployee" setup>
import {ref, computed, unref} from 'vue';
import {BasicTable, useTable, TableAction} from '/@/components/Table';
import {useListPage} from '/@/hooks/system/useListPage'
import BkCollaboratorEmployeeModal from './components/BkCollaboratorEmployeeModal.vue'
import {columns, searchFormSchema} from './BkCollaboratorEmployee.data';
import {
  list,
  deleteOne,
  batchDelete,
  getImportUrl,
  getExportUrl
} from './BkCollaboratorEmployee.api';
import {downloadFile} from '/@/utils/common/renderUtils';
import BasicModal from "/@/components/Modal/src/BasicModal.vue";
import { useModalInner } from "/@/components/Modal";

const extraSearchInfo = {companyId:null};

//注册model
const employeeModal = ref();
//注册table数据
const {tableContext, onExportXls, onImportXls} = useListPage({
  tableProps: {
    title: '供货商/客户_employee',
    api: list,
    immediate: false,
    columns,
    showIndexColumn: true,
    canResize: false,
    formConfig: {
      //labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
      fieldMapToNumber: [],
      fieldMapToTime: [],
    },
    actionColumn: {
      width: 120,
      fixed: 'right'
    },
  },
  exportConfig: {
    name: "供货商/客户_employee",
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl,
    success: handleSuccess
  },
})

const [registerTable, {reload}, {rowSelection, selectedRowKeys}] = tableContext

//表单赋值
const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
  setModalProps({confirmLoading: false,showCancelBtn:!!data?.showFooter,showOkBtn:!!data?.showFooter});
  extraSearchInfo.companyId = data.id;
  console.log(extraSearchInfo);
  await reload();
});

/**
 * 新增事件
 */
function handleAdd() {
  employeeModal.value.add(true, {
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
 * 操作栏
 */
function getTableAction(record) {
  return [
    {
      label: '编辑',
      onClick: handleEdit.bind(null, record),
    }
  ]
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
</script>

<style scoped>

</style>
