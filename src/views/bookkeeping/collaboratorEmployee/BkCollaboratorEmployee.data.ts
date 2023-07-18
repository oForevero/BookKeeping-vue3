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
    dataIndex: 'employeeStatus'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '员工姓名',
    field: 'employeeName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入员工姓名!'},
          ];
     },
  },
  {
    label: '员工手机号',
    field: 'employeePhone',
    component: 'InputNumber',
  },
  {
    label: '员工是否继续合作，0正常，1不合作或离职',
    field: 'employeeStatus',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入员工是否继续合作，0正常，1不合作或离职!'},
          ];
     },
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];



/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
