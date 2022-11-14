import Router from '@koa/router';
import exempleRouter from '#components/exemple/exemple-route.js';
import taskRouter from '#components/task/task-route.js';

const API_V1_ROUTER = new Router({ prefix: '/api/v1' })

API_V1_ROUTER.use('/todos', exempleRouter.routes(), exempleRouter.allowedMethods());
API_V1_ROUTER.use('/tasks', taskRouter.routes(), taskRouter.allowedMethods());

export { API_V1_ROUTER };

//const API_V2_ROUTER = new Router({ prefix: '/api/v2' })