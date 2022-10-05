const connection = require("../models/index");
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.getUserAppointments = (req, res) => {
    const userId = req.userId;
    connection.query("SELECT * FROM appointments WHERE clientUserId = ?", [userId], (err, result) => {
        if (err) {
            res.status(500).send({message: err.message})
        } else {
            res.status(200).send(result)
        }
    })
}

exports.getAdminAppointments = (req, res) => {
    const userId = req.userId;
    connection.query("SELECT * FROM appointments WHERE hostUserId = ?", [userId], (err, result) => {
        if (err) {
            res.status(500).send({message: err.message})
        } else {
            res.status(200).send(result)
        }
    })
}

exports.createUserAppointment = (req, res) => {
    const userId = req.userId;
    connection.query("INSERT INTO appointments (datetime, clientUserId, hostUserId, length) VALUES (?, ?, ?, ?)",
    [req.body.datetime, userId, req.body.hostId, req.body.length], (err, result) => {
        if (err) {
            res.status(400).send({message: err.message})
        } else {
            res.status(200).send(result)
        }
    })
}

exports.createAdminAppointment = (req, res) => {
    const userId = req.userId;
    connection.query("INSERT INTO appointments (datetime, clientUserId, hostUserId, length, accepted) VALUES (?, ?, ?, ?, ?)",
    [req.body.datetime, req.body.userId, userId, req.body.length, 1], (err, result) => {
        if (err) {
            res.status(400).send({message: err.message})
        } else {
            res.status(200).send(result)
        }
    })
}

exports.acceptAppointment = (req, res) => {
    connection.query("UPDATE appointments SET accepted = 1 WHERE id = ?", [req.body.appointmentId], (err, result) => {
        if (err) {
            res.status(400).send({message: error.message})
        } else {
            res.status(200).send(result)
        }
    })
}
