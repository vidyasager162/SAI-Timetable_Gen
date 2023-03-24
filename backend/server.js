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

let quotes = [
  {
    quote_id: 1,
    quote: "Love All, Serve All",
  },
  {
    quote_id: 2,
    quote: "Help Ever, Hurt Never",
  },
  {
    quote_id: 3,
    quote: "Life is a challenge, meet it!",
  },
  {
    quote_id: 4,
    quote: "Life is a dream, realize it!",
  },
  {
    quote_id: 5,
    quote: "Life is a game, play it!",
  },
  {
    quote_id: 6,
    quote: "Life is love, enjoy it!",
  },
  {
    quote_id: 7,
    quote: "Study to be steady",
  },
  {
    quote_id: 8,
    quote: "Gratitude is our life-breath",
  },
  {
    quote_id: 9,
    quote: "Work is worship. Duty is God",
  },
];

const departmentSchema = new mongoose.Schema({
  dept_id: String,
  dept_name: String,
});

const courseSchema = new mongoose.Schema({
  course_id: String,
  course_name: String,
  dept_id: String,
});

const subjectSchema = new mongoose.Schema({
  sub_id: String,
  sub_name: String,
  course_id: String,
});

const teacherSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  coursesTaught: [String],
  subjectsTaught: [String],
  department: String,
  usertype: Number,
  cookieID: String,
});

const studentSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  course: String,
  subjects: [String],
  department: String,
  usertype: Number,
  cookieID: String,
});

const scheduleSchema = new mongoose.Schema({
  schedule_id: String,
  schedule: [[String]],
});

const quoteSchema = new mongoose.Schema({
  quote_id: Number,
  quote: String,
});

const Departments = mongoose.model("department", departmentSchema);
const Courses = mongoose.model("course", courseSchema);
const Subjects = mongoose.model("subject", subjectSchema);
const Teachers = mongoose.model("teacher", teacherSchema);
const Students = mongoose.model("student", studentSchema);
const teacherSchedules = mongoose.model("teacherSchedule", scheduleSchema);
const studentSchedules = mongoose.model("studentSchedule", scheduleSchema);
const Quotes = mongoose.model("quote", quoteSchema);

Subjects.findOne({ sub_id: "Free" }, (err, subjectFound) => {
  if (!err) {
    if (!subjectFound) {
      Subjects.create({
        sub_id: "Free",
        sub_name: "Free",
      });
    }
  } else {
    console.log(err);
  }
});

Quotes.find({}, (err, quotesFound) => {
  if (!err) {
    if (quotesFound.length === 0) {
      Quotes.insertMany(quotes);
    }
  } else {
    console.log(err);
  }
});

Teachers.find({}, (err, userFound) => {
  if (!err) {
    if (userFound.length === 0) {
      Teachers.create({
        name: "Master User",
        username: "master",
        password: "2732",
        email: "master@mdh.edu.in",
        usertype: 9,
      });
    }
  } else {
    console.log(err);
  }
});

app.get("/check-master", (req, res) => {
  Teachers.findOne({ username: "master" }, (err, masterFound) => {
    if (!masterFound) {
      Teachers.create({
        name: "Master User",
        username: "master",
        password: "2732",
        email: "master@mdh.edu.in",
        usertype: 9,
      });
    }
  });
});

app.get("/get-teachers", (req, res) => {
  Teachers.find({}, (err, teachers) => {
    if (err) throw err;
    else if (teachers) {
      res.send({
        message: "902",
        teachers: teachers,
      });
    }
  });
});

app.get("/get-students", (req, res) => {
  Students.find({}, (err, students) => {
    if (err) throw err;
    else if (students) {
      res.send({
        message: "902",
        students: students,
      });
    }
  });
});

app.get("/gen-quote", (req, res) => {
  let number = Math.floor(Math.random() * 10);
  Quotes.findOne({ quote_id: number }, (err, quoteFound) => {
    if (err) throw err;
    else if (quoteFound) {
      res.send({
        message: "902",
        quote: quoteFound,
      });
    }
  });
});

app.get("/get-departments", (req, res) => {
  Departments.find((err, departmentsFound) => {
    if (err) throw err;
    else if (departmentsFound) {
      res.send({
        message: "902",
        departments: departmentsFound,
      });
    }
  });
});

