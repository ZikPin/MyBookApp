const { faker } = require("@faker-js/faker");

module.exports = () => {
  const data = { books: [] }

  // Create 10 books
  for (let i = 0; i < 20; i++) {
    book = {
        id: i,
        genre: faker.book.genre(),
        title: faker.book.title(),
        author: faker.book.author(),
        pages: (i+100)%200,
        rating: i%5
    };

    data.books.push(book)
  }

  return data
}