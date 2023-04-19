const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

const logSchema = new mongoose.Schema(
  {
    log: String,
  },
  { timestamps: true }
);

const Departments = mongoose.model("department", departmentSchema);
const Courses = mongoose.model("course", courseSchema);
const Subjects = mongoose.model("subject", subjectSchema);
const Teachers = mongoose.model("teacher", teacherSchema);
const Students = mongoose.model("student", studentSchema);
const teacherSchedules = mongoose.model("teacherSchedule", scheduleSchema);
const studentSchedules = mongoose.model("studentSchedule", scheduleSchema);
const Quotes = mongoose.model("quote", quoteSchema);
const Logs = mongoose.model("log", logSchema);

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

Teachers.find({}, async (err, userFound) => {
  const hashedPassword = await bcrypt.hash("2732", saltRounds);
  if (!err) {
    if (userFound.length === 0) {
      Teachers.create({
        name: "Master User",
        username: "master",
        password: hashedPassword,
        email: "master@mdh.edu.in",
        usertype: 9,
      });
    }
  } else {
    console.log(err);
  }
});

app.get("/check-master", async (req, res) => {
  const hashedPassword = await bcrypt.hash("2732", saltRounds);
  Teachers.findOne({ username: "master" }, (err, masterFound) => {
    if (!masterFound) {
      Teachers.create({
        name: "Master User",
        username: "master",
        password: hashedPassword,
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
        message: "success",
        teachers: teachers,
      });
    }
  }).sort({ name: 1 });
});

app.get("/get-students", (req, res) => {
  Students.find({}, (err, students) => {
    if (err) throw err;
    else if (students) {
      res.send({
        message: "success",
        students: students,
      });
    }
  }).sort({ username: 1 });
});

app.get("/gen-quote", (req, res) => {
  let number = Math.floor(Math.random() * 10);
  Quotes.findOne({ quote_id: number }, (err, quoteFound) => {
    if (err) throw err;
    else if (quoteFound) {
      res.send({
        message: "success",
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
        message: "success",
        departments: departmentsFound,
      });
    }
  }).sort({ dept_id: 1 });
});

app.get("/get-courses", (req, res) => {
  Courses.find((err, coursesFound) => {
    if (err) throw err;
    else if (coursesFound) {
      res.send({
        message: "success",
        courses: coursesFound,
      });
    }
  }).sort({ course_id: 1 });
});

app.get("/get-subjects", (req, res) => {
  Subjects.find((err, subjectsFound) => {
    if (err) throw err;
    else if (subjectsFound) {
      res.send({
        message: "success",
        subjects: subjectsFound,
      });
    }
  }).sort({ sub_id: 1 });
});

app.get("/get-teacherschedules", (req, res) => {
  teacherSchedules
    .find((err, schedulesFound) => {
      if (err) throw err;
      else if (schedulesFound) {
        res.send({
          message: "success",
          teacherschedules: schedulesFound,
        });
      }
    })
    .sort({ schedule_id: 1 });
});

app.get("/get-studentschedules", (req, res) => {
  studentSchedules
    .find((err, schedulesFound) => {
      if (err) throw err;
      else if (schedulesFound) {
        res.send({
          message: "success",
          studentschedules: schedulesFound,
        });
      }
    })
    .sort({ schedule_id: 1 });
});

app.get("/get-logs", (req, res) => {
  Logs.find((err, logsFound) => {
    if (err) throw err;
    else if (logsFound) {
      res.send({
        message: "success",
        logs: logsFound,
      });
    }
  }).sort({ createdAt: 1 });
});

