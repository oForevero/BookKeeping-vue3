import { defHttp } from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/bookkeeping/bkProduct/list',
  listRelationTree = "/bookkeeping/bkProductRelation/listTree",
  listBrand = "/bookkeeping/bkBrand/list",
  listCollaborator = "/bookkeeping/bkCollaborator/listPurchaseGroup",
  save='/bookkeeping/bkProduct/add',
  edit='/bookkeeping/bkProduct/edit',
  deleteOne = '/bookkeeping/bkProduct/delete',
  deleteBatch = '/bookkeeping/bkProduct/deleteBatch',
  importExcel = '/bookkeeping/bkProduct/importExcel',
  exportXls = '/bookkeeping/bkProduct/exportXls',
}

/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 获取左侧menu
 */
export const relationListTree = () =>
  defHttp.get({url: Api.listRelationTree}).then((res) =>{
    return res;
  });

/**
 * 品牌获取
 * @param pageNo
 */
export const listBrand = (pageNo) =>
  defHttp.get({url: Api.listBrand, params: pageNo}).then((res) => {
    return res.records;
  });

/**
 * 供货商获取
 * @param pageNo
 * @param name
 * @param scale
 */
export const listCollaborator = (pageNo, name, scale) =>
  defHttp.get({url: Api.listCollaborator, params: {pageNo:pageNo, name: name, types: "1,2", scale: scale}}).then((res)=>{
    console.log(res);
    return res.records;
  });

/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}

/**
 * 批量删除
 * @param params
 * @param handleSuccess
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}

/**
 * 保存或者更新
 * @param params
 * @param isUpdate
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
}
