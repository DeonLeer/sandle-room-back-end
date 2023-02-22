exports.allAccess = (req, res) => {
	res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
	res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
	res.status(200).send("Admin Content.");
};

exports.getClient = (req, res) => {
	const clientId = req.query.clientId;
	const query = `users.firstName, users.lastName, users.email, users.phone, patient_info.*
  FROM users JOIN patient_info ON users.id = patient_info.userId
  WHERE users.id = ${clientId} AND users.role = 1 LIMIT 1`;
	connection.query(query, (err, result) => {
		if (err) {
			res.status(400).send({ message: err.message });
		} else {
			res.status(200).send(result);
		}
	});
};

exports.getClients = (req, res) => {
	const query =
		"SELECT users.id, users.firstName, users.lastName, users.email, users.phone FROM users WHERE role = 1";
	connection.query(query, (err, result) => {
		if (err) {
			res.status(400).send({ message: err.message });
		} else {
			res.status(200).send(result);
		}
	});
};

exports.createPatientInfo = (req, res) => {
	connection.query(
		`INSERT INTO patient_info (userId, address, phoneNumber, province, postalCode, birthDate, gender, guardian, emergencyContact, emergencyContactPhone, emergencyContactRelationship, occupation, previousCounselling, relevantlnfo, goals)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
		[
			req.body.userId,
			req.body.address,
			req.body.phoneNumber,
			req.body.province,
			req.body.postalCode,
			req.body.birthDate,
			req.body.gender,
			req.body.guardian,
			req.body.emergencyContact,
			req.body.emergencyContactPhone,
			req.body.emergencyContactRelationship,
			req.body.occupation,
			req.body.previousCounselling,
			req.body.relevantlnfo,
			req.body.goals,
		],
		(err, result) => {
			if (err) {
				res.status(400).send({ message: err.message });
			} else {
				res.status(200).send({
					message: "Patient info saved succesfully",
				});
			}
		}
	);
};

exports.editPatientInfo = (req, res) => {
	let newValues = [
		...(req.body.address ? ["address", req.body.address] : []),
		...(req.body.phoneNumber ? ["phoneNumber", req.body.phoneNumber] : []),
		...(req.body.province ? ["province", req.body.province] : []),
		...(req.body.postalCode ? ["postalCode", req.body.postalCode] : []),
		...(req.body.birthDate ? ["birthDate", req.body.birthDate] : []),
		...(req.body.gender ? ["gender", req.body.gender] : []),
		...(req.body.guardian ? ["guardian", req.body.guardian] : []),
		...(req.body.emergencyContact
			? ["emergencyContact", req.body.emergencyContact]
			: []),
		...(req.body.emergencyContactPhone
			? ["emergencyContactPhone", req.body.emergencyContactPhone]
			: []),
		...(req.body.emergencyContactRelationship
			? [
					"emergencyContactRelationship",
					req.body.emergencyContactRelationship,
			  ]
			: []),
		...(req.body.occupation ? ["occupation", req.body.occupation] : []),
		...(req.body.previousCounselling
			? ["previousCounselling", req.body.previousCounselling]
			: []),
		...(req.body.relevantlnfo
			? ["relevantInfo", req.body.relevantlnfo]
			: []),
		...(req.body.goals ? ["goals", req.body.goals] : []),
	];
	let queryValues = "";
	let i = 0;
	let valueArray = [];
	while (i < newValues.length - 1) {
		valueArray.push(newValues[i + 1]);
		if (i === newValues.length - 2) {
			queryValues = queryValues + newValues[i] + " = ?";
		} else {
			queryValues = queryValues + newValues[i] + " = ?, ";
		}
		i = i + 2;
	}
	valueArray.push(req.body.id);
	connection.query(
		`UPDATE patient_info SET ${questionMarks} WHERE id = ?`,
		valueArray,
		(err, result) => {
			if (err) {
				res.status(400).send({ message: err.message });
			} else {
				res.status(200).send({
					message: "Patient Info Saved Successfully",
				});
			}
		}
	);
};

exports.getHosts = (req, res) => {
	const query =
		"SELECT users.id, users.firstName, users.lastName, users.email, users.phone FROM users WHERE role = 2";
	connection.query(query, (err, result) => {
		if (err) {
			res.status(400).send({ message: err.message });
		} else {
			res.status(200).send(result);
		}
	});
};
