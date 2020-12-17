const Book = require('./models/Book');

const store = async(books) => {
  
  return await Promise.all(books.map(book => Book.insert(book)));

};

module.exports = store;
