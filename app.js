import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { courseModel, taskModel } from "./db.js";
const app = express();

app.use(express.json());
app.use(cors());

//! create a course
app.post("/course", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ message: "course name is required" });
    }

    const isPresent = await courseModel.findOne({ name:name.toLowerCase() });

    
    if(isPresent)
    {
      return res.status(400).send({message:"Already a course of this name is present"})
    }

    const course = new courseModel({
      name: name.toLowerCase(),
    });

    await course.save();

    res.status(200).send({
      course,
      message: "course created",
    });
  } catch (error) {
    console.log(error);
  }
});

//! view all courses
app.get("/courses", async (req, res) => {
  try {
    const allCourses = await courseModel.find({});

    res.status(200).send({
      allCourses,
    });
  } catch (error) {
    console.log(error);
  }
});

//! create a task

app.post("/task", async (req, res) => {
  try {
    const { courseId, name, due } = req.body;

    if (!courseId) {
      return res.status(400).send({ message: "course is required" });
    }
    if (!name) {
      return res.status(400).send({ message: "name is required" });
    }
    if (!due) {
      return res.status(400).send({ message: "due is required" });
    }

    const dateObject = new Date(due);

    const task = new taskModel({
      name,
      courseId,
      due: dateObject,
    });

    await task.save();

    res.status(200).send({
      task,
      message: "task created",
    });
  } catch (error) {
    console.log(error);
  }
});

//! view task of a particular course

app.get("/courses/:courseId/tasks", async (req, res) => {
  try {
    const { courseId } = req.params;

    const tasks = await taskModel
      .find({ courseId: courseId })
      .populate("courseId");

    res.status(200).send({
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
});

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://karanrajeshirke11:tKxWbt6EW48hhEo4@cluster0.w1ohye3.mongodb.net/TaskDatabase"
    );
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};

app.listen(8080, () => console.log("server started"));

connectDb();
