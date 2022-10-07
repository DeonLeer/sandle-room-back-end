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
    connection.query("SELECT * FROM appointments WHERE hostUserId = ? AND accepted = 1", [userId], (err, result) => {
        if (err) {
            res.status(500).send({message: err.message})
        } else {
            res.status(200).send(result)
        }
    })
}

exports.getRequestedAppointments = (req, res) => {
    const userId = req.userId;
    connection.query("SELECT * FROM appointments WHERE hostUserId = ? AND accepted = 0", [userId], (err, result) => {
        if (err) {
            res.status(500).send({message: err.message})
        } else {
            res.status(200).send(result)
        }
    })
}

exports.createUserAppointment = (req, res) => {
    const userId = req.userId;
    connection.query("INSERT INTO appointments (date, clientUserId, hostUserId, timeBlock) VALUES (?, ?, ?, ?)",
    [req.body.date, userId, req.body.hostId, req.body.timeblock], (err, result) => {
        if (err) {
            res.status(400).send({message: err.message})
        } else {
            res.status(200).send(result)
        }
    })
}

exports.createAdminAppointment = (req, res) => {
    const userId = req.userId;
    connection.query("INSERT INTO appointments (date, clientUserId, hostUserId, timeBlock, accepted) VALUES (?, ?, ?, ?, ?)",
    [req.body.date, req.body.userId, userId, req.body.timeblock, 1], (err, result) => {
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
            res.status(400).send({message: err.message})
        } else {
            res.status(200).send(result)
        }
    })
}
