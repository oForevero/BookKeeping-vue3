import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {listCollaborator} from "/@/views/bookkeeping/purchase/BkPurchase.api";
import {listProduct} from "/@/views/bookkeeping/purchase/BkPurchase.api";
import {
  relationListTree,
  loadProducts,
} from '/@/views/bookkeeping/product/BkProduct.api';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '进货时间',
    align: "center",
    dataIndex: 'purchaseDate',
    customRender: ({text}) => {
      return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
    },
  },
  {
    title: '供货商名称',
    align: "center",
    dataIndex: 'companyName'
  },
  {
    title: '物品名称',
    align: "center",
    dataIndex: 'productName'
  },
  {
    title: '进货单位',
    align: "center",
    dataIndex: 'purchaseAmount'
  },
  {
    title: '单价',
    align: "center",
    dataIndex: 'purchaseUnitPrice',
    slots: {customRender: 'unitPrice'},
  },
  {
    title: '总价',
    align: "center",
    dataIndex: 'purchasePrice',
    slots: {customRender: 'allPrice'},
  },
  {
    title: '进货备注',
    align: "center",
    dataIndex: 'purchaseRemark'
  },
  {
    title: '发票类型',
    align: "center",
    dataIndex: 'purchaseReceipt_dictText',
    slots: {customRender: 'purchaseReceipt'},
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    field: 'purchaseItem',
    label: '品牌名称',
    component: 'JInput',
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '进货时间',
    field: 'purchaseDate',
    component: 'DatePicker',
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入进货时间，日期数据!'},
      ];
    },
    componentProps: {
      style: { width: '100%' },
    },
  },
  {
    label: '供货商',
    field: 'purchaseCollaborator',
    component: 'ApiSelect',
    componentProps: {
      api: listCollaborator,
      params: {types: '1,2'},
      resultField: 'records',
      labelField: 'companyName',
      valueField: 'id',
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择供货商！'},
      ];
    },
  },
  {
    label: '进货物品',
    field: 'purchaseItem',
    component: 'ApiTreeSelect',
    componentProps: {
      api: relationListTree,
      loadDataApi: loadProducts,  // 展开节点时加载 product

      resultField: 'result',
      // 关键：Ant Design Vue 3.x/4.x 使用 fieldNames
      fieldNames: {
        label: 'relationName',
        value: 'id',
        children: 'children'
      },
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择进货物品！'},
      ];
    },
  },
  {
    label: '进货数量',
    field: 'purchaseAmount',
    component: 'InputNumber',
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入进货数量!'},
      ];
    },
  },
  {
    label: '单价',
    field: 'purchaseUnitPrice',
    component: 'InputNumber',
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入进货物品单价!'},
      ];
    },
    componentProps: {
      addonAfter: '￥',
      style: { width: '100%' },
    },
  },
  {
    label: '总价',
    field: 'purchasePrice',
    component: 'InputNumber',
    componentProps: {
      addonAfter: '￥',
      style: { width: '100%' },
    },
  },
  {
    label: '备注',
    field: 'purchaseRemark',
    component: 'InputTextArea',
  },
  {
    label: '发票类型',
    field: 'purchaseReceipt',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'receipt',
      stringToNumber: true,
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
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
