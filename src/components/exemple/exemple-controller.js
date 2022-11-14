import Exemple from "#components/exemple/exemple-model.js";
import Joi from 'joi';

export async function index (ctx) {
    try {
        ctx.body = await Exemple.find({});
    }
    catch (err) {
        ctx.badRequest({message: err.message});
    }
}

export async function create (ctx) {
    try {
        const exempleValidate = Joi.object({
            name: Joi.string().required(),
            colors: Joi.array().items(Joi.string()).required(),
            // colors: [Joi.string()],
            price: Joi.number().required(),
            description: Joi.string().optional()
        })
        // const objTest = { name: 'test', value: 123, nested: {color: 'black'}};
        // const {name, nested: {color}} = objTest;
        const {error} = exempleValidate.validate(ctx.request.body);
        if(error) throw new Error(error.message);
        ctx.body = await Exemple.find({});
        // ctx.body = "ok";
    }
    catch (err) {
        ctx.badRequest({message: err.message});
    }
}