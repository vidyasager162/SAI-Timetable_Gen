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

const departmentSchema = new mongoose.Schema({
  dept_id: String,
  dept_name: String,
});

const courseSchema = new mongoose.Schema({
  course_id: String,
  course_name: String,
  department: String,
});

const subjectSchema = new mongoose.Schema({
  sub_id: String,
  sub_name: String,
  course: String,
});

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  courses: [String],
  subjects: [String],
  department: String,
  semester: Number,
  password: String,
  email: String,
  usertype: Number,
  cookieID: String,
});

const quoteSchema = new mongoose.Schema({
  quote_id: Number,
  quote: String,
});

const Departments = mongoose.model("department", departmentSchema);
const Courses = mongoose.model("course", courseSchema);
const Subjects = mongoose.model("subject", subjectSchema);
const Users = mongoose.model("user", userSchema);
const Quotes = mongoose.model("quote", quoteSchema);

//Quotes.insertMany(quotes);

// Users.findOne({ username: "vs" }, (err, user) => {
//   if (err) throw err;
//   else console.log("user: ", user);
// });

app.post("/gen-quote", (req, res) => {
  Quotes.findOne({ quote_id: req.body.quote_id }, (err, quoteFound) => {
    if (err) throw err;
    else if (quoteFound) {
      res.send({
        message: "902",
        quote: quoteFound,
      });
    }
  });
});

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

// let quotes = [
//   {
//     quote_id: 1,
//     quote: "Love All, Serve All",
//   },
//   {
//     quote_id: 2,
//     quote: "Help Ever, Hurt Never",
//   },
//   {
//     quote_id: 3,
//     quote: "Life is a challenge, meet it!",
//   },
//   {
//     quote_id: 4,
//     quote: "Life is a dream, realize it!",
//   },
//   {
//     quote_id: 5,
//     quote: "Life is a game, play it!",
//   },
//   {
//     quote_id: 6,
//     quote: "Life is love, enjoy it!",
//   },
//   {
//     quote_id: 7,
//     quote: "Study to be steady",
//   },
//   {
//     quote_id: 8,
//     quote: "Gratitude is our life-breath",
//   },
//   {
//     quote_id: 9,
//     quote: "Work is worship. Duty is God",
//   },
// ];
