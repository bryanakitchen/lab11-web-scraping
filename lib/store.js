const store = books => {
  return Promise.all(books.map(book => book));
};

module.exports = store;