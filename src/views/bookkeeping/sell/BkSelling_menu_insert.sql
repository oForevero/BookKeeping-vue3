-- 注意：该页面对应的前台目录为views/org.jeecg.bookkeeping文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2023052602106480380', NULL, 'bk_selling', '/org.jeecg.bookkeeping/bkSellingList', 'org.jeecg.bookkeeping/BkSellingList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2023-05-26 14:10:38', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023052602106490381', '2023052602106480380', '添加bk_selling', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.bookkeeping:bk_selling:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-05-26 14:10:38', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023052602106490382', '2023052602106480380', '编辑bk_selling', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.bookkeeping:bk_selling:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-05-26 14:10:38', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023052602106490383', '2023052602106480380', '删除bk_selling', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.bookkeeping:bk_selling:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-05-26 14:10:38', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023052602106490384', '2023052602106480380', '批量删除bk_selling', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.bookkeeping:bk_selling:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-05-26 14:10:38', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023052602106490385', '2023052602106480380', '导出excel_bk_selling', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.bookkeeping:bk_selling:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-05-26 14:10:38', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023052602106490386', '2023052602106480380', '导入excel_bk_selling', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.bookkeeping:bk_selling:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-05-26 14:10:38', NULL, NULL, 0, 0, '1', 0);