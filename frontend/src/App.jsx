import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCourse from "./Components/CreateCourse";
import CreateTask from "./Components/CreateTask";
import ViewTask from "./Components/ViewTask";
import Navbar from "./Components/Navbar";
import "./App.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<CreateCourse />} />
          <Route path="/task" element={<CreateTask />} />
          <Route path="/viewTask" element={<ViewTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
