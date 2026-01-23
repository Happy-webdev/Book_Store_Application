const router =require("express").Router();
const User =require("../models/user");
const { authUser } = require("./userAuth");

// add-book-to-cart
router.put("/add-book-to-cart",authUser, async(req,res)=>{
try {
  const {bookid,id}=req.headers;
  // console.log(bookid + "  "+id);
  const userData=await User.findById(id);
  const userBookInCart= await userData.cart.includes(bookid);
  if(userBookInCart){
    return res.status(200).json({message:"The book is already in the cart"});
  }
  await User.findByIdAndUpdate(id,{$push:{cart:bookid}})
  return res.status(200).json({message:"The book is add successfully in the cart"}); 
} catch (error) {
  return res.status(500).json(error);
}
})

//remove-book-from-cart
router.put("/remove-book-from-cart",authUser, async(req,res)=>{
try {
  const {bookid,id}=req.headers;
  const userData=await User.findById(id);
  console.log(bookid + "  "+id);
  const userBookInCart= await userData.cart.includes(bookid);
  console.log(userBookInCart)
  if(userBookInCart){
    await User.findByIdAndUpdate(id,{$pull:{cart:bookid}})
    return res.status(200).json({message:"The book is remove successfully from the cart"}); 
  }
    return res.status(200).json({message:"The book is not in cart"}); 

} catch (error) {
  return res.status(500).json(error);
}
})
router.get("/get-books-from-user",authUser, async(req,res)=>{
try {
  const {id}=req.headers;
  // console.log(id);
  const userData=await User.findById(id).populate("cart");
  const userBookInCart=userData.cart.reverse();
  if(!userBookInCart){
    return res.status(200).json({message:"there is no item in cart"})
  }
  return res.status(200).json({status:"success",data:userBookInCart}); 
} catch (error) {
  return res.status(500).json(error);
}
})



module.exports=router