app.get("/get-courses", (req, res) => {
  Courses.find((err, coursesFound) => {
    if (err) throw err;
    else if (coursesFound) {
      res.send({
        message: "902",
        courses: coursesFound,
      });
    }
  });
});

app.get("/get-subjects", (req, res) => {
  Subjects.find((err, subjectsFound) => {
    if (err) throw err;
    else if (subjectsFound) {
      res.send({
        message: "902",
        subjects: subjectsFound,
      });
    }
  });
});

app.get("/get-teacherschedules", (req, res) => {
  teacherSchedules.find((err, schedulesFound) => {
    if (err) throw err;
    else if (schedulesFound) {
      res.send({
        message: "902",
        teacherschedules: schedulesFound,
      });
    }
  });
});

app.get("/get-studentschedules", (req, res) => {
  studentSchedules.find((err, schedulesFound) => {
    if (err) throw err;
    else if (schedulesFound) {
      res.send({
        message: "902",
        studentschedules: schedulesFound,
      });
    }
  });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  Teachers.findOne({ username: req.body.username }, (err, teacherFound) => {
    if (!teacherFound) {
      Students.findOne(
        { username: req.body.username },
        (error, studentFound) => {
          if (error) throw error;
          else if (studentFound) {
            console.log(studentFound);
            if (req.body.password === studentFound.password) {
              studentFound.cookieID = req.body.cookieID;
              studentFound.save();
              res.send({
                message: "802",
                user: studentFound,
              });
            } else {
              res.send({
                message: "801",
              });
            }
          } else if (!studentFound) {
            res.send({
              message: "800",
            });
          }
        }
      );
    } else if (teacherFound) {
      console.log(teacherFound);
      if (req.body.password === teacherFound.password) {
        teacherFound.cookieID = req.body.cookieID;
        teacherFound.save();
        res.send({
          message: "802",
          user: teacherFound,
        });
      } else {
        res.send({
          message: "801",
        });
      }
    } else if (!teacherFound) {
      res.send({
        message: "800",
      });
    }
  });
});

app.post("/retain-session", (req, res) => {
  Teachers.findOne(
    {
      username: req.body.username,
    },
    (err, teacherFound) => {
      if (!teacherFound) {
        Students.findOne(
          {
            username: req.body.username,
          },
          (error, studentFound) => {
            if (error) throw error;
            else if (studentFound) {
              if (studentFound.cookieID === req.body.cookieID) {
                res.send({
                  message: "802",
                  user: studentFound,
                });
              } else {
                res.send({
                  message: "800",
                });
              }
            }
          }
        );
      } else if (teacherFound) {
        if (teacherFound.cookieID === req.body.cookieID) {
          res.send({
            message: "802",
            user: teacherFound,
          });
        }
      } else {
        res.send({
          message: "800",
        });
      }
    }
  );
});

app.post("/add-department", (req, res) => {
  Departments.create(
    {
      dept_id: req.body.dept_id,
      dept_name: req.body.dept_name,
    },
    (err) => {
      if (err) throw err;
      else {
        res.send({
          message: "702",
        });
      }
    }
  );
});

app.post("/add-course", (req, res) => {
  Courses.create(
    {
      course_id: req.body.course_id,
      course_name: req.body.course_name,
      dept_id: req.body.dept_id,
    },
    (err) => {
      if (err) throw err;
      else {
        res.send({
          message: "702",
        });
      }
    }
  );
});

app.post("/add-subject", (req, res) => {
  Subjects.create(
    {
      sub_id: req.body.sub_id,
      sub_name: req.body.sub_name,
      course_id: req.body.course_id,
    },
    (err) => {
      if (err) throw err;
      else {
        res.send({
          message: "702",
        });
      }
    }
  );
});

app.post("/add-teacher", (req, res) => {
  Teachers.create(
    {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      coursesTaught: req.body.coursesTaught,
      subjectsTaught: req.body.subjectsTaught,
      department: req.body.department,
      usertype: req.body.usertype,
    },
    (err) => {
      if (err) throw err;
      else {
        console.log(req.body);
        res.send({
          message: "702",
        });
      }
    }
  );
});

