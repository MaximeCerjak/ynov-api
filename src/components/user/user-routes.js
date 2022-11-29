import Router from '@koa/router'
import * as UserControllers from '#components/user/user-controllers.js'
import { isAuthorized } from "#middlewares/jwt-handler.js";

const users =  new Router()

users.get('/', UserControllers.getUsers)
users.get('/me', isAuthorized, (ctx) => {
    ctx.ok({ message: 'Protected route', user: ctx.state.user });
});
users.post('/register', UserControllers.register)
users.post('/login', UserControllers.login)
users.put('/update', isAuthorized, UserControllers.updateUser)

export default users