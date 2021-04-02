require("dotenv").config();

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import db from "./models";
import Role from "./models/role.model";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Connnect to database
const env = process.env.ENVIRONMENT || "dev";
if (env === "prod") {
  db.sequelize.sync();
} else if (env === "dev") {
  // force: true will drop the table if it already exists
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and Resync Database with { force: true }");
    Role.create({
      id: 1,
      name: "user",
    });
    Role.create({
      id: 2,
      name: "moderator",
    });
    Role.create({
      id: 3,
      name: "admin",
    });
  });
}

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Mahala!" });
});

// Routes
authRoutes(app);
userRoutes(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
