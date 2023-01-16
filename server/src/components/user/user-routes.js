import Router from '@koa/router'
import * as UserControllers from '#components/user/user-controllers.js'
import { isAuthorized } from "#middlewares/jwt-handler.js";

const users =  new Router()

users.use(['/me', '/me/tasks', '/update' ], isAuthorized)
users.get('/', UserControllers.getUsers)
users.get('/me', (ctx) => {
    ctx.ok({ message: 'Protected route', user: ctx.state.user });
});
users.get('/me/tasks', UserControllers.getTasksByUser);
users.post('/register', UserControllers.register)
users.post('/login', UserControllers.login)
users.put('/update', UserControllers.updateUser)
// users.put('/me/tasks', isAuthorized, UserControllers.updateTasksByUser);
// users.delete('/me/tasks', isAuthorized, UserControllers.deleteTasksByUser);

export default users