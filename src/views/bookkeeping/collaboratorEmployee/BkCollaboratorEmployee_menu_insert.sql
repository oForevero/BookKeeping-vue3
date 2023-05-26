-- 注意：该页面对应的前台目录为views/org.jeecg.bookkeeping文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2023052603271190160', NULL, 'bk_collaborator_employee', '/org.jeecg.bookkeeping/bkCollaboratorEmployeeList', 'org.jeecg.bookkeeping/BkCollaboratorEmployeeList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2023-05-26 15:27:16', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023052603271190161', '2023052603271190160', '添加bk_collaborator_employee', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.bookkeeping:bk_collaborator_employee:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-05-26 15:27:16', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023052603271190162', '2023052603271190160', '编辑bk_collaborator_employee', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.bookkeeping:bk_collaborator_employee:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-05-26 15:27:16', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023052603271190163', '2023052603271190160', '删除bk_collaborator_employee', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.bookkeeping:bk_collaborator_employee:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-05-26 15:27:16', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023052603271190164', '2023052603271190160', '批量删除bk_collaborator_employee', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.bookkeeping:bk_collaborator_employee:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-05-26 15:27:16', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023052603271190165', '2023052603271190160', '导出excel_bk_collaborator_employee', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.bookkeeping:bk_collaborator_employee:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-05-26 15:27:16', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023052603271190166', '2023052603271190160', '导入excel_bk_collaborator_employee', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.bookkeeping:bk_collaborator_employee:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-05-26 15:27:16', NULL, NULL, 0, 0, '1', 0);