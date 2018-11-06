// Define Dependences
const http = require('http');
const app = require('./app');

// Define PORT 
//(Note: If u upload to server, port 8888, v.v which make error. Recommend make this code to not error)
const port = process.env.PORT || 8888;

// Define a server
const server = http.createServer(app);

// Listen a port ???
server.listen(port);