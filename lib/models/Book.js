const pool = require('../utils/pool');

module.exports = class Book {
    id;
    title;
    coverImage;
    rating;
    price;
    inStock;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.coverImage = row.cover_image;
      this.rating = row.rating;
      this.price = row.price;
      this.inStock = row.in_stock;
    }

    static async insert(book) {
      const { rows } = await pool.query('INSERT into books (title, cover_image, rating, price, in_stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [book.title, book.coverImage, book.rating, book.price, book.inStock]);

      return new Book(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM books'
      );
  
      return rows.map(row => new Book(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM books WHERE id=$1',
        [id]
      );
  
      if(!rows[0]) throw new Error(`Book with id ${id} not found`);
      else return new Book(rows[0]);
    }

    static async update(id, book) {
      const { rows } = await pool.query(
        `UPDATE books
         SET title=$1,
             cover_image=$2,
             rating=$3,
             price=$4,
             in_stock=$5
         WHERE id=$6
         RETURNING *
        `,
        [book.title, book.coverImage, book.rating, book.price, book.inStock, id]
      );
  
      if(!rows[0]) throw new Error(`Book with id ${id} not found`);
      else return new Book(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM books WHERE id=$1 RETURNING *',
        [id]
      );
  
      if(!rows[0]) throw new Error(`Book with id ${id} not found`);
      else return new Book(rows[0]);
    }
};
