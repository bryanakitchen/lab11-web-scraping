const parser = document => {
  const books = document.querySelectorAll('.product_pod');

  return [...books].map(book => ({
    title: book.querySelector('h3').textContent,
    coverImage: book.querySelector('img').src,
    rating: book.querySelector('.star-rating').className.split(' ')[1],
    price: book.querySelector('.price_color').textContent,
    inStock: !!book.querySelector('.instock')
  }));

};

module.exports = parser;
