const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
const port = 3000;

const library = [
  {
    title: "Robinson Crusoe",
    author: "Daniel Defoe",
    pages: 300,
    tags: ["adventure", "history"],
    id: 0,
  },
  {
    title: "The Unbearable Lightness of Being",
    author: "Milan Kundera",
    pages: 250,
    tags: ["philosophical", "novel"],
    id: 1,
  },
  {
    title: "Nausea",
    author: "Jean-Paul Sartre",
    pages: 120,
    tags: ["philosophical", "existentialism", "novel"],
    id: 2,
  },
];

// METHODS

const getTags = (arr) => {
  const tags = [];
  arr.map((item) => {
    item.tags.forEach((tag) => {
      tags.push(tag);
    });
  });
  return tags;
};

const updateLibrary = (id, updatedBook) => {
  library[id] = updatedBook;
  return library;
};

const addNewBook = (newBook) => {
  library.push({
    ...newBook,
    id: Math.max(...library.map((book) => book.id)) + 1,
  });
  return library;
};

const deleteBook = (id) => {
  library.splice(id, 1);
  return library;
};

// REST

// return all tags
app.get("/book/tags", (req, res) => {
  res.send(getTags(library));
});

// handle get, put and delete for /book/:id calls
app
  .route("/book/:id")
  .get((req, res) => {
    res.send(library[req.params.id]);
  })
  .put((req, res) => {
    res.send(updateLibrary(req.params.id, req.body));
  })
  .delete((req, res) => {
    res.send(deleteBook(req.params.id));
  });

// handle get and post for /book call
app
  .route("/book")
  .get((req, res) => {
    res.send(library);
  })
  .post((req, res) => {
    res.send(addNewBook(req.body));
  });

app.listen(port);
