const { authJwt } = require("../middleware");
const controller = require("../controllers/availability.controller");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get(
		"/api/availability/default",
		[authJwt.verifyToken],
		controller.getDefaultAvailability
	);

	app.post(
		"/api/availability/default",
		[authJwt.verifyToken],
		controller.createDefaultAvailability
	);

	app.patch(
		"api/availability/default",
		[authJwt.verifyToken],
		controller.editDefaultAvailability
	);

	app.delete(
		"/api/availability/default",
		[authJwt.verifyToken],
		controller.deleteDefaultAvailability
	);

	app.get(
		"/api/availability",
		[authJwt.verifyToken],
		controller.getAvailabilitiesByMonth
	);

	app.post(
		"/api/availability",
		[authJwt.verifyToken],
		controller.createAvailability
	);

	app.patch(
		"/api/availability",
		[authJwt.verifyToken],
		controller.editAvailability
	);

	app.delete(
		"/api/availability",
		[authJwt.verifyToken],
		controller.deleteAvailability
	);
};
