import Router from "@koa/router";
import * as TaskController from '#components/task/task-controller.js';

const taskRouter = new Router();

taskRouter.get('/', TaskController.index);

taskRouter.get('/:id', TaskController.show);

taskRouter.post('/', TaskController.create);

taskRouter.put('/:id', TaskController.update);

taskRouter.delete('/:id', TaskController.destroy);

export default taskRouter;