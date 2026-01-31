const router = require("express").Router();

const User = require("../models/user");
const { authUser } = require("./userAuth");
const Book = require("../models/book");

router.post("/add-book", authUser, async (req, res) => {
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
});

router.put("/update-book", authUser, async (req, res) => {
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
});
router.delete("/delete-book", authUser, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

//get all books
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.json({
      status: "success",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occupied" });
  }
});

//get all books  limit 4
router.get("/get-recent-books",async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);

    res.json({
      status: "success",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occupied" });
  }
});
//get specific book
router.get("/get-book-by-id/:id",async (req, res) => {
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
});

module.exports = router;
