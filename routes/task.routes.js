 HEAD
// task routes placeholder
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Task route');
});

module.exports = router;

const { authJwt } = require("../middleware");
const taskController = require("../controllers/task.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // إنشاء مهمة جديدة (للمديرين والمسؤولين فقط)
  app.post(
    "/api/tasks",
    [authJwt.verifyToken, authJwt.isManagerOrAdmin],
    taskController.createTask
  );

  // الحصول على مهام مشروع معين
  app.get(
    "/api/projects/:projectId/tasks",
    [authJwt.verifyToken],
    taskController.getTasksByProject
  );

  // الحصول على مهام المستخدم الحالي
  app.get(
    "/api/users/tasks",
    [authJwt.verifyToken],
    taskController.getUserTasks
  );

  // تحديث حالة المهمة
  app.put(
    "/api/tasks/:id/status",
    [authJwt.verifyToken],
    taskController.updateTaskStatus
  );

  // تحديث تفاصيل المهمة (للمديرين والمسؤولين فقط)
  app.put(
    "/api/tasks/:id",
    [authJwt.verifyToken, authJwt.isManagerOrAdmin],
    taskController.updateTask
  );

  // حذف مهمة (للمسؤولين فقط)
  app.delete(
    "/api/tasks/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    taskController.deleteTask
  );

  // إضافة تعليق على المهمة
  app.post(
    "/api/tasks/:id/comments",
    [authJwt.verifyToken],
    taskController.addTaskComment
  );

  // الحصول على تعليقات المهمة
  app.get(
    "/api/tasks/:id/comments",
    [authJwt.verifyToken],
    taskController.getTaskComments
  );
};
 2b0a9f9b4d2e9bb813b65913e8a13d68f81842e9
