const express = require('express');
const Book = require('./models/Book');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
});

module.exports = app;
