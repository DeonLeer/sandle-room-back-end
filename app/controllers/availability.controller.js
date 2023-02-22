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
		"SELECT * FROM availability WHERE MONTH(startTime) = ? AND YEAR(startTime) = ? ",
		[req.body.month, req.body.year],
		(err, result) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(200).send(result);
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
