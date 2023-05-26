import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '销售时间，日期数据',
    align:"center",
    dataIndex: 'sellDate',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '销售客户id',
    align:"center",
    dataIndex: 'sellCollaborator'
   },
   {
    title: '销售物品id',
    align:"center",
    dataIndex: 'sellItem'
   },
   {
    title: '销售个数，支持小数，缩进两位小数',
    align:"center",
    dataIndex: 'sellAmount'
   },
   {
    title: '销售物品单价',
    align:"center",
    dataIndex: 'sellUnitPrice'
   },
   {
    title: '销售物品总价，最大值100亿',
    align:"center",
    dataIndex: 'sellPrice'
   },
   {
    title: '销售备注，最大100字',
    align:"center",
    dataIndex: 'sellRemark'
   },
   {
    title: '发票类型，0普通票，1增值税，2未开具',
    align:"center",
    dataIndex: 'sellReceipt'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '销售时间，日期数据',
    field: 'sellDate',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入销售时间，日期数据!'},
          ];
     },
  },
  {
    label: '销售客户id',
    field: 'sellCollaborator',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入销售客户id!'},
          ];
     },
  },
  {
    label: '销售物品id',
    field: 'sellItem',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入销售物品id!'},
          ];
     },
  },
  {
    label: '销售个数，支持小数，缩进两位小数',
    field: 'sellAmount',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入销售个数，支持小数，缩进两位小数!'},
          ];
     },
  },
  {
    label: '销售物品单价',
    field: 'sellUnitPrice',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入销售物品单价!'},
          ];
     },
  },
  {
    label: '销售物品总价，最大值100亿',
    field: 'sellPrice',
    component: 'InputNumber',
  },
  {
    label: '销售备注，最大100字',
    field: 'sellRemark',
    component: 'InputTextArea',
  },
  {
    label: '发票类型，0普通票，1增值税，2未开具',
    field: 'sellReceipt',
    component: 'InputNumber',
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
