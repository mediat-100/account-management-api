const http = require('http');
const express = require('express');
const dotenv = require('dotenv').config({ path: './.env' });
const { database } = require('./db').database();

const app = express();

const userRouter = require('./routes/userRoute');
const accountRouter = require('./routes/accountRoute');
const transactionRouter = require('./routes/transactionRoute');


//middlewares
app.use(express.json()); //body-parser
app.use('/api/v1/users', userRouter);
app.use('/api/v1/accounts', accountRouter);
app.use('/api/v1/transactions', transactionRouter);

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
