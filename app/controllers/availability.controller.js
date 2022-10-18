const connection = require("../models/index");

exports.getDefaultAvailability = (req, res) => {
    console.log('here')
    connection.query(`SELECT * FROM default_availability`, (err, result) => {
      if (err) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(200).send(result);
      }
    });
}

exports.modifyDefaultAvailabilities = (req, res) => {
  res.status(200)
}

exports.getAvailabilitiesByMonth = (req, res) => {
  res.status(200)
}

exports.createAvailability = (req, res) => {
  res.status(200)
}

exports.editAvailability = (req, res) => {
  res.status(200)
}

exports.deleteAvailability = (req, res) => {
  res.status(200)
}

