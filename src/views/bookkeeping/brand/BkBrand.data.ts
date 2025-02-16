import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '品牌名称',
    align: "center",
    dataIndex: 'name'
  },
  {
    title: '品牌备注',
    align: "center",
    dataIndex: 'remark'
  }
];

//查询数据
export const searchFormSchema: FormSchema[] = [
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '品牌名',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入品牌名!'},
             ];
    },
  },
  {
    label: '品牌备注',
    field: 'remark',
    component: 'InputTextArea',
  },
	// TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
