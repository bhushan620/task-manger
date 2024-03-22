import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const ViewTask = () => {
  const [allCourses, setAllCourses] = useState();

  const [tasks, setTasks] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const getAllCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/courses");
      setAllCourses(response.data.allCourses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const getTaskForCourseId = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/courses/${courseId}/tasks`
      );
      console.log(response.data.tasks);
      setTasks(response.data.tasks);
      setSelectedCourse(courseId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 ">
            <div className="input-group mt-3">
              Select Course :
              <Select
                required
                showSearch
                optionFilterProp="children"
                className="w-25"
                onChange={(value) => getTaskForCourseId(value)}
              >
                {allCourses &&
                  allCourses.map((course, index) => {
                    return (
                      <Select.Option key={index} value={course._id}>
                        {course.name}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </div>

          <div className=" d-flex col-12  flex-wrap mt-4">
            { tasks && tasks.length ? (
              tasks.map((task) => {
                return (
                  <div className="card w-25 m-1" key={task._id}>
                    <div className="card-body">
                      <h5 className="card-title"> task :{task.name}</h5>
                      <p className="card-text">
                        Due date :
                        {new Date(task.due).toLocaleDateString("en-GB")}
                      </p>
                      <p className="card-text">Course : {task.courseId.name}</p>
                    </div>
                  </div>
                );
              })
            ) : selectedCourse ? (
              <h1>No task yet created for this course </h1>
            ) : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTask;