app.post("/add-student", (req, res) => {
  Students.create(
    {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      course: req.body.course,
      subjects: req.body.subjects,
      department: req.body.department,
      usertype: req.body.usertype,
    },
    (err) => {
      if (err) throw err;
      else {
        console.log(req.body);
        res.send({
          message: "702",
        });
      }
    }
  );
});

app.post("/request-studentschedule", (req, res) => {
  studentSchedules.find(
    { schedule_id: req.body.schedule_id },
    (err, scheduleFound) => {
      if (err) throw err;
      else if (scheduleFound) {
        res.send({
          message: "902",
          schedule: scheduleFound,
        });
      }
    }
  );
});

app.post("/request-teacherschedule", (req, res) => {
  teacherSchedules.find(
    { schedule_id: req.body.schedule_id },
    (err, scheduleFound) => {
      if (err) throw err;
      else if (scheduleFound) {
        res.send({
          message: "902",
          schedule: scheduleFound,
        });
      }
    }
  );
});

app.post("/create-schedule", (req, res) => {
  console.log(req.body);
  teacherSchedules.find({ schedule_id: req.body.schedule_id });
  res.send({
    message: "702",
  });
});

app.post("/delete-schedule", (req, res) => {
  console.log(req.body);
  teacherSchedules.findOneAndDelete(
    { schedule_id: req.body.schedule_id },
    (err) => {
      if (err) throw err;
      else {
        Teachers.find(
          { username: req.body.schedule_id },
          (err, teacherFound) => {
            if (teacherFound) {
              teacherFound.map((teacher) => {
                studentSchedules.findOneAndDelete({
                  schedule_id: teacher.coursesTaught,
                });
              });
            }
          }
        );
      }
    }
  );
});

app.post("/delete-subject", (req, res) => {
  Subjects.deleteOne(
    {
      sub_id: req.body.sub_id,
    },
    (err) => {
      if (err) throw err;
      else console.log("Deleted " + req.body.sub_id + " successfully");
    }
  );
});

app.post("/delete-course", (req, res) => {
  Courses.deleteOne(
    {
      course_id: req.body.course_id,
    },
    (err) => {
      if (err) throw err;
      else console.log("Deleted " + req.body.course_id + " successfully");
    }
  );
  Subjects.deleteMany({ course_id: req.body.course_id }, (err) => {
    if (err) throw err;
  });
});

app.post("/delete-department", (req, res) => {
  Departments.deleteOne(
    {
      dept_id: req.body.dept_id,
    },
    (err) => {
      if (err) throw err;
      else console.log("Deleted " + req.body.dept_id + " successfully");
    }
  );
  Courses.find(
    {
      dept_id: req.body.dept_id,
    },
    (err, coursesFound) => {
      if (err) throw err;
      else {
        coursesFound.map((course) => {
          Subjects.deleteMany({ course_id: course }, (err) => {
            if (err) throw err;
          });
        });
        Courses.deleteMany({ dept_id: req.body.dept_id }, (err) => {
          if (err) throw err;
        });
      }
    }
  );
});

app.post("/edit-subject", (req, res) => {
  console.log(req.body);
});
app.post("/edit-course", (req, res) => {
  console.log(req.body);
});
app.post("/edit-department", (req, res) => {
  console.log(req.body);
});

app.post("/delete-user", (req, res) => {
  Teachers.findOneAndDelete({ username: req.body.user_id }, (err, found) => {
    if (!found) {
      Students.findOneAndDelete({ username: req.body.user_id }, (error) => {
        if (error) throw error;
      });
    }
  });
});

app.post("/get-user", (req, res) => {
  Teachers.findOne(
    {
      name: req.body.name,
    },
    (err, teacherFound) => {
      if (!teacherFound) {
        Students.findOne(
          {
            name: req.body.name,
          },
          (error, studentFound) => {
            if (error) throw error;
            else if (studentFound) {
              res.send({
                message: "802",
                user: studentFound,
              });
            } else {
              res.send({
                message: "800",
              });
            }
          }
        );
      } else if (teacherFound) {
        res.send({
          message: "802",
          user: teacherFound,
        });
      } else {
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
