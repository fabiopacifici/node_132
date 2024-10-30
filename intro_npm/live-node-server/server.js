//const { createServer } = require('node:http');
import { createServer } from 'node:http'

const hostname = '127.0.0.1';
const port = 3005;

const server = createServer((req, res) => {
  res.statusCode = 200;
  /* res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Node'); */

  // json
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ user: 'Iulian', email: 'iulian@gmail.com' }));

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
