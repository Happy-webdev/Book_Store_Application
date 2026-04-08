const router = require("express").Router();
const { authUser } = require("../middleware/userAuth");
const { addBookToFavourites, removeBookFromFavourites, getBookFromFavourites } = require("../controllers/favouritesController");

// Add book to favourites
router.put("/add-book-to-favourites", authUser, addBookToFavourites);

// Remove book from favourites
router.delete("/remove-book-from-favourites", authUser, removeBookFromFavourites);

// Get books from favourites
router.get("/get-book-from-favourites", authUser, getBookFromFavourites);

module.exports = router;