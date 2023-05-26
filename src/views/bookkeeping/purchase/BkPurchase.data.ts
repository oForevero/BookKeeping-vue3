import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '进货时间，日期数据',
    align:"center",
    dataIndex: 'purchaseDate',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '进货客户id',
    align:"center",
    dataIndex: 'purchaseCollaborator'
   },
   {
    title: '进货物品id',
    align:"center",
    dataIndex: 'purchaseItem'
   },
   {
    title: '进货个数，支持小数，缩进两位小数',
    align:"center",
    dataIndex: 'purchaseAmount'
   },
   {
    title: '进货物品单价',
    align:"center",
    dataIndex: 'purchaseUnitPrice'
   },
   {
    title: '进货物品总价，最大值100亿',
    align:"center",
    dataIndex: 'purchasePrice'
   },
   {
    title: '进货备注，最大100字',
    align:"center",
    dataIndex: 'purchaseRemark'
   },
   {
    title: '发票类型，0普通票，1增值税，2未开具',
    align:"center",
    dataIndex: 'purchaseReceipt'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '进货时间，日期数据',
    field: 'purchaseDate',
    component: 'DatePicker',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入进货时间，日期数据!'},
          ];
     },
  },
  {
    label: '进货客户id',
    field: 'purchaseCollaborator',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入进货客户id!'},
          ];
     },
  },
  {
    label: '进货物品id',
    field: 'purchaseItem',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入进货物品id!'},
          ];
     },
  },
  {
    label: '进货个数，支持小数，缩进两位小数',
    field: 'purchaseAmount',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入进货个数，支持小数，缩进两位小数!'},
          ];
     },
  },
  {
    label: '进货物品单价',
    field: 'purchaseUnitPrice',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入进货物品单价!'},
          ];
     },
  },
  {
    label: '进货物品总价，最大值100亿',
    field: 'purchasePrice',
    component: 'InputNumber',
  },
  {
    label: '进货备注，最大100字',
    field: 'purchaseRemark',
    component: 'InputTextArea',
  },
  {
    label: '发票类型，0普通票，1增值税，2未开具',
    field: 'purchaseReceipt',
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