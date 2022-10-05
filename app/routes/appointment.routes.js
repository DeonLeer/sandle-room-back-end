const { authJwt } = require("../middleware");
const controller = require("../controllers/appointment.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get('/api/appointments/get/user', [authJwt.verifyToken], controller.getUserAppointments)

  app.get('/api/appointments/get/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.getAdminAppointments)

  app.post('/api/appointments/create/user', [authJwt.verifyToken], controller.createUserAppointment)

  app.post('/api/appointments/create/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.createAdminAppointment)

  app.post('/api/appointments/accept/admin', [authJwt.verifyToken, authJwt.isAdmin, controller.acceptAppointment])
};