app.post("/add-cohort", (req, res) => {
  let query = req.body.flag;
  if (query === "Department") {
    Departments.insertMany(req.body.payload, (err) => {
      if (err) throw err;
    });
  } else if (query === "Course") {
    Courses.insertMany(req.body.payload, (err) => {
      if (err) throw err;
      else {
        async function createEmptySchedules() {
          let myPromise = new Promise((resolve) => {
            let newschedule = [];
            for (let i = 0; i < 6; i++) {
              newschedule.push([]);
              for (let j = 0; j < 6; j++) {
                newschedule[i].push("Free");
              }
            }
            resolve(newschedule);
          });
          for (let i = 0; i < req.body.payload.length; i++) {
            studentSchedules.create({
              schedule_id: req.body.payload[i].course_id,
              schedule: await myPromise,
            });
          }
        }
        createEmptySchedules();
        res.send({ message: "success" });
      }
    });
  } else if (query === "Subject") {
    Subjects.insertMany(req.body.payload, (err) => {
      if (err) throw err;
      res.send({ message: "success" });
    });
  } else if (query === "Teacher") {
    for (let i = 0; i < req.body.payload.length; i++) {
      Teachers.findOne(
        { username: req.body.payload[i].username },
        (err, teacherFound) => {
          if (teacherFound) {
            console.log("teacher already exists");
          } else {
            Teachers.create(
              {
                name: req.body.payload[i].name,
                username: req.body.payload[i].username,
                password: req.body.payload[i].password,
                email: req.body.payload[i].email,
                coursesTaught: req.body.payload[i].coursesTaught.split(","),
                subjectsTaught: req.body.payload[i].subjectsTaught.split(","),
                department: req.body.payload[i].department,
                usertype: req.body.payload[i].usertype,
              },
              (err) => {
                if (err) throw err;
                res.send({ message: "success" });
              }
            );
          }
        }
      );
    }
  } else if (query === "Student") {
    let subs = null;
    let sub_ids = [];

    Subjects.find(
      { course_id: req.body.payload[0].course },
      (err, subsFound) => {
        subs = subsFound;
        subs.map((sub) => {
          sub_ids.push(sub.sub_id);
        });
      }
    );

    for (let i = 0; i < req.body.payload.length; i++) {
      Students.findOne(
        { username: req.body.payload[i].username },
        (err, studentFound) => {
          if (studentFound) {
            console.log("student already exists");
          } else {
            Students.create(
              {
                name: req.body.payload[i].name,
                username: req.body.payload[i].username,
                password: req.body.payload[i].password,
                email: req.body.payload[i].email,
                course: req.body.payload[i].course,
                subjects: sub_ids,
                department: req.body.payload[i].department,
                usertype: req.body.payload[i].usertype,
              },
              (err) => {
                if (err) throw err;
                res.send({ message: "success" });
              }
            );
          }
        }
      );
    }
  }
});

