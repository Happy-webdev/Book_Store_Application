const router = require("express").Router();
const { authUser } = require("../middleware/userAuth");
const { signup, login, getUserInfo, updateAddress } = require("../controllers/userController");

// Sign up
router.post("/signup", signup);

// Login
router.post("/login", login);

// Get user information
router.get("get-user-informatiion", authUser, getUserInfo);

// Update address
router.put("/update-address", authUser, updateAddress);

module.exports = router;