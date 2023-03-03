const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
		next();
	});

	app.get("/api/test/all", controller.allAccess);

	app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

	app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

	app.get("/api/users/client", [authJwt.verifyToken, authJwt.isAdmin], controller.getClient);

	app.get("/api/users/clients", [authJwt.verifyToken, authJwt.isAdmin], controller.getClients);

	app.get("/api/users/hosts", [authJwt.verifyToken], controller.getHosts);

	app.post("/api/users/client", [authJwt.verifyToken], controller.createPatientInfo);

	app.patch("/api/users/client", [authJwt.verifyToken], controller.editPatientInfo);
};
