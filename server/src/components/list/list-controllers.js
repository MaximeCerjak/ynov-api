import ListModel from '#components/list/list-model.js'
import TaskModel from '#components/task/task-model.js'

import Joi from 'Joi'

export async function index (ctx) {
  try {
    const lists = await ListModel.findByUserId(ctx.state.user._id)
    ctx.ok(lists)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function listsAndTasks (ctx) {
  try {
    const lists = await ListModel
    .aggregate()
    .match({ user: ctx.state.user._id })
    .lookup({ from: 'tasks', localField: '_id', foreignField: 'list', as: 'tasks' })
    ctx.ok(lists)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

// export async function index (ctx) {
//   try {
//     const skip = parseInt(ctx.query.skip)
//     const limit = parseInt(ctx.query.limit)
//     const lists = await ListModel.findByUserId(ctx.state.user._id)
//     const lists = await ListModel.aggregate([
//       { $match: { user: ctx.state.user._id } },
//       { $lookup: { from: 'tasks', localField: '_id', foreignField: 'list', as: 'tasks' } }
//     ]).limit(limit).skip(skip)
//     ctx.ok(lists)
//   } catch (e) {
//     ctx.badRequest({ message: e.message })
//   }
// }

export async function id (ctx) {
  try {
    if(!ctx.params.id) throw new Error('No id supplied')
    const list = await ListModel.findById(ctx.params.id).lean()
    list.tasks = await TaskModel.findByListId(ctx.params.id)
    if(!list) { return ctx.notFound() }
    ctx.ok(list)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function create (ctx) {
  try {
    const listValidationSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string()
    })
    const { error, value } = listValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)
    const newList = await ListModel.create({...value, user: ctx.state.user._id})
    ctx.ok(newList)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function update (ctx) {
  try {
    const listValidationSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string(),
      done: Joi.boolean()
    })
    if(!ctx.params.id) throw new Error('No id supplied')
    const { error, value } = listValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)
    const updatedList = await ListModel.findByIdAndUpdate(ctx.params.id, value, { runValidators: true, new: true })
    ctx.ok(updatedList)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function destroy (ctx) {
  try {
    if(!ctx.params.id) throw new Error('No id supplied')
    // await TaskModel.deleteMany({ list:})
    await ListModel.findOneAndDelete({_id: ctx.params.id, user: ctx.state.user._id})
    ctx.ok('Ressource deleted')
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}