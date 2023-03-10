import React, { useEffect, useState } from "react";

function Subject(props) {
  const [subjects, setSubjects] = useState([]);
  function getSubjects() {
    fetch("http://192.168.34.129:8000/get-subjects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "902") {
          setSubjects(data.subjects);
          console.log(data.subjects);
        }
      });
  }
  useEffect(() => {
    getSubjects();
    // eslint-disable-next-line
  }, []);
  return subjects.map((subject) => {
    return (
      <div className="col mybtn">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={props.handleButtonClick}
          name={subject.sub_id}
        >
          {subject.sub_id}
        </button>
      </div>
    );
  });
}

export default Subject;
