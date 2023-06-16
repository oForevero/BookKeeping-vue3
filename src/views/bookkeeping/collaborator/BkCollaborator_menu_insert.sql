-- 注意：该页面对应的前台目录为views/bookkeeping文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external)
VALUES ('2023061611197760020', NULL, 'bk_collaborator', '/bookkeeping/bkCollaboratorList', 'bookkeeping/BkCollaboratorList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2023-06-16 11:19:02', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061611197760021', '2023061611197760020', '添加bk_collaborator', NULL, NULL, 0, NULL, NULL, 2, 'bookkeeping:bk_collaborator:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-16 11:19:02', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061611197760022', '2023061611197760020', '编辑bk_collaborator', NULL, NULL, 0, NULL, NULL, 2, 'bookkeeping:bk_collaborator:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-16 11:19:02', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061611197760023', '2023061611197760020', '删除bk_collaborator', NULL, NULL, 0, NULL, NULL, 2, 'bookkeeping:bk_collaborator:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-16 11:19:02', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061611197760024', '2023061611197760020', '批量删除bk_collaborator', NULL, NULL, 0, NULL, NULL, 2, 'bookkeeping:bk_collaborator:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-16 11:19:02', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061611197760025', '2023061611197760020', '导出excel_bk_collaborator', NULL, NULL, 0, NULL, NULL, 2, 'bookkeeping:bk_collaborator:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-16 11:19:02', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023061611197760026', '2023061611197760020', '导入excel_bk_collaborator', NULL, NULL, 0, NULL, NULL, 2, 'bookkeeping:bk_collaborator:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-06-16 11:19:02', NULL, NULL, 0, 0, '1', 0);
