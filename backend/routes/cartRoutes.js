const router = require("express").Router();
const { authUser } = require("../middleware/userAuth");
const { addBookToCart, removeBookFromCart, getBooksFromUser } = require("../controllers/cartController");

// Add book to cart
router.put("/add-book-to-cart", authUser, addBookToCart);

// Remove book from cart
router.put("/remove-book-from-cart", authUser, removeBookFromCart);

// Get books from user cart
router.get("/get-books-from-user", authUser, getBooksFromUser);

module.exports = router;