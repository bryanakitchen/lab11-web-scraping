const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

describe('CRUD routes for Book model', () => {

  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
    
  afterAll(() => {
    return pool.end();
  });

  it('Adds a Book via POST', async() => {
    const res = await request(app)
      .post('/api/v1/books')
      .send({
        title: 'a title',
        coverImage: 'some url',
        rating: 4,
        price: '$25',
        inStock: true
      });

    expect(res.body).toEqual({
      id: '1',
      title: 'a title',
      coverImage: 'some url',
      rating: '4',
      price: '$25',
      inStock: true
    });
  });

  it('Returns all books via GET', async() => {
    const books = await Promise.all([
      {
        title: 'The Three Musketeers',
        coverImage: 'www.thethreemusketeers.com',
        rating: 4,
        price: '$25',
        inStock: true
      },
      {
        title: 'Robin Hood',
        coverImage: 'www.robinhood.com',
        rating: 4,
        price: '$25',
        inStock: true
      },
      {
        title: 'Little Red Riding Hood',
        coverImage: 'www.littlered.com',
        rating: 4,
        price: '$25',
        inStock: true
      }
    ].map(book => Book.insert(book)));

    const res = await request(app)
      .get('/api/v1/books');

    expect(res.body).toEqual(expect.arrayContaining(books));
  });

  it('Finds book by id via GET', async() => {
    const book = await Book.insert({
      title: 'Little Red Riding Hood',
      coverImage: 'www.littlered.com',
      rating: 4,
      price: '$25',
      inStock: true
    });

    const res = await request(app)
      .get(`/api/v1/books/${book.id}`);

    expect(res.body).toEqual({
      id: '1',
      title: 'Little Red Riding Hood',
      coverImage: 'www.littlered.com',
      rating: '4',
      price: '$25',
      inStock: true
    });
  });

  it('Updates a Book by id via PUT', async() => {
    const book = await Book.insert({
      title: 'Little Red Riding Hood',
      coverImage: 'www.littlered.com',
      rating: 4,
      price: '$25',
      inStock: true
    });
  
    const res = await request(app)
      .put(`/api/v1/books/${book.id}`)
      .send({
        title: 'Little Red Riding Hood',
        coverImage: 'www.littlered.com',
        rating: 4,
        price: '$25',
        inStock: false
      });

    expect(res.body).toEqual({
      id: '1',
      title: 'Little Red Riding Hood',
      coverImage: 'www.littlered.com',
      rating: '4',
      price: '$25',
      inStock: false
    });

  });

  it('Deletes a book by id via DELETE', async() => {
    const book = await Book.insert({
      title: 'Little Red Riding Hood',
      coverImage: 'www.littlered.com',
      rating: 4,
      price: '$25',
      inStock: true
    });

    const res = await request(app)
      .delete(`/api/v1/books/${book.id}`);

    expect(res.body).toEqual({
      id: '1',
      title: 'Little Red Riding Hood',
      coverImage: 'www.littlered.com',
      rating: '4',
      price: '$25',
      inStock: true
    });
      
  });


});
