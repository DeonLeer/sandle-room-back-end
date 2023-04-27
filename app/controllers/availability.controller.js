const connection = require("../models/index");

exports.getDefaultAvailability = (req, res) => {
	console.log("here");
	connection.query(`SELECT * FROM default_availability`, (err, result) => {
		if (err) {
			res.status(400).send({ message: err.message });
		} else {
			res.status(200).send(result);
		}
	});
};

exports.createDefaultAvailability = (req, res) => {
	connection.query(
		"INSERT INTO default_availability (hostId, startTime, endTime, weekday) VALUES (?, ?, ?, ?)",
		[req.userId, req.body.startTime, req.body.endTime, req.body.weekday],
		(err, result) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(200).send(result);
			}
		}
	);
};

exports.editDefaultAvailability = (req, res) => {
	res.status(200);
};

exports.deleteDefaultAvailability = (req, res) => {
	connection.query(
		`DELETE FROM default_availability WHERE id = ? AND hostUserId = ${req.userId}`,
		[req.body.id],
		(err, result) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(400).send(result);
			}
		}
	);
};

exports.getAvailabilitiesByMonth = (req, res) => {
	connection.query(
		"SELECT * FROM custom_availabilities WHERE MONTH(startTime) = ? AND YEAR(startTime) = ? AND hostId = ?",
		[req.body.month, req.body.year, req.body.hostId],
		(err, custom_availabilities) => {
			if (err) {
				res.status(400).send(err);
			} else {
				connection.query("SELECT * FROM default_availabilities WHERE hostId = ?", [req.body.hostId],
				(err, default_availabilities) => {
					if (err) {
						res.status(400).send(err);
					} else {
						connection.query("SELECT * FROM canceled_availabilities WHERE MONTH(date) = ? AND YEAR(date) = ? AND hostId = ?",
						[req.body.month, req.body.year, req.body.hostId],
						(err, canceled_availabilities) => {
							if (err) {
								res.status(400).send(err);
							} else {
								connection.query("SELECT * FROM appointments WHERE MONTH(date) = ? AND YEAR(date) = ? AND hostId = ?",
								[req.body.month, req.body.year, req.body.hostId],
								(err, appointments) => {
									if (err) {
										res.status(400).send(err);
									} else {
										let days = new Date(req.body.year, req.body.month, 0).getDate();
										let availabilities = {};
										for (let i = 1; i <= days; i++) {
											
										}
									}
								})
							}
						})
					}
				})
			}
		}
	);
};

exports.createAvailability = (req, res) => {
	connection.query(
		"INSERT INTO availability (hostId, startTime, endTime, available) VALUES (?, ?, ?, ?)",
		[req.userId, req.body.startTime, req.body.endTime, req.body.available],
		(err, result) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(200).send(result);
			}
		}
	);
};

exports.editAvailability = (req, res) => {
	res.status(200);
};

exports.deleteAvailability = (req, res) => {
	connection.query(
		`DELETE FROM availability WHERE id = ? AND hostUserId = ${req.userId}`,
		[req.body.id],
		(err, result) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(400).send(result);
			}
		}
	);
};
