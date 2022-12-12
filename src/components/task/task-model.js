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
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    list: { type: Schema.Types.ObjectId, ref: "list", required: true },
}, {
    timestamps: true 
});

taskSchema.static({
    findByListId (listId) {
        return this.find({ list: listId })
    },
    findByUserId(userId) {
        return this.find({ user: userId })
    }
})


const Task = mongoose.model("task", taskSchema);

export default Task;