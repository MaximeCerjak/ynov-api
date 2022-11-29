import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema({
    activityType: { type: String, required: true },
    activityName: { type: String, required: true },
    activityDescription: { type: String, required: true },
    activityDate: { type: Date, required: false },
    activityTime: { type: String, required: false },
    activityDone: { type: Boolean, default: false ,required: false },
    createAt: { type: Date, default: Date.now },
    list: { type: Schema.Types.ObjectId, ref: "List" }
}, {
    timestamps: true 
});

taskSchema.static({
    findByListId (listId) {
        return this.find({ list: listId })
    }
})

const Task = mongoose.model("task", taskSchema);

export default Task;