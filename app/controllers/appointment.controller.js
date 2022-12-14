const connection = require("../models/index");
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



exports.getAppointmentsByMonth = (req, res) => {
    const userId = req.userId;
    const isAdmin = req.roles.includes(2);
    const month = req.query.month;
    const year = req.query.year;
    const query = `
        SELECT appointments.datetime, ${isAdmin ?
        'clientUser.firstName, clientUser.lastName'
        :
        'hostUser.firstName, hostUser.lastName'
        }
        FROM appointments
        JOIN users AS hostUser ON appointments.hostUserId = hostUser.id
        JOIN users AS clientUser ON appointments.clientUserId = clientUser.id
        WHERE ${ isAdmin ? "host" : "client" }User.id = ${userId} AND appointments.datetime LIKE '${year}-${month}%'
    `;
    connection.query(query, (err, result) => {
      if (err) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(200).send(result);
      }
    });
}

exports.createAppointment = (req, res) => {
  
  let error = {error: false, message: ""};

  if (req.roles.includes(2)) {
    if (req.body.hostId != req.userId) {
      error.error = true;
      error.message = "Invalid appointment host"
    } else if (req.body.clientId == req.userId) {
      error.error = true;
      error.message = "Invalid appointment client"
    }
  } else {
    if (req.body.clientId != req.userId) {
      error.error = true;
      error.message = "Invalid appointment client"
    } else if (req.body.hostId == req.userId) {
      error.error = true;
      error.message = "Invalid appointment host"
    }
  }

  if (error.error === true) {
   res.status(400).send(error) 
  } else {
    connection.query("INSERT INTO appointments (clientUserId, hostUserId, startTime, endTime) VALUES (?, ?, ?, ?", [
      req.body.clientId, req.body.hostId, req.body.startTime, req.body.endTime
    ], (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(result)
      }
    })
  }




}

exports.editAppointment = (req, res) => {

  res.status(200)

}

exports.deleteAppointment = (req, res) => {

  connection.query(`DELETE FROM appointments WHERE id = ? AND ${req.body.includes(2) ? 'host' : 'client'}UserId = ${req.userId}`, [req.body.id], (err, result) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(400).send(result)
    }
  })

}

