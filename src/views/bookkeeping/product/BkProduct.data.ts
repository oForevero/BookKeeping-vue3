import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {TreeItem} from "/@/components/Tree";
import {
  listBrand,
  listCollaborator,
  relationListTree
} from "/@/views/bookkeeping/product/BkProduct.api";
import {SelectProps} from "ant-design-vue";
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
export const brandData = await listBrand(1);

export const collaboratorData = await listCollaborator(1);

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
    componentProps: {
      options: brandData,
      fieldNames: {label: 'name', value: 'id', options: brandData}
    }
  },
];
//表单接口
export interface ProductModel{
  //商品名
  name: string;
  //单价
  price: number;
  //数量
  amount: number;
  //计量单位
  module: string;
  //商品备注
  remark: string;
  //供货商id
  collaboratorId: number;
  //品牌
  brandId: number;
  //商品缩略图
  productImg: [];
}

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
/*export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}*/
