const User = require("../models/user");

// Add book to favourites
const addBookToFavourites = async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is already on Favourites" });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        res.status(200).json({ message: "Book is add to Favourites" });
    } catch (error) {
        console.log("error in favourites", error);
        res.status(500).json({ message: "internal server error" });
    }
};

// Remove book from favourites
const removeBookFromFavourites = async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
        }
        return res.status(200).json({ message: "Book is remove from Favourites" });
    } catch (error) {
        console.log("error in favourites", error);
        res.status(500).json({ message: "internal server error" });
    }
};

// Get books from favourites
const getBookFromFavourites = async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        return res.status(200).json({
            status: "success",
            data: favouriteBooks,
        });
    } catch (error) {
        console.log("error in favourites", error);
        res.status(500).json({ message: "internal server error" });
    }
};

module.exports = { addBookToFavourites, removeBookFromFavourites, getBookFromFavourites };
