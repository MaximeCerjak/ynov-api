import http from 'http'; //nouvelle manière d'importer un module
//const http = require('http');


// const dumb = {
//     property1: () => {
//         console.log('property1');
//     }
// }

const server = http.createServer( (request,response) => {
    if(request.url === '/api/products' && request.method === 'GET') {
        response.writeHead(200, { 'Content-type': 'application/json' })
        response.end(JSON.stringify({
            id:1,
            name:"Iphone",
            color:"black"
        }))
    } else {
        response.writeHead(404, { 'Content-type': 'text/html' })
        response.end(JSON.stringify({
            message: "Route not found"
        }))
    }
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));