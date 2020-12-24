require('dotenv').config();

const parser = require('./parser');
const request = require('./request');
const store = require('./store');

request()
  .then(parser)
  .then(store)
  .then(res => console.log(res.length));
