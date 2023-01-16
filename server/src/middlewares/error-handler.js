import logger from '../config/winston.js'

const handler = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        logger.error({ message: err.message, stack: err.stack }) 
        ctx.status = err.status || 500
        ctx.body = {
            message: err.message
        }
    }
}

export default handler
