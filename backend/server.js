const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(cors());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
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
});

const Users = mongoose.model("user", userSchema);

app.post("/login", (req, res) => {
  Users.findOne({ username: req.body.username }, (err) => {
    if (err) throw err;
    else {
      res.send({ success: "802" });
    }
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
