import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {TreeItem} from "/@/components/Tree";
import {relationList, relationListTree} from "/@/views/bookkeeping/product/BkProduct.api";
//列表数据
// @ts-ignore
export const columns: BasicColumn[] = [
   /*{
     title: 'id',
     align:"center",
     dataIndex: 'id',
     width: 60
   },*/
   {
    title: '名称',
    align:"center",
    dataIndex: 'name',
    width: 200,
   },
   {
    title: '建议零售价',
    align:"center",
    dataIndex: 'price'
   },
    {
      title: '平均进价',
      align: "center",
      dataIndex: 'avgPurchasePrice',
      defaultHidden: true
    },
   {
    title: '最新进价',
    align: "center",
    dataIndex: 'latestPurchasePrice',
     defaultHidden: true
   },
   {
    title: '库存数量',
    align:"center",
    dataIndex: 'amount'
   },
   {
    title: '单位',
    align:"center",
    dataIndex: 'module'
   },
   {
    title: '备注',
    align:"center",
    dataIndex: 'remark',
     defaultHidden: true
   },
   {
    title: '供货商',
    align:"center",
    dataIndex: 'collaboratorName'
   },
   {
    title: '品牌',
    align:"center",
    dataIndex: 'brandName'
   },
  {
    title: '存储位置',
    align: "center",
    dataIndex: 'location_dictText'
  }
];

export const treeData: TreeItem[] = await relationListTree();
export const listData: TreeItem[] = await relationList(0)

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '商品名',
    field: 'name',
    component: 'Input',
  },
  {
    label: '供货商',
    field: 'collaboratorId',
    component: 'Select',
  },
  {
    label: '品牌',
    field: 'brandId',
    component: 'Select',
  },
];
//表单数据
export const formSchema: FormSchema[] = [
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
    label: '商品单位',
    field: 'module',
    component: 'Select',
  },
  {
    label: '商品备注',
    field: 'remark',
    component: 'InputTextArea',
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
