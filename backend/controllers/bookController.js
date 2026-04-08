const User = require("../models/user");
const Book = require("../models/book");

// Add book (admin only)
const addBook = async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res
                .status(400)
                .json({ message: "you are not having access to perform admin work" });
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({ message: "book addes successfully" });
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
};

// Update book
const updateBook = async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        res.status(200).json({ message: "book updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
};

// Delete book
const deleteBook = async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
};

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });

        res.json({
            status: "success",
            data: books,
        });
    } catch (error) {
        res.status(500).json({ message: "An error occupied" });
    }
};

// Get recent books (limit 4)
const getRecentBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);

        res.json({
            status: "success",
            data: books,
        });
    } catch (error) {
        res.status(500).json({ message: "An error occupied" });
    }
};

// Get specific book by id
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        res.json({
            status: "success",
            data: book,
        });
    } catch (error) {
        res.status(500).json({ message: "An error occupied" });
    }
};

module.exports = { addBook, updateBook, deleteBook, getAllBooks, getRecentBooks, getBookById };
