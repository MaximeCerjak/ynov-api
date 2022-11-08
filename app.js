import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();
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

router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
});

router.get('/api/todos', (ctx, next) => {
    ctx.body = todo;
});

router.get('/api/todos/:id', (ctx, next) => {
    ctx.body = todo.find(t => t.id === parseInt(ctx.params.id));
});

router.post('/api/todos', (ctx, next) => {
    todo.push(newTodo);
    ctx.body = newTodo;
});

router.post('/api/todos/request', (ctx) => {
    todo.push(ctx.request.body);
    ctx.body = todo;
    console.log(ctx.request.body);
});

// router.put('/api/todos/:id', (ctx, next) => {
//     const index = todo.findIndex(t => t.id === parseInt(ctx.params.id));
//     todo[index].title = 'Todo ' + (index + 1) + ' updated';
//     ctx.body = todo[index];
// });

router.put('/api/todos/:id&:title', (ctx, next) => {
    const index = todo.findIndex(t => t.id === parseInt(ctx.params.id));
    todo[index].title = ctx.params.title;
    ctx.body = todo[index];
});

router.delete('/api/todos/:id', (ctx, next) => {
    const index = todo.findIndex(t => t.id === parseInt(ctx.params.id));
    todo.splice(index, 1);
    ctx.body = todo;
});



app .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));