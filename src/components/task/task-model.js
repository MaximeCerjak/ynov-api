import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema({
    activityType: { type: String, required: true },
    activityName: { type: String, required: true },
    activityDescription: { type: String, required: true },
    activityDate: { type: Date, required: false },
    activityTime: { type: String, required: false },
    createAt: { type: Date, default: Date.now }
})

const Task = mongoose.model("task", taskSchema);

export default Task;