import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { listBrand, listCollaborator } from "./BkProduct.api";
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
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
    align: 'center',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '建议零售价',
    align: 'center',
    dataIndex: 'price',
  },
  {
    title: '平均进价',
    align: 'center',
    dataIndex: 'avgPurchasePrice',
    defaultHidden: true,
  },
  {
    title: '最新进价',
    align: 'center',
    dataIndex: 'latestPurchasePrice',
    defaultHidden: true,
  },
  {
    title: '库存数量',
    align: 'center',
    dataIndex: 'amount',
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'module',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
    defaultHidden: true,
  },
  {
    title: '供货商',
    align: 'center',
    dataIndex: 'collaboratorName',
    customRender: ({ record }) => {
      // @ts-ignore
      const collaboratorName = record.collaboratorName;
      return h(Tag, { color: 'orange' }, () => collaboratorName);
    },
  },
  {
    title: '品牌',
    align: 'center',
    dataIndex: 'brandName',
    customRender: ({ record }) => {
      // @ts-ignore
      const brandName = record.brandName;
      return h(Tag, { color: 'blue' }, () => brandName);
    },
  },
  {
    title: '存储位置',
    align: 'center',
    dataIndex: 'location_dictText',
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '关系id',
    field: 'relationId',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入关系id!' }];
    },
  },
  {
    label: '商品名',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入商品名!' }];
    },
  },
  {
    label: '商品单价',
    field: 'price',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入商品单价!' }];
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
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入商品数量!' }];
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
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入供货商id，0对应无厂商，临时购买，其他对应厂家!' }];
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
    show: false,
  },
];

export const brandData = await listBrand(1);

export const collaboratorsData = await listCollaborator(1);
