import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '员工姓名',
    align:"center",
    dataIndex: 'employeeName'
   },
   {
    title: '员工手机号',
    align:"center",
    dataIndex: 'employeePhone'
   },
   {
    title: '工作状态',
    align:"center",
    dataIndex: 'employeeStatus_dictText',
    slots: {customRender: 'wordStatus'}
   },
   {
     title: '所属公司',
     align:"center",
     dataIndex: 'companyName',
   }
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '员工姓名',
    field: 'employeeName',
    component: 'JInput',
  },
];
