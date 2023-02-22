const connection = require("../models/index");
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
	// Save User to Database
	connection.query(
		"INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
		[
			req.body.firstname,
			req.body.lastname,
			req.body.email,
			bcrypt.hashSync(req.body.password, 8),
		],
		(err, result) => {
			if (err) {
				res.status(400).send({ message: err.message });
			} else {
				res.status(200).send({
					message: "User was registered successfully!",
				});
			}
		}
	);
};

exports.signin = (req, res) => {
	connection.query(
		"SELECT * FROM users WHERE email = ?",
		[req.body.email],
		(err, result) => {
			if (err) {
				res.status(400).send({ message: "Invalid Login" });
			} else {
				const user = result[0];
				const passwordIsValid = bcrypt.compareSync(
					req.body.password,
					user.password
				);
				if (passwordIsValid) {
					res.status(200).send({
						id: user.id,
						firstname: user.firstName,
						lastname: user.lastName,
						email: user.email,
						roles: user.role,
						phone: user.phone,
						accessToken: token,
					});
				} else {
					res.status(401).send({ message: "Invalid login" });
				}
			}
		}
	);
};

exports.changePassword = (req, res) => {
	connection.query(
		"SELECT * FROM users WHERE email = ?",
		[req.body.email],
		(err, result) => {
			if (err) {
				res.status(400).send({ message: "Invalid Login" });
			} else {
				const user = result[0];
				const passwordIsValid = bcrypt.compareSync(
					req.body.password,
					user.password
				);
				if (passwordIsValid) {
					connection.query(
						"UPDATE users SET password = ? WHERE email = ?",
						[
							bcrypt.hashSync(req.body.newPassword, 8),
							req.body.email,
						],
						(err, result) => {
							if (err) {
								res.status(400).send({ message: err.message });
							} else {
								res.status(200).send({
									message: "Password Changed Succesfully",
								});
							}
						}
					);
				} else {
					res.status(401).send({ message: "Invalid login" });
				}
			}
		}
	);
};
