import Task from "#components/task/task-model.js";
import Joi from 'joi';

export async function index (ctx) {
    try {
        ctx.body = await Task.find({});
    }
    catch (err) {
        ctx.badRequest({message: err.message});
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
            createAt: Joi.date().optional()
        })
        
        const {error} = taskValidate.validate(ctx.request.body);
        if(error) {
            throw new Error(error.message);
        }else {
            ctx.body = await Task.create(ctx.request.body);
        }
        ctx.body = await Task.find({});
    }
    catch (err) {
        ctx.badRequest({message: err.message});
    }
}

export async function show (ctx) {
    try {
        ctx.body = await Task.findById(ctx.params.id);
    }
    catch (err) {
        ctx.badRequest({message: err.message});
    }
}

export async function update (ctx) {
    try {
        const taskValidate = Joi.object({
            activityType: Joi.string().required(),
            activityName: Joi.string().required(),
            activityDescription: Joi.string().required(),
            activityDate: Joi.date().optional(),
            activityTime: Joi.string().optional(),
            createAt: Joi.date().optional()
        })
        
        const {error} = taskValidate.validate(ctx.request.body);
        if(error){
            throw new Error(error.message)
        }else{
            ctx.body = await Task.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true, new: true });
        };
        ctx.body = await Task.find({});
    }
    catch (err) {
        ctx.badRequest({message: err.message});
    }
}

export async function destroy (ctx) {
    try {
        ctx.body = await Task.findByIdAndDelete(ctx.params.id);
    }
    catch (err) {
        ctx.badRequest({message: err.message});
    }
}