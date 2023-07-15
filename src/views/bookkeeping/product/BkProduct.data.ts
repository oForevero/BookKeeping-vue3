import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {TreeItem} from "/@/components/Tree";
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '关系id',
    align:"center",
    dataIndex: 'relationId'
   },
   {
    title: '商品名',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '商品单价',
    align:"center",
    dataIndex: 'price'
   },
   {
    title: '计量单位',
    align:"center",
    dataIndex: 'module'
   },
   {
    title: '商品数量',
    align:"center",
    dataIndex: 'amount'
   },
   {
    title: '商品备注',
    align:"center",
    dataIndex: 'remark'
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
export const treeData: TreeItem[] = [
  {
    title: 'parent ',
    key: '0-0',
    children: [
      { title: 'leaf', key: '0-0-0' },
      {
        title: 'leaf',
        key: '0-0-1',
        children: [
          { title: 'leaf', key: '0-0-0-0', children: [{ title: 'leaf', key: '0-0-0-0-1' }] },
          { title: 'leaf', key: '0-0-0-1' },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '1-1',
    children: [
      { title: 'leaf', key: '1-1-0' },
      { title: 'leaf', key: '1-1-1' },
    ],
  },
  {
    title: 'parent 3',
    key: '2-2',
    children: [
      { title: 'leaf', key: '2-2-0' },
      { title: 'leaf', key: '2-2-1' },
    ],
  },
]
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '关系id',
    field: 'relationId',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入关系id!'},
          ];
     },
  },
  {
    label: '商品名',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入商品名!'},
          ];
     },
  },
  {
    label: '商品单价',
    field: 'price',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入商品单价!'},
          ];
     },
  },
  {
    label: '计量单位',
    field: 'module',
    component: 'Input',
  },
  {
    label: '商品数量',
    field: 'amount',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入商品数量!'},
          ];
     },
  },
  {
    label: '商品备注',
    field: 'remark',
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
