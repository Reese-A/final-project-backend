const http = require('http');
const app = require('./server');

const PORT = process.env.PORT || 8008;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}\n`);
})