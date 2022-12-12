import TaskModel from "#components/task/task-model.js";
import { updateTask } from '#components/task/task-use-case.js'
import Joi from 'joi';

export async function index (ctx) {
    try {
        const user = ctx.state.user;
        console.log(user)
        // ctx.body = await TaskModel.findByUserId(user._id);
        ctx.body = await TaskModel.find({user : user._id});
    }
    catch (err) {
        ctx.badRequest({message: err.message});
    }
}

export async function getAllByList (ctx) {
    try {
        if(!ctx.params.listId) throw new Error('No id supplied')
        const tasks = await TaskModel.findByListId(ctx.params.listId)
        ctx.ok(tasks)
    } catch (e) {
        ctx.badRequest({ message: e.message })
    }
}

export async function create (ctx) {
    try {
        const taskValidate = Joi.object({
            activityType: Joi.string().required(),
            activityName: Joi.string().required(),
            activityDescription: Joi.string().required(),
            activityDate: Joi.date().optional(),
            activityTime: Joi.string().optional(),
            activityDone: Joi.boolean().optional(),
            createAt: Joi.date().optional(),
            list: Joi.string().required()
        })
        const { error } = taskValidate.validate(ctx.request.body);
        if(error) {
            throw new Error(error.message);
        }else {
            ctx.body = await TaskModel.create({...ctx.request.body, user: ctx.state.user._id});
        }
    }
    catch (err) {
        ctx.badRequest({message: err.message});
    }
}

export async function show (ctx) {
    try {
        if(!ctx.params.id) throw new Error('No id supplied');
        ctx.body = await TaskModel.findById(ctx.params.id);
        if(!task) { return ctx.notFound() }
    }
    catch (err) {
        ctx.badRequest({message: err.message});
    }
}

// export async function update (ctx) {
//     try {
//         const taskValidate = Joi.object({
//             activityType: Joi.string().required(),
//             activityName: Joi.string().required(),
//             activityDescription: Joi.string().required(),
//             activityDate: Joi.date().optional(),
//             activityTime: Joi.string().optional(),
//             createAt: Joi.date().optional()
//         })
        
//         const {error} = taskValidate.validate(ctx.request.body);
//         if(error){
//             throw new Error(error.message)
//         }else{
//             ctx.body = await Task.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true, new: true });
//         };
//         ctx.body = await Task.find({});
//     }
//     catch (err) {
//         ctx.badRequest({message: err.message});
//     }
// }

export async function update (ctx) {
    try {
        const taskValidate = Joi.object({
            activityType: Joi.string().required(),
            activityName: Joi.string().required(),
            activityDescription: Joi.string().required(),
            activityDate: Joi.date().optional(),
            activityTime: Joi.string().optional(),
            activityDone: Joi.boolean().optional(),
            createAt: Joi.date().optional(),
            list: Joi.string().required()
        })
        if(!ctx.params.id) throw new Error('No id supplied')
        const { error, value } = taskValidate.validate(ctx.request.body)
        if(error) throw new Error(error)

        const updatedTask = await updateTask(ctx.params.id, ctx.request.body)

        ctx.ok(updatedTask)
    } catch (e) {
        ctx.badRequest({ message: e.message })
    }
    }

export async function destroy (ctx) {
    try {
        ctx.body = await TaskModel.findByIdAndDelete(ctx.params.id);
    }
    catch (err) {
        ctx.badRequest({message: err.message});
    }
}