app.post("/login", (req, res) => {
  console.log(req.body);
  Teachers.findOne({ username: req.body.username }, (err, teacherFound) => {
    if (!teacherFound) {
      Students.findOne(
        //do bcrypt compare
        { username: req.body.username },
        (error, studentFound) => {
          if (error) throw error;
          else if (studentFound) {
            console.log(studentFound);
            if (req.body.password === studentFound.password) {
              studentFound.cookieID = req.body.cookieID;
              studentFound.save();
              const date = new Date().toLocaleTimeString();
              const day = new Date().toDateString();
              let logString =
                studentFound.name +
                " " +
                "logged in at " +
                date +
                " " +
                "on " +
                day +
                ".";
              Logs.create({ log: logString });
              res.send({
                message: "success",
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
        const date = new Date().toLocaleTimeString();
        const day = new Date().toDateString();
        let logString =
          teacherFound.name +
          " " +
          "logged in at " +
          date +
          " " +
          "on " +
          day +
          ".";
        Logs.create({ log: logString });
        res.send({
          message: "success",
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
                  message: "success",
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
            message: "success",
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
        const date = new Date().toLocaleTimeString();
        const day = new Date().toDateString();
        let logString =
          req.body.username +
          " " +
          "created department " +
          req.body.dept_id +
          " at " +
          date +
          " " +
          "on " +
          day +
          ".";
        Logs.create({ log: logString });
        res.send({
          message: "success",
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
        const date = new Date().toLocaleTimeString();
        const day = new Date().toDateString();
        let logString =
          req.body.username +
          " " +
          "created course " +
          req.body.course_id +
          " at " +
          date +
          " " +
          "on " +
          day +
          ".";
        Logs.create({ log: logString });
        res.send({
          message: "success",
        });
        studentSchedules.findOne(
          {
            schedule_id: req.body.course_id,
          },
          (err, scheduleFound) => {
            if (scheduleFound) {
              //don't do anything
            } else {
              async function createEmptySchedule() {
                let newschedule = [];
                let myPromise = new Promise((resolve) => {
                  for (let i = 0; i < 6; i++) {
                    newschedule.push([]);
                    for (let j = 0; j < 6; j++) {
                      newschedule[i].push("Free");
                    }
                  }
                  resolve(newschedule);
                });
                studentSchedules.create({
                  schedule_id: req.body.course_id,
                  schedule: await myPromise,
                });
              }
              createEmptySchedule();
            }
          }
        );
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
        const date = new Date().toLocaleTimeString();
        const day = new Date().toDateString();
        let logString =
          req.body.username +
          " " +
          "created subject " +
          req.body.sub_id +
          " at " +
          date +
          " " +
          "on " +
          day +
          ".";
        Logs.create({ log: logString });
        res.send({
          message: "success",
        });
      }
    }
  );
});

app.post("/add-teacher", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  Teachers.findOne({ username: req.body.username }, (err, teacherFound) => {
    if (teacherFound) {
      console.log("teacher already exists");
    } else {
      Teachers.create(
        {
          name: req.body.name,
          username: req.body.username,
          password: hashedPassword,
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
            const date = new Date().toLocaleTimeString();
            const day = new Date().toDateString();
            let logString =
              req.body.mastername +
              " " +
              "added teacher " +
              req.body.name +
              " at " +
              date +
              " " +
              "on " +
              day +
              ".";
            Logs.create({ log: logString });
            res.send({
              message: "success",
            });
          }
        }
      );
    }
  });
});

app.post("/add-student", async (req, res) => {
  let subs = null;
  let sub_ids = [];
  Subjects.find({ course_id: req.body.course }, (err, subsFound) => {
    subs = subsFound;
    subs.map((sub) => {
      sub_ids.push(sub.sub_id);
    });
  });
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  Students.findOne({ username: req.body.username }, (err, studentFound) => {
    if (studentFound) {
      console.log("student already exists");
    } else {
      Students.create(
        {
          name: req.body.name,
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          course: req.body.course,
          subjects: sub_ids,
          department: req.body.department,
          usertype: req.body.usertype,
        },
        (err) => {
          if (err) throw err;
          else {
            const date = new Date().toLocaleTimeString();
            const day = new Date().toDateString();
            let logString =
              req.body.mastername +
              " " +
              "added student " +
              req.body.name +
              " at " +
              date +
              " " +
              "on " +
              day +
              ".";
            Logs.create({ log: logString });
            res.send({
              message: "success",
            });
          }
        }
      );
    }
  });
});

app.post("/request-studentschedule", (req, res) => {
  studentSchedules.find(
    { schedule_id: req.body.schedule_id },
    (err, scheduleFound) => {
      if (err) throw err;
      else if (scheduleFound) {
        res.send({
          message: "success",
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
          message: "success",
          schedule: scheduleFound,
        });
      }
    }
  );
});

app.post("/create-schedule", (req, res) => {
  let schedule = [];
  let subjectsOfTeacher = [];
  schedule = req.body.schedule;
  teacherSchedules.findOne(
    { schedule_id: req.body.schedule_id },
    (err, scheduleFound) => {
      if (scheduleFound) {
        console.log("schedule already exists");
      } else {
        teacherSchedules.create({
          schedule_id: req.body.schedule_id,
          schedule: req.body.schedule,
        });
        const date = new Date().toLocaleTimeString();
        const day = new Date().toDateString();
        let logString =
          req.body.username +
          " " +
          "created " +
          req.body.teachername +
          "'s schedule" +
          " at " +
          date +
          " " +
          "on " +
          day +
          ".";
        Logs.create({ log: logString });
        res.send({ message: "success" });
      }
    }
  );
  Teachers.findOne({ username: req.body.schedule_id }, (err, teacherFound) => {
    if (teacherFound) {
      async function CreateSchedule() {
        for (let i = 0; i < teacherFound.coursesTaught.length; i++) {
          console.log(teacherFound.coursesTaught[i]);
          let newschedule = [];
          let subjects = [];
          let finalschedule = [];
          let ultimateschedule = [];
          let newPromise = new Promise((resolve) => {
            for (let i = 0; i < 6; i++) {
              newschedule.push([]);
              for (let j = 0; j < 6; j++) {
                newschedule[i].push("Free");
              }
            }
            studentSchedules.findOne(
              { schedule_id: teacherFound.coursesTaught[i] },
              (err, foundSchedule) => {
                if (foundSchedule) {
                  newschedule = foundSchedule.schedule;
                  resolve(newschedule);
                }
              }
            );
          });
          finalschedule = await newPromise;

          for (let j = 0; j < teacherFound.subjectsTaught.length; j++) {
            console.log(teacherFound.subjectsTaught[j]);
            let myPromise = new Promise(function (resolve) {
              Subjects.findOne(
                {
                  sub_id: teacherFound.subjectsTaught[j],
                  course_id: teacherFound.coursesTaught[i],
                },
                (err, subFound) => {
                  if (subFound) {
                    console.log("in if");
                    subjects.push(subFound.sub_id);
                    resolve(subjects);
                  } else if (!subFound) {
                    console.log("in else");
                    subjects.push("");
                    resolve(subjects);
                  }
                }
              );
            });
            subjectsOfTeacher = await myPromise;
            console.log(subjectsOfTeacher);
          }
          let anotherPromise = new Promise((resolve) => {
            for (let a = 0; a < schedule.length; a++) {
              for (let b = 0; b < schedule.length; b++) {
                for (let c = 0; c < subjectsOfTeacher.length; c++) {
                  console.log(subjectsOfTeacher[c]);
                  if (schedule[a][b] === subjectsOfTeacher[c]) {
                    console.log("in final if");
                    finalschedule[a][b] = schedule[a][b];
                    resolve(finalschedule);
                  } else {
                    resolve(finalschedule);
                  }
                }
              }
            }
          });
          console.log("reached here");
          ultimateschedule = await anotherPromise;
          console.log(ultimateschedule);
          studentSchedules.updateOne(
            {
              schedule_id: teacherFound.coursesTaught[i],
            },
            {
              schedule_id: teacherFound.coursesTaught[i],
              schedule: ultimateschedule,
            },
            (err, foundSchedule) => {
              console.log("In here");
              console.log(foundSchedule);
            }
          );
        }
      }
      CreateSchedule();
    }
  });
});

app.post("/edit-schedule", (req, res) => {
  let schedule = [];
  let subjectsOfTeacher = [];
  schedule = req.body.schedule;
  teacherSchedules.findOne(
    { schedule_id: req.body.schedule_id },
    (err, scheduleFound) => {
      if (scheduleFound) {
        teacherSchedules.updateOne(
          {
            schedule_id: req.body.schedule_id,
          },
          { schedule_id: req.body.schedule_id, schedule: schedule },
          (err, foundSchedule) => {
            console.log("In here");
            console.log(foundSchedule);
            const date = new Date().toLocaleTimeString();
            const day = new Date().toDateString();
            let logString =
              req.body.username +
              " " +
              "edited " +
              req.body.teachername +
              "'s schedule" +
              " at " +
              date +
              " " +
              "on " +
              day +
              ".";
            Logs.create({ log: logString });
            res.send({ message: "success" });
          }
        );
      }
    }
  );
  Teachers.findOne({ username: req.body.schedule_id }, (err, teacherFound) => {
    if (teacherFound) {
      async function EditSchedule() {
        for (let i = 0; i < teacherFound.coursesTaught.length; i++) {
          console.log(teacherFound.coursesTaught[i]);
          let newschedule = [];
          let subjects = [];
          let finalschedule = [];
          let ultimateschedule = [];
          let newPromise = new Promise((resolve) => {
            for (let i = 0; i < 6; i++) {
              newschedule.push([]);
              for (let j = 0; j < 6; j++) {
                newschedule[i].push("Free");
              }
            }
            studentSchedules.findOne(
              { schedule_id: teacherFound.coursesTaught[i] },
              (err, foundSchedule) => {
                if (foundSchedule) {
                  newschedule = foundSchedule.schedule;
                  for (let i = 0; i < 6; i++) {
                    for (let j = 0; j < 6; j++) {
                      for (
                        let k = 0;
                        k < teacherFound.subjectsTaught.length;
                        k++
                      ) {
                        if (
                          newschedule[i][j] === teacherFound.subjectsTaught[k]
                        ) {
                          newschedule[i][j] = "Free";
                        }
                      }
                    }
                  }
                  resolve(newschedule);
                }
              }
            );
          });
          finalschedule = await newPromise;

          for (let j = 0; j < teacherFound.subjectsTaught.length; j++) {
            console.log(teacherFound.subjectsTaught[j]);
            let myPromise = new Promise(function (resolve) {
              Subjects.findOne(
                {
                  sub_id: teacherFound.subjectsTaught[j],
                  course_id: teacherFound.coursesTaught[i],
                },
                (err, subFound) => {
                  if (subFound) {
                    console.log("in if");
                    subjects.push(subFound.sub_id);
                    resolve(subjects);
                  } else if (!subFound) {
                    console.log("in else");
                    subjects.push("");
                    resolve(subjects);
                  }
                }
              );
            });
            subjectsOfTeacher = await myPromise;
            console.log(subjectsOfTeacher);
          }
          let anotherPromise = new Promise((resolve) => {
            for (let a = 0; a < schedule.length; a++) {
              for (let b = 0; b < schedule.length; b++) {
                for (let c = 0; c < subjectsOfTeacher.length; c++) {
                  console.log(subjectsOfTeacher[c]);
                  if (schedule[a][b] === subjectsOfTeacher[c]) {
                    console.log("in final if");
                    finalschedule[a][b] = schedule[a][b];
                    resolve(finalschedule);
                  } else {
                    resolve(finalschedule);
                  }
                }
              }
            }
          });
          console.log("reached here");
          ultimateschedule = await anotherPromise;
          console.log(ultimateschedule);
          studentSchedules.updateOne(
            {
              schedule_id: teacherFound.coursesTaught[i],
            },
            {
              schedule_id: teacherFound.coursesTaught[i],
              schedule: ultimateschedule,
            },
            (err, foundSchedule) => {
              console.log("In here");
              console.log(foundSchedule);
            }
          );
        }
      }
      EditSchedule();
    }
  });
});

app.post("/delete-schedule", (req, res) => {
  teacherSchedules.findOneAndDelete(
    { schedule_id: req.body.schedule_id },
    (err) => {
      if (err) throw err;
      else {
        const date = new Date().toLocaleTimeString();
        const day = new Date().toDateString();
        let logString =
          req.body.username +
          " " +
          "deleted " +
          req.body.teachername +
          "'s schedule" +
          " at " +
          date +
          " " +
          "on " +
          day +
          ".";
        Logs.create({ log: logString });
        res.send({ message: "success" });
        Teachers.find(
          { username: req.body.schedule_id },
          (err, teacherFound) => {
            if (teacherFound) {
              for (let i = 0; i < teacherFound[0].coursesTaught.length; i++) {
                let arr;
                studentSchedules.findOne(
                  {
                    schedule_id: teacherFound[0].coursesTaught[i],
                  },
                  (err, scheduleFound) => {
                    if (scheduleFound) {
                      arr = scheduleFound.schedule;
                      for (let j = 0; j < arr.length; j++) {
                        for (let k = 0; k < arr.length; k++) {
                          for (
                            let h = 0;
                            h < teacherFound[0].subjectsTaught.length;
                            h++
                          ) {
                            if (
                              arr[j][k] === teacherFound[0].subjectsTaught[h]
                            ) {
                              arr[j][k] = "Free";
                            }
                          }
                        }
                      }
                      studentSchedules.findOneAndUpdate(
                        { schedule_id: teacherFound[0].coursesTaught[i] },
                        { schedule: arr },
                        (err) => {
                          if (err) throw err;
                        }
                      );
                    }
                  }
                );
              }
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
      else {
        const date = new Date().toLocaleTimeString();
        const day = new Date().toDateString();
        let logString =
          req.body.username +
          " " +
          "deleted subject " +
          req.body.sub_id +
          " at " +
          date +
          " " +
          "on " +
          day +
          ".";
        Logs.create({ log: logString });
        res.send({ message: "success" });
        console.log("Deleted " + req.body.sub_id + " successfully");
      }
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
      else {
        const date = new Date().toLocaleTimeString();
        const day = new Date().toDateString();
        let logString =
          req.body.username +
          " " +
          "deleted course " +
          req.body.course_id +
          " at " +
          date +
          " " +
          "on " +
          day +
          ".";
        Logs.create({ log: logString });
        res.send({ message: "success" });
        console.log("Deleted " + req.body.course_id + " successfully");
      }
    }
  );
  Subjects.deleteMany({ course_id: req.body.course_id }, (err) => {
    if (err) throw err;
  });
  studentSchedules.findOneAndDelete(
    { schedule_id: req.body.course_id },
    (err) => {
      if (err) throw err;
    }
  );
});

app.post("/delete-department", (req, res) => {
  Departments.deleteOne(
    {
      dept_id: req.body.dept_id,
    },
    (err) => {
      if (err) throw err;
      else {
        const date = new Date().toLocaleTimeString();
        const day = new Date().toDateString();
        let logString =
          req.body.username +
          " " +
          "deleted department " +
          req.body.dept_id +
          " at " +
          date +
          " " +
          "on " +
          day +
          ".";
        Logs.create({ log: logString });
        res.send({ message: "success" });
        console.log("Deleted " + req.body.dept_id + " successfully");
      }
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
          studentSchedules.findOneAndDelete(
            { schedule_id: course.course_id },
            (err) => {
              if (err) throw err;
            }
          );
        });
        Courses.deleteMany({ dept_id: req.body.dept_id }, (err) => {
          if (err) throw err;
        });
      }
    }
  );
});

app.post("/edit-subject", (req, res) => {
  Subjects.findOneAndUpdate(
    { sub_id: req.body.old_sub_id },
    {
      sub_id: req.body.new_sub_id,
      sub_name: req.body.new_sub_name,
      course_id: req.body.new_course_id,
    },
    (err) => {
      if (err) throw err;
    }
  );
});

app.post("/edit-course", (req, res) => {
  Courses.findOneAndUpdate(
    { course_id: req.body.old_course_id },
    {
      course_id: req.body.new_course_id,
      course_name: req.body.new_course_name,
      dept_id: req.body.new_dept_id,
    },
    (err) => {
      if (err) throw err;
    }
  );
});
app.post("/edit-department", (req, res) => {
  Departments.findOneAndUpdate(
    { dept_id: req.body.old_dept_id },
    {
      dept_id: req.body.new_dept_id,
      dept_name: req.body.new_dept_name,
    },
    (err) => {
      if (err) throw err;
    }
  );
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
                message: "success",
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
          message: "success",
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

app.post("/get-department", (req, res) => {
  Departments.findOne({ dept_id: req.body.dept_id }, (err, deptFound) => {
    if (deptFound) {
      res.send({
        message: "success",
        dept: deptFound,
      });
    }
  });
});

app.post("/get-course", (req, res) => {
  Courses.findOne({ course_id: req.body.course_id }, (err, courseFound) => {
    if (courseFound) {
      res.send({
        message: "success",
        course: courseFound,
      });
    }
  });
});

app.post("/get-subject", (req, res) => {
  Subjects.findOne({ sub_id: req.body.sub_id }, (err, subFound) => {
    if (subFound) {
      res.send({
        message: "success",
        sub: subFound,
      });
    }
  });
});

app.post("/edit-user", (req, res) => {
  console.log("request received");
  console.log(req.body);
  Teachers.findOne({ username: req.body.username }, (err, teacherFound) => {
    if (teacherFound) {
      console.log(teacherFound);
      Teachers.updateOne(
        { username: teacherFound.username },
        { password: req.body.new_password },
        (err, updateDone) => {
          console.log(updateDone);
        }
      );
      res.send({ message: "success" });
    } else if (!teacherFound) {
      Students.findOne({ username: req.body.username }, (err, studentFound) => {
        if (studentFound) {
          console.log(studentFound);
          Students.updateOne(
            { username: req.body.username },
            { password: req.body.new_password },
            (err, updateDone) => {
              console.log(updateDone);
            }
          );
          res.send({ message: "success" });
        }
      });
    }
  });
});

app.post("/edit-details", (req, res) => {
  Teachers.findOne({ username: req.body.old_username }, (err, teacherFound) => {
    if (teacherFound) {
      Teachers.updateOne(
        { username: teacherFound.username },
        {
          username: req.body.new_username,
          password: req.body.new_password,
          email: req.body.new_email,
          coursesTaught: req.body.new_course,
          subjectsTaught: req.body.new_subject,
          department: req.body.new_department,
          usertype: req.body.usertype,
        },
        (err, updateDone) => {
          console.log(updateDone);
        }
      );
      res.send({ message: "success" });
    } else if (!teacherFound) {
      Students.findOne(
        { username: req.body.old_username },
        (err, studentFound) => {
          if (studentFound) {
            Students.updateOne(
              { username: studentFound.username },
              {
                username: req.body.new_username,
                password: req.body.new_password,
                email: req.body.new_email,
                course: req.body.new_course,
                subjects: req.body.new_subject,
                department: req.body.new_department,
              },
              (err, updateDone) => {
                console.log(updateDone);
              }
            );
            res.send({ message: "success" });
          }
        }
      );
    }
  });
});

app.post("/flush-app", (req, res) => {
  //mongoose.connection.db.dropDatabase();
  Departments.deleteMany({}, (err) => {
    if (err) throw err;
    Courses.deleteMany({}, (err) => {
      if (err) throw err;
      studentSchedules.deleteMany({});
    });
    Subjects.deleteMany({}, (err) => {
      if (err) throw err;
      Subjects.create({
        sub_id: "Free",
        sub_name: "Free",
      });
    });
  });
  Teachers.deleteMany({}, async (err) => {
    if (err) throw err;
    teacherSchedules.deleteMany({});
    const hashedPassword = await bcrypt.hash("2732", saltRounds);
    Teachers.create({
      name: "Master User",
      username: "master",
      password: hashedPassword,
      email: "master@mdh.edu.in",
      usertype: 9,
    });
  });
  Students.deleteMany({});
  console.log("Master Reset complete");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
