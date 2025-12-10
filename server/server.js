const { faker, LoremModule } = require("@faker-js/faker");

module.exports = () => {
  const data = { books: [] }

  // Create 10 books
  for (let i = 0; i < 20; i++) {
    book = {
      id: i,
      title: faker.book.title(),
      author: faker.book.author(),
      backgroundColor: randomBackground(),
      text: randomSections(Math.floor(Math.random() * 4) + 2)
    };

    data.books.push(book)
  }

  return data
}

function randomBackground() {
  let value = (Math.floor(Math.random() * 10) * 100) % 300 + 100;
  let baseColors = [
    "emerald",
    "green",
    "lime",
    "red",
    "orange",
    "amber",
    "yellow",
    "teal",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose"
  ]
  let color = baseColors[Math.floor(Math.random() * baseColors.length)]

  return 'var(--p-' + color + '-' + value + ')';
}

function randomSections(n) {
  result = [];

  for (i = 0; i < n; i++) {
    section = {
      title: faker.lorem.words(),
      body: faker.lorem.paragraphs()
    };

    result.push(section);
  }

  return result;
}