const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');

const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });
  

function initial() {
Role.create({
    id: 1,
    name: "user"
});

Role.create({
    id: 2,
    name: "admin"
});
}

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });

app.listen(8080, () =>
    console.log("API is running on http://localhost:8080")
);
