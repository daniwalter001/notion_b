require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const { taskRouter } = require("./routers/TaskRouter");

const salt = parseInt(process.env.BCRYPT_SALT);

global.__basedir = __dirname;
app.use(bodyParser.json());
app.use(cors());

//Base de donnés et Models
require("./db")
  .initiate()
  .then(() => {
    try {
      require("./models/index").initModels();
    } catch (error) {
      console.log({ error });
    }
  });

//routes
app.get("/", (req, res) => {
  res.status(200).send(".ok");
});

app.use("/task", taskRouter);

app.get("/crypt/:pwd", (req, res) => {
  const pwd = req.params.pwd;
  res.status(200).json({
    pwd_hashed: bcrypt.hashSync(pwd, salt),
  });
  return;
});

//listen
app
  .get("/mail", (req, res) => {
    res.sendFile(path.join(__dirname, "mail.html"));
  })
  .listen(process.env.PORT, () => {
    console.log("The server is working");
  });

// error fallback route
app.use((err, req, res, next) => {
  console.log("err");
  if (err) {
    res.status(200).json({
      message: err.message,
      status: "failed",
    });
  }
});
