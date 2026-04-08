const router = require("express").Router();
const { authUser } = require("../middleware/userAuth");
const { addBook, updateBook, deleteBook, getAllBooks, getRecentBooks, getBookById } = require("../controllers/bookController");

// Add book (admin only)
router.post("/add-book", authUser, addBook);

// Update book
router.put("/update-book", authUser, updateBook);

// Delete book
router.delete("/delete-book", authUser, deleteBook);

// Get all books
router.get("/get-all-books", getAllBooks);

// Get recent books (limit 4)
router.get("/get-recent-books", getRecentBooks);

// Get specific book by id
router.get("/get-book-by-id/:id", getBookById);

module.exports = router;
