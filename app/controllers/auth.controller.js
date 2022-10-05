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
        let newUserId = result.insertId;
        if (req.body.roles?.length) {
          let placeholder = [];
          let values = [];
          for (let id in req.body.roles) {
            placeholder.push("( ?, ? )");
            values.push(Number(id), newUserId);
          }
          connection.query(`INSERT INTO user_roles (roleId, userId) VALUES ${placeholder}`,
          values,
          (err, results) => {
              if (err) {
                res.status(400).send({ message: err.message });
              } else {
                res.status(200).send({ message: "User was registered successfully!" });
              }
            }
          );
        } else {
          connection.query(
            `INSERT INTO user_roles (roleId, userId) VALUES (?, ?)`,
            [1, newUserId],
            (err, results) => {
              if (err) {
                res.status(500).send({ message: "User was registered successfully but the user's role was not created" });
              } else {
                res.status(200).send({ message: "User was registered successfully!" });
              }
            }
          );
        }
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
          connection.query(
            "SELECT * FROM user_roles WHERE userId = ?",
            [user.id],
            (err, result) => {
              if (err)
                res.status(500).send({  message: "Roles not found for this user" });
              else {
                const roles = [];
                for (let role of result) {
                  roles.push(role.roleId);
                }
                const token = jwt.sign( { id: user.id, roles: roles },  config.secret, { expiresIn: 86400 * 14 } );
                res.status(200).send({
                  id: user.id,
                  firstname: user.firstName,
                  lastname: user.lastName,
                  email: user.email,
                  roles: roles,
                  accessToken: token,
                });
              }
            }
          );
        } else {
          res.status(401).send({message: 'Invalid login'})
        }
      }
    }
  );

  //     if (!passwordIsValid) {
  //       return res.status(401).send({
  //         accessToken: null,
  //         message: "Invalid Password!"
  //       });
  //     }

  //     var token = jwt.sign({ id: user.id }, config.secret, {
  //       expiresIn: 86400 // 24 hours
  //     });

  //     var authorities = [];
  //     user.getRoles().then(roles => {
  //       for (let i = 0; i < roles.length; i++) {
  //         authorities.push("ROLE_" + roles[i].name.toUpperCase());
  //       }
  //       res.status(200).send({
  //         id: user.id,
  //         firstname: user.firstname,
  //         lastname: user.lastname,
  //         email: user.email,
  //         roles: authorities,
  //         accessToken: token
  //       });
  //     });
  //   })
  //   .catch(err => {
  //     res.status(500).send({ message: err.message });
  //   });
};
