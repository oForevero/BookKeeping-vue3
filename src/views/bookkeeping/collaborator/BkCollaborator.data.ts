import {BasicColumn} from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '合作方名称',
    align: "center",
    dataIndex: 'companyName'
  },
  {
    title: '联系方式',
    align: "center",
    dataIndex: 'companyTel'
  },
  {
    title: '合作状态',
    align: "center",
    dataIndex: 'collaboratorStatus_dictText',
    slots: { customRender: 'collaboratorStatus' }
  },
  {
    title: '商户类型',
    align: "center",
    dataIndex: 'collaboratorType_dictText'
  },
  {
    title: '商户规模',
    align: "center",
    dataIndex: 'collaboratorScale_dictText'
  },
];
