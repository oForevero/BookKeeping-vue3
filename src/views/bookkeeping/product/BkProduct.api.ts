import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/bookkeeping/bkProduct/list',
  listRelationTree = '/bookkeeping/bkProductRelation/listTree',
  //获取品牌
  listBrand = '/bookkeeping/bkBrand/list',
  //获取供货商
  listCollaborator = '/bookkeeping/bkCollaborator/list',
  save = '/bookkeeping/bkProduct/add',
  edit = '/bookkeeping/bkProduct/edit',
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

export const listBrand = (pageNo) =>
  defHttp.get({ url: Api.listBrand, params: pageNo }).then((res) => {
    return res.records;
  });

export const listCollaborator = (pageNo) =>
  defHttp.get({ url: Api.listCollaborator, params: pageNo }).then((res) => {
    return res.records;
  });
/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

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
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};

/**
 * 保存或者更新
 * @param params
 * @param isUpdate
 */
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};
