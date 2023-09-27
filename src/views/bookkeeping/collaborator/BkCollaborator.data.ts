import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {h} from "vue";
import {Tag} from "ant-design-vue";
import {brandData} from "/@/views/bookkeeping/product/BkProduct.data";
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '客户名称',
    align:"center",
    dataIndex: 'title'
   },
   {
    title: '联系方式',
    align:"center",
    dataIndex: 'companyTel'
   },
   {
    title: '合作状态',
    align:"center",
    dataIndex: 'collaboratorStatus',
    customRender: ({ record }) => {
       // @ts-ignore
       const collaboratorStatus = record.collaboratorStatus;
       let status = ~~collaboratorStatus === 0
       const color = status ? 'green' : 'red';
       return h(Tag, { color: color }, () => status ? '合作中':'不合作');
    },
   },
   {
    title: '默认员工',
    align:"center",
    dataIndex: 'defaultEmployeeName'
   },
   {
    title: '客户类型',
    align:"center",
    dataIndex: 'collaboratorType_dictText',
     customRender: ({ record }) => {
       // @ts-ignore
       const collaboratorType_dictText = record.collaboratorType_dictText;
       let color = 'green';
       switch (collaboratorType_dictText){
         case '客户':
           color = 'blue';
           break;
         case '供货商':
           color = 'orange'
           break;
         case '合作同行':
           color = 'green'
           break;
         default:
           break;
       }
       return h(Tag, { color: color }, () => collaboratorType_dictText);
     },
   },
   /*{
    title: '默认匿名账户为0（有且只有一个）个体为 1  厂商为 2',
    align:"center",
    dataIndex: 'collaboratorScale'
   },*/
];

export const collaboratorStatus = [
  {name: '合作中', value:0},
  {name: '不合作', value:1}
]

export const collaboratorType = [
  {name: '客户', value:0},
  {name: '供货商', value:1},
  {name: '合作同行', value:2}
]

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '客户名称',
    field: 'companyName',
    component: 'JInput',
  },
  {
    label: '合作状态',
    field: 'collaboratorStatus',
    component: 'Select',
    componentProps: {
      options: collaboratorStatus,
      fieldNames: {label: 'name', value: 'value', options: collaboratorStatus}
    }
  },
  {
    label: '客户类型',
    field: 'collaboratorType',
    component: 'Select',
    componentProps: {
      options: collaboratorType,
      fieldNames: {label: 'name', value: 'value', options: collaboratorType}
    }
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '客户名称',
    field: 'companyName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入厂商/个体 公司名称!'},
          ];
     },
  },
  {
    label: '联系方式',
    field: 'companyTel',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入厂商/个体 公司固话/手机号码!'},
          ];
     },
  },
  {
    label: '合作状态',
    field: 'collaboratorStatus',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入是否还在合作，0为正常，1为不合作!'},
          ];
     },
  },
  {
    label: '厂商/个体 默认员工id，当商户规模为厂家（2）时来添加员工作为采购/供货人',
    field: 'employeeId',
    component: 'InputNumber',
  },
  {
    label: '商户状态，0为只采购不销售（也就是客户），1为只销售不采购（也就是供货商），2为合作同行（既是客户又供货商）',
    field: 'collaboratorType',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入商户状态，0为只采购不销售（也就是客户），1为只销售不采购（也就是供货商），2为合作同行（既是客户又供货商）!'},
          ];
     },
  },
  {
    label: '默认匿名账户为0（有且只有一个）个体为 1  厂商为 2',
    field: 'collaboratorScale',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入默认匿名账户为0（有且只有一个）个体为 1  厂商为 2!'},
          ];
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
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
