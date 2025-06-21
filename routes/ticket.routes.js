 HEAD
// ticket routes placeholder
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Ticket route');
});

module.exports = router;

const { authJwt } = require("../middleware");
const ticketController = require("../controllers/ticket.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // إنشاء تذكرة جديدة
  app.post(
    "/api/tickets",
    [authJwt.verifyToken],
    ticketController.createTicket
  );

  // الحصول على جميع التذاكر (للموظفين والمسؤولين فقط)
  app.get(
    "/api/tickets",
    [authJwt.verifyToken, authJwt.isEmployeeOrAdmin],
    ticketController.getAllTickets
  );

  // الحصول على تذاكر المستخدم الحالي
  app.get(
    "/api/users/tickets",
    [authJwt.verifyToken],
    ticketController.getUserTickets
  );

  // تعيين تذكرة لموظف (للمديرين والمسؤولين فقط)
  app.put(
    "/api/tickets/:id/assign",
    [authJwt.verifyToken, authJwt.isManagerOrAdmin],
    ticketController.assignTicket
  );

  // تحديث حالة التذكرة
  app.put(
    "/api/tickets/:id/status",
    [authJwt.verifyToken],
    ticketController.updateTicketStatus
  );

  // تحديث تفاصيل التذكرة
  app.put(
    "/api/tickets/:id",
    [authJwt.verifyToken],
    ticketController.updateTicket
  );

  // إضافة تعليق على التذكرة
  app.post(
    "/api/tickets/:id/comments",
    [authJwt.verifyToken],
    ticketController.addTicketComment
  );

  // الحصول على تعليقات التذكرة
  app.get(
    "/api/tickets/:id/comments",
    [authJwt.verifyToken],
    ticketController.getTicketComments
  );

  // الحصول على تذكرة معينة
  app.get(
    "/api/tickets/:id",
    [authJwt.verifyToken],
    ticketController.getTicketById
  );
};
 2b0a9f9b4d2e9bb813b65913e8a13d68f81842e9
