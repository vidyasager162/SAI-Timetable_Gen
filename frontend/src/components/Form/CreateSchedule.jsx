import React, { useEffect } from "react";
import FormActions from "../Templates/FormActions";
import FormHeader from "../Templates/FormHeader";

function CreateSchedule(props) {
  useEffect(() => {
    props.getSubjects();
    props.getTeachers();
    props.getTeacherSchedules();
    // eslint-disable-next-line
  }, []);

  const headings = ["#", "1", "2", "3", "4", "5", "6"];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  //eslint-disable-next-line
  let tname = "";
  let tuname = "";
  //eslint-disable-next-line
  props.teachers.map((teacher) => {
    if (teacher.username === props.teacherClicked) {
      tname = teacher.name;
      tuname = teacher.username;
    }
  });

  function handleTeacher(event) {
    event.preventDefault();
    props.setTeacherClicked(event.target.name);
  }

  function handleScheduleSubmit(event) {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    const schedule = [
      payload.getAll("Monday"),
      payload.getAll("Tuesday"),
      payload.getAll("Wednesday"),
      payload.getAll("Thursday"),
      payload.getAll("Friday"),
      payload.getAll("Saturday"),
    ];
    const reqPayload = {
      schedule_id: tuname,
      schedule: schedule,
    };
    fetch("http://192.168.34.129:8000/create-schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === "702") {
          console.log("Schedule created successfully.");
        } else {
          console.log("There was a problem creating the Schedule.");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    props.setIsCreateSchedule(false);
    props.setTeacherClicked("");
  }

  return props.teacherClicked !== "" ? (
    <div className="form-signin w-100 m-auto container">
      <form onSubmit={handleScheduleSubmit} method="POST">
        <div className="schedule-form-container">
          <FormHeader title="Create Schedule" subtitle={tname} />
          <div className="container timetable-container table-responsive">
            <div className="timetable-inner">
              <table className="table table-sm table-secondary table-bordered m-auto">
                <thead>
                  <tr>
                    {headings.map((heading) => {
                      return <th scope="col">{heading}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {days.map((outerDay) => {
                    return (
                      <tr>
                        <th scope="row">{outerDay}</th>
                        {days.map((innerDay) => {
                          return (
                            <td>
                              <select
                                className="form-select"
                                style={{ width: "auto" }}
                                name={outerDay}
                              >
                                {props.subjects.map((subject) => {
                                  return (
                                    <option value={subject.sub_id}>
                                      {subject.sub_id}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <FormActions action={props.setTeacherClicked} flag="createschedule" />
        </div>
      </form>
    </div>
  ) : (
    <div className="form-signin w-100 m-auto container">
      <div className="schedule-form-container">
        <div className="row mb-5">
          {props.teachers.map((teacher) => {
            return (
              <div className="col mybtn text-center">
                <button
                  key={teacher.id}
                  id={teacher.id}
                  className="btn btn-primary btn-lg"
                  name={teacher.username}
                  onClick={handleTeacher}
                >
                  {teacher.name}
                </button>
              </div>
            );
          })}
        </div>
        <div className="row">
          <div className="col text-center">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                props.setIsCreateSchedule(false);
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSchedule;
