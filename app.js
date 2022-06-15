const express = require('express');
const userRouter = require('./routes/userRoute');
const accountRouter = require('./routes/accountRoute');
const transactionRouter = require('./routes/transactionRoute');

const app = express();

//middlewares
app.use(express.json()); //body-parser
app.use('/api/v1/users', userRouter);
app.use('/api/v1/accounts', accountRouter);
app.use('/api/v1/transactions', transactionRouter);

module.exports = app;

