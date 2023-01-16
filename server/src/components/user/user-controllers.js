import UserModel from '#components/user/user-model.js'
import TaskModel from '#components/task/task-model.js'
import Joi from 'joi'
import argon2, { hash } from 'argon2'
import { sendWelcomeEmail } from '#services/mailing/welcome-email.js'


export async function register (ctx) {
    try {
    const registerValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    terms_and_conditions: Joi.boolean().valid(true).required()
    })
    const params = ctx.request.body
    const { error, value } = registerValidationSchema.validate(params)
    if(error) throw new Error(error)
    const hashedPassword = await argon2.hash(value.password)
    const newUser = new UserModel({
    ...value,
    password: hashedPassword,
    settings: {
        terms_and_conditions: value.terms_and_conditions
    }
    })
    newUser.generateEmailVerificationToken()
    const user = await newUser.save()
    await sendWelcomeEmail(user, user.settings.validation_email_token)
    const token = user.generateJWT()
    ctx.ok({token})
    } catch(e) {
    ctx.badRequest({ message: e.message })
    }
}

export async function getUsers(ctx) {
    try {
    const users = await UserModel.find({})
    ctx.ok(users)
    } catch(e) {
    ctx.badRequest({ message: e.message })
    }
}


export async function login (ctx) {
    try {
    const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
    })
    const params = ctx.request.body
    const { error, value } = loginValidationSchema.validate(params)
    if(error) throw new Error(error)
    const user = await UserModel.findOne({ email: value.email }).select('+password')
    if(!user) throw new Error('User not found')
    const passwordMatch = await argon2.verify(user.password, value.password)
    if(!passwordMatch) throw new Error('Invalid password')
    const token = user.generateJWT()
    return ctx.ok({token})
    } catch(e) {
    ctx.badRequest({ message: e.message })
    }
}


export async function updateUser (ctx) {
    try {
    const updateValidationSchema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().min(6)
    })
    const params = ctx.request.body
    const { error, value } = updateValidationSchema.validate(params)
    if(error) throw new Error(error)
    const user = await UserModel.findById(ctx.state.user._id)
    if(!user) throw new Error('User not found')
    if(value.password) {
        const hashedPassword = await argon2.hash(value.password)
        user.password = hashedPassword
    }
    if(value.email) {
        user.email = value.email
    }
    await user.save()
    const userOut = await UserModel.findById(ctx.state.user._id)
    ctx.ok(userOut)
    } catch(e) {
    ctx.badRequest({ message: e.message })
    }
}

export async function getTasksByUser (ctx) {
    try {
    const tasks = await TaskModel.find({ user: ctx.state.user._id })
    ctx.ok(tasks)
    } catch(e) {
    ctx.badRequest({ message: e.message })
    }
}



