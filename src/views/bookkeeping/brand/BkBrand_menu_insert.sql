-- 注意：该页面对应的前台目录为views/top.mccat文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024010308229730580', NULL, 'bk_brand', '/bookkeeping/brand/bkBrandList', 'bookkeeping/brand/BkBrandList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-01-03 20:22:58', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024010308229730581', '2024010308229730580', '添加bk_brand', NULL, NULL, 0, NULL, NULL, 2, 'bookkeeping/brand:bk_brand:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-01-03 20:22:58', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024010308229730582', '2024010308229730580', '编辑bk_brand', NULL, NULL, 0, NULL, NULL, 2, 'bookkeeping/brand:bk_brand:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-01-03 20:22:58', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024010308229730583', '2024010308229730580', '删除bk_brand', NULL, NULL, 0, NULL, NULL, 2, 'bookkeeping/brand:bk_brand:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-01-03 20:22:58', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024010308229730584', '2024010308229730580', '批量删除bk_brand', NULL, NULL, 0, NULL, NULL, 2, 'bookkeeping/brand:bk_brand:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-01-03 20:22:58', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024010308229730585', '2024010308229730580', '导出excel_bk_brand', NULL, NULL, 0, NULL, NULL, 2, 'bookkeeping/brand:bk_brand:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-01-03 20:22:58', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024010308229730586', '2024010308229730580', '导入excel_bk_brand', NULL, NULL, 0, NULL, NULL, 2, 'bookkeeping/brand:bk_brand:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-01-03 20:22:58', NULL, NULL, 0, 0, '1', 0);
