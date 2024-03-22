import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
const CreateTask = () => {
  const [allCourses, setAllCourses] = useState();

  const [data, setData] = useState({
    name: "",
    due: "",
    courseId: "",
  });

  const getAllCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/courses");
      setAllCourses(response.data.allCourses);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (event) => {
    setData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleForm = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/task", data);

      alert(response.data.message);
      setData({
        name: "",
        due: "",
        courseId: "",
      });
    } catch (error) {
      if (error?.response?.data?.message) {
        alert(error?.response?.data?.message);
      }

      console.log(error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);
  return (
    <>
      <div className="container">

        <div className="col-6 mt-5 ">
          <form onSubmit={handleForm}>
            Enter Task :
            <div className="input-group mb-3">
              <input
                className="form-control"
                type="text"
                name="name"
                value={data.name}
                onChange={handleInput}
                required
              />
            </div>
            <div className="input-group mb-3">
              Select Course :
              <Select
                required
                showSearch
                optionFilterProp="children"
                className="w-100"
                value={data.courseId}
                onChange={(value) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      courseId: value,
                    };
                  });
                }}
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
            Due date :
            <div className="input-group mb-3">
              <input
                className="form-control"
                required
                type="date"
                name="due"
                value={data.due}
                onChange={handleInput}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTask;
