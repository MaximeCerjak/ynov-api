import Router from '@koa/router';
import * as listControllers from '#components/list/list-controllers.js';
import { isAuthorized } from "#middlewares/jwt-handler.js";

const lists = new Router()

lists.use(['/'], isAuthorized)
lists.get('/', listControllers.index)
lists.get('/:id', listControllers.id)
lists.post('/', listControllers.create)
lists.put('/:id', listControllers.update)
lists.delete('/:id', listControllers.destroy)
lists.get('/limit', listControllers.limitIndex)

export default lists