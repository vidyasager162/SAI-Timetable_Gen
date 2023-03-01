const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/projectDB");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  email: String,
  usertype: Number,
  cookieID: String,
});

const Users = mongoose.model("user", userSchema);

// Users.findOne({ username: "vs" }, (err, user) => {
//   if (err) throw err;
//   else console.log("user: ", user);
// });

app.post("/login", (req, res) => {
  console.log(req.body);
  Users.findOne({ username: req.body.username }, (err, userFound) => {
    if (err) throw err;
    else if (userFound) {
      console.log(userFound);
      if (req.body.password === userFound.password) {
        userFound.cookieID = req.body.cookieID;
        userFound.save();
        res.send({
          message: "802",
          user: userFound,
        });
      } else {
        res.send({
          message: "801",
        });
      }
    } else if (!userFound) {
      res.send({
        message: "800",
      });
    }
  });
});

app.post("/retain-session", (req, res) => {
  Users.findOne(
    {
      username: req.body.username,
    },
    (err, userFound) => {
      if (err) throw err;
      else if (userFound) {
        if (userFound.cookieID === req.body.cookieID) {
          res.send({
            message: "802",
            user: userFound,
          });
        }
      } else if (!userFound) {
        res.send({
          message: "800",
        });
      }
    }
  );
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
