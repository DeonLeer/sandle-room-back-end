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

	app.get(
		"/api/appointments",
		[authJwt.verifyToken],
		controller.getAppointments
	);

	app.post(
		"/api/appointments",
		[authJwt.verifyToken],
		controller.createAppointment
	);

	app.patch(
		"/api/appointments",
		[authJwt.verifyToken],
		controller.editAppointment
	);

	app.patch(
		"/api/appointments/notes",
		[authJwt.verifyToken, authJwt.isAdmin],
		controller.saveNotes
	);

	app.delete(
		"/api/appointments",
		[authJwt.verifyToken],
		controller.deleteAppointment
	);
};
