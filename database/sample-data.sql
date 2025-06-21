USE `u621743320_tak`;

-- إضافة مستخدمين
INSERT INTO `users` (`username`, `email`, `password`, `role`) VALUES
('admin', 'admin@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'admin'),
('manager1', 'manager1@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'manager'),
('employee1', 'employee1@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'employee'),
('client1', 'client1@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'client');

-- إضافة مشاريع
INSERT INTO `projects` (`name`, `description`, `start_date`, `end_date`, `status`, `created_by`) VALUES
('موقع الشركة', 'تطوير موقع الشركة الجديد', '2023-01-01', '2023-06-30', 'in_progress', 1),
('التطبيق المحمول', 'تطوير تطبيق للهواتف الذكية', '2023-02-15', '2023-08-15', 'planned', 2);

-- إضافة مهام
INSERT INTO `tasks` (`title`, `description`, `project_id`, `assigned_to`, `priority`, `status`, `due_date`) VALUES
('تصميم واجهة المستخدم', 'تصميم الواجهة الرئيسية للموقع', 1, 3, 'high', 'in_progress', '2023-03-15'),
('تطوير نظام الدفع', 'برمجة بوابة الدفع الإلكتروني', 1, 3, 'medium', 'todo', '2023-04-10'),
('تحليل المتطلبات', 'جمع متطلبات التطبيق المحمول', 2, 3, 'low', 'completed', '2023-02-28');

-- إضافة تذاكر
INSERT INTO `tickets` (`title`, `description`, `type`, `status`, `priority`, `created_by`, `assigned_to`) VALUES
('مشكلة في تسجيل الدخول', 'لا يمكنني تسجيل الدخول إلى النظام', 'technical', 'open', 'high', 4, 3),
('طلب ميزة جديدة', 'أريد إضافة طريقة دفع جديدة', 'financial', 'open', 'medium', 4, NULL);