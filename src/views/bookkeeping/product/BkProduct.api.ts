import {defHttp} from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/bookkeeping/bkProduct/list',
  listRelationTree = "/bookkeeping/bkProductRelation/listTree",
  listRelation = "/bookkeeping/bkProductRelation/list",
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
export const list = (params) =>
  defHttp.get({url: Api.list, params});

/**
 * 获取左侧menu
 */
export const relationListTree = () =>
  defHttp.get({url: Api.listRelationTree}).then((res) =>{
    return res;
  });

/**
 * 请求list参数，传递pageIndex作为分页
 * @param pageIndex 分页地址
 */
export const relationList  =  (pageIndex) => {
  defHttp.get({url: Api.listRelation}, {joinParamsToUrl: pageIndex}).then((res) =>{
    return res;
  });
}

/**
 * 删除单个
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
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
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}
