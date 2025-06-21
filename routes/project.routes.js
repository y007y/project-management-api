 HEAD
// project routes placeholder
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Project route');
});

module.exports = router;

const { authJwt } = require("../middleware");
const projectController = require("../controllers/project.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // إنشاء مشروع جديد (للمديرين والمسؤولين فقط)
  app.post(
    "/api/projects",
    [authJwt.verifyToken, authJwt.isManagerOrAdmin],
    projectController.createProject
  );

  // الحصول على جميع المشاريع
  app.get(
    "/api/projects",
    [authJwt.verifyToken],
    projectController.getAllProjects
  );

  // الحصول على مشروع معين
  app.get(
    "/api/projects/:id",
    [authJwt.verifyToken],
    projectController.getProjectById
  );

  // تحديث مشروع (للمديرين والمسؤولين فقط)
  app.put(
    "/api/projects/:id",
    [authJwt.verifyToken, authJwt.isManagerOrAdmin],
    projectController.updateProject
  );

  // حذف مشروع (للمسؤولين فقط)
  app.delete(
    "/api/projects/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    projectController.deleteProject
  );

  // الحصول على مهام مشروع معين
  app.get(
    "/api/projects/:id/tasks",
    [authJwt.verifyToken],
    projectController.getProjectTasks
  );

  // الحصول على أعضاء مشروع معين
  app.get(
    "/api/projects/:id/members",
    [authJwt.verifyToken],
    projectController.getProjectMembers
  );
};
 2b0a9f9b4d2e9bb813b65913e8a13d68f81842e9
