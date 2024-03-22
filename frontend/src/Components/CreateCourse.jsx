import { useState } from "react";
import axios from "axios";

const CreateCourse = () => {
  const [courseName, setCourseName] = useState("");

  const handleForm = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/course", {
        name: courseName,
      });

      alert(response.data.message);
      setCourseName("");
    } catch (error) {
      if (error?.response?.data?.message) {
        alert(error?.response?.data?.message);
      }

      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6 mt-5">
            <form onSubmit={handleForm}>
              Enter Course Name :
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={courseName}
                  onChange={(event) => setCourseName(event.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
