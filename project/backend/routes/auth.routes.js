const { verifySignUp } = require("../middleware");
const authController = require("../controllers/auth.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // تسجيل مستخدم جديد
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );

  // تسجيل الدخول
  app.post("/api/auth/signin", authController.signin);

  // تحديث بيانات المستخدم
  app.put(
    "/api/auth/update",
    [authJwt.verifyToken],
    authController.updateUser
  );

  // تغيير كلمة المرور
  app.post(
    "/api/auth/change-password",
    [authJwt.verifyToken],
    authController.changePassword
  );

  // الحصول على معلومات المستخدم الحالي
  app.get(
    "/api/auth/user",
    [authJwt.verifyToken],
    authController.getCurrentUser
  );
};