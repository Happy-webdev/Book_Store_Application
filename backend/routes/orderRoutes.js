const router = require("express").Router();
const { authUser } = require("../middleware/userAuth");
const { placeOrder, getOrderHistory, getAllOrders, updateStatus } = require("../controllers/orderController");

// Place order
router.post("/place-order", authUser, placeOrder);

// Get order history for particular user
router.get("/get-order-history", authUser, getOrderHistory);

// Get all orders (admin)
router.get("/get-all-order", authUser, getAllOrders);

// Update order status
router.put("/update-status/:id", authUser, updateStatus);

module.exports = router;