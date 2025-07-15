import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {
  listBrand,
  relationListTree
} from "./BkProduct.api";
import {TreeItem} from "/@/components/Tree";
//列表数据
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
    slots: {customRender: 'drillDetails'}
  },
  {
    title: '建议零售价',
    align:"center",
    dataIndex: 'price',
    slots: { customRender: 'price' }
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
    title: '状态',
    align: "center",
    slots: { customRender: 'status'},
    dataIndex: 'status',
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

/**
 * 首页所需参数
 */
export let treeData: TreeItem[] = await relationListTree();
export let brandData: []=await listBrand(1);

/**
 * mounted 时赋值树和brand参数
 */
export async function fetchTreeData() {
  treeData = await relationListTree();
}

export async function fetchBrandData(){
  brandData = await listBrand(1);
}

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

