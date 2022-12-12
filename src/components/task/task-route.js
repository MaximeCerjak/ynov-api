import Router from "@koa/router";
import * as TaskController from '#components/task/task-controller.js';
import { isAuthorized } from "#middlewares/jwt-handler.js";

const taskRouter = new Router();

taskRouter.use(['/:id', '/'], isAuthorized)

taskRouter.get('/', TaskController.index);

taskRouter.get('/protected', isAuthorized, (ctx) => {
    ctx.ok({ message: 'Protected route', user: ctx.state.user });
});

taskRouter.get('/:id', TaskController.show);

taskRouter.get('/lists/:listId', TaskController.getAllByList)

taskRouter.post('/', TaskController.create);

taskRouter.put('/:id', TaskController.update);

taskRouter.delete('/:id', TaskController.destroy);


    

export default taskRouter;