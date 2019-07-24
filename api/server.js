const express = require('express');

const usersRouter = require('../users/users-router');
const authRouter = require('../auth/auth-router');

const server = express();

server.use(express.json());
server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.send('welcome to auth project!')
})



module.exports = server;