const http = require('http');
const dotenv = require('dotenv').config({ path: './.env' });
const { database } = require('./db').database();
const app = require('./app');

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
