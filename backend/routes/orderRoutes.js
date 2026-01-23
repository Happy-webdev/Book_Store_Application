const router =require("express").Router();
const { populate } = require("dotenv");
const Book =require("../models/book");
const Order=require("../models/order");
const { authUser } = require("./userAuth");

router.post("/place-order", authUser, async (req, res) => {
  try {
    const {id}=req.headers;
    const {order}=req.body;
    for(const userOrder of order){
      const newOrder= new Order({user:id,book:userOrder._id})
      const OrderDataFromDB= await newOrder.save();

      //add to user 
      await User.findByIdAndUpdate(id,{$push:{orders:OrderDataFromDB._id}})

    // clear the cart 
     await User.findByIdAndUpdate(id,{$pull:{cart:userOrder._id}})
    }
    return res.json({
      status:"success",
      message:"Order Placed Successfully"
    })

  } catch (error) {
     console.log("error",error.message)
    res.status(500).json({message:"internal server error"})
  }
})

// get-order-history for particular user
router.get("/get-order-history", authUser, async (req, res) => {
    try {
    const {id}=req.headers;
     const userData= await User.findById(id).populate({
      path:"order",
      populate:{path :"book"}
     })  
     
     
     const ordersData = userData.orders.reverse();
     return res.json({
      status:"success",
      data: ordersData,
     })

      } catch (error) {
     console.log("error",error.message)
    res.status(500).json({message:"internal server error"})
  }
})

// get-order-history for -------admin
router.get("/get-all-order", authUser, async (req, res) => {
    try {
      const userData=await Order.find().populate({path:"book"}).populate({path:"user"}).sort({createdAt:-1})
      return res.json({
      status:"success",
      data: userData,
     })
      
      } catch (error) {
     console.log("error",error.message)
    res.status(500).json({message:"internal server error"})
  }
})

router.put("/update-status/:id", authUser, async (req, res) => {
    try {
        const {id}=req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status})
      return res.json({
      status:"success",
     message: "successfully updated status",
     })
      
      } catch (error) {
     console.log("error",error.message)
    res.status(500).json({message:"internal server error"})
  }
})
module.exports=router