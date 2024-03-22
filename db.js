import mongoose from "mongoose";



const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  due: {
    type: Date,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Course'
  },
});

const courseModel = new mongoose.model("Course",courseSchema);
const taskModel = new mongoose.model("Task",taskSchema);


export {courseModel,taskModel}
