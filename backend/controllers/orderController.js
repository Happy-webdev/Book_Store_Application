const User = require("../models/user");
const Order = require("../models/order");

// Place order
const placeOrder = async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;
        for (const userOrder of order) {
            const newOrder = new Order({ user: id, book: userOrder._id });
            const OrderDataFromDB = await newOrder.save();

            // add to user
            await User.findByIdAndUpdate(id, { $push: { orders: OrderDataFromDB._id } });

            // clear the cart
            await User.findByIdAndUpdate(id, { $pull: { cart: userOrder._id } });
        }
        return res.json({
            status: "success",
            message: "Order Placed Successfully",
        });
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

// Get order history for particular user
const getOrderHistory = async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "order",
            populate: { path: "book" },
        });

        const ordersData = userData.orders.reverse();
        return res.json({
            status: "success",
            data: ordersData,
        });
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

// Get all orders (admin)
const getAllOrders = async (req, res) => {
    try {
        const userData = await Order.find()
            .populate({ path: "book" })
            .populate({ path: "user" })
            .sort({ createdAt: -1 });
        return res.json({
            status: "success",
            data: userData,
        });
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

// Update order status
const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });
        return res.json({
            status: "success",
            message: "successfully updated status",
        });
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

module.exports = { placeOrder, getOrderHistory, getAllOrders, updateStatus };
