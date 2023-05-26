import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '关系名',
    align:"center",
    dataIndex: 'relationName'
   },
   {
    title: '左右值算法左关联',
    align:"center",
    dataIndex: 'lft'
   },
   {
    title: '左右值算法右关联',
    align:"center",
    dataIndex: 'rgt'
   },
   {
    title: '关系表备注',
    align:"center",
    dataIndex: 'relationRemark'
   },
   {
    title: '供货商id，0对应无厂商，临时购买，其他对应厂家',
    align:"center",
    dataIndex: 'collaboratorId'
   },
   {
    title: '品牌id',
    align:"center",
    dataIndex: 'brandId'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '关系名',
    field: 'relationName',
    component: 'Input',
  },
  {
    label: '左右值算法左关联',
    field: 'lft',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入左右值算法左关联!'},
          ];
     },
  },
  {
    label: '左右值算法右关联',
    field: 'rgt',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入左右值算法右关联!'},
          ];
     },
  },
  {
    label: '关系表备注',
    field: 'relationRemark',
    component: 'InputTextArea',
  },
  {
    label: '供货商id，0对应无厂商，临时购买，其他对应厂家',
    field: 'collaboratorId',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入供货商id，0对应无厂商，临时购买，其他对应厂家!'},
          ];
     },
  },
  {
    label: '品牌id',
    field: 'brandId',
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