require('dotenv').config();

const parser = require('./parser');
const request = require('./request');
const store = require('./store');

request()
  .then(document => parser(document))
  .then(books => store(books))
  .then(res => console.log(res.length));
