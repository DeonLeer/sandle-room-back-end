const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/appointment.routes")(app);
require("./app/routes/availability.routes")(app);

app.listen(8080, () => console.log("API is running on http://localhost:8080"));
