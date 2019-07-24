const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('welcome to auth project!')
})






module.exports = server;