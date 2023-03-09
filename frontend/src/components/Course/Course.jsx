import React, { useEffect } from "react";

function Course(props) {
  useEffect(() => {
    props.getDepartments();
    props.getCourses();
    // eslint-disable-next-line
  }, []);

  return props.departments.map((department) => {
    console.log("inside the first map");
    return props.buttonClicked === department.dept_id ? (
      props.courses
        .filter((course) => course.dept_id === department.dept_id)
        .map((filteredCourse) => {
          return (
            <div className="col mybtn">
              <button
                key={filteredCourse.id}
                id={filteredCourse.id}
                type="button"
                className="btn btn-primary btn-lg"
                name={filteredCourse.course_id}
              >
                {filteredCourse.course_id}
              </button>
            </div>
          );
        })
    ) : props.buttonClicked === "" ? (
      <div className="col mybtn">
        <button
          key={department.id}
          id={department.id}
          type="button"
          className="btn btn-primary btn-lg"
          onClick={props.handleButtonClick}
          name={department.dept_id}
        >
          {department.dept_id}
        </button>
      </div>
    ) : null;
  });
  // return props.buttonClicked ===
  //   ? props.courses
  //       .filter((course) => course.dept_id === "DMACS")
  //       .map((filteredCourse) => {
  //         return (
  //           <div className="col mybtn">
  //             <button
  //               type="button"
  //               className="btn btn-primary btn-lg"
  //               onClick={props.handleButtonClick}
  //               name={filteredCourse.course_id}
  //             >
  //               {filteredCourse.course_id}
  //             </button>
  //           </div>
  //         );
  //       })
  //   : props.buttonClicked === "DMC"
  //   ? props.courses
  //       .filter((course) => course.dept_id === "DMC")
  //       .map((filteredCourse) => {
  //         return (
  //           <div className="col mybtn">
  //             <button
  //               type="button"
  //               className="btn btn-primary btn-lg"
  //               onClick={props.handleButtonClick}
  //               name={filteredCourse.course_id}
  //             >
  //               {filteredCourse.course_id}
  //             </button>
  //           </div>
  //         );
  //       })
  //   : props.departments.map((department) => {
  //       return (
  //         <div className="col mybtn">
  //           <button
  //             type="button"
  //             className="btn btn-primary btn-lg"
  //             onClick={props.handleButtonClick}
  //             name={department.dept_id}
  //           >
  //             {department.dept_id}
  //           </button>
  //         </div>
  //       );
  //     });
}
//plis add a useffect to main to clear buttonclicked
export default Course;
