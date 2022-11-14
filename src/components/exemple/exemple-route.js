import Router from "@koa/router";
import * as ExempleController from '#components/exemple/exemple-controller.js';

const exempleRouter = new Router();

const todo = [
    { id: 1, title: 'Todo 1' },
    { id: 2, title: 'Todo 2' },
    { id: 3, title: 'Todo 3' },
    { id: 4, title: 'Todo 4' }
]

const newTodo = {
    id: todo[todo.length-1].id + 1,
    title: 'Todo ' + (todo.length + 1)
}

exempleRouter.get('/', ExempleController.index);

exempleRouter.get('/:id', (ctx, next) => {
    ctx.body = todo.find(t => t.id === parseInt(ctx.params.id));
});

// exempleRouter.post('/', (ctx, next) => {
//     todo.push(newTodo);
//     ctx.body = newTodo;
// });

exempleRouter.post('/', ExempleController.create);

exempleRouter.post('/request', (ctx) => {
    todo.push(ctx.request.body);
    ctx.body = todo;
    console.log(ctx.request.body);
});

// exempleRouter.put('/api/todos/:id', (ctx, next) => {
//     const index = todo.findIndex(t => t.id === parseInt(ctx.params.id));
//     todo[index].title = 'Todo ' + (index + 1) + ' updated';
//     ctx.body = todo[index];
// });

exempleRouter.put('/:id&:title', (ctx, next) => {
    const index = todo.findIndex(t => t.id === parseInt(ctx.params.id));
    todo[index].title = ctx.params.title;
    ctx.body = todo[index];
});

exempleRouter.delete('/:id', (ctx, next) => {
    const index = todo.findIndex(t => t.id === parseInt(ctx.params.id));
    todo.splice(index, 1);
    ctx.body = todo;
});


export default exempleRouter;