const router =require("express").Router();
const User =require("../models/user");
const { authUser } = require("./userAuth");

// add book to favourites
router.put("/add-book-to-favourites",authUser,async (req,res)=>{
  try {

    const {bookid,id}=req.headers;
   
    const userData = await User.findById(id);
    const isBookFavourite =userData.favourites.includes(bookid);
    //  console.log(isBookFavourite)
    if(isBookFavourite){
      return res.status(200).json({message:"Book is already on Favourites"})
    }
    await User.findByIdAndUpdate(id,{$push:{favourites:bookid}})
    res.status(200).json({message:"Book is add to Favourites"})
    
    
  } catch (error) {
    console.log("error in favourites",error)
     res.status(500).json({message:"internal server error"})
  }
})
router.delete("/remove-book-from-favourites",authUser,async (req,res)=>{
  try {

    const {bookid,id}=req.headers;
   
    const userData = await User.findById(id);
    const isBookFavourite =userData.favourites.includes(bookid);
    if(isBookFavourite){
      await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}})
    }
   return res.status(200).json({message:"Book is remove from Favourites"})
  } catch (error) {
    console.log("error in favourites",error)
     res.status(500).json({message:"internal server error"})
  }
})
router.get("/get-book-from-favourites",authUser,async (req,res)=>{
  try {

    const {id}=req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favouriteBooks=userData.favourites;
   return res.status(200).json({status:"success",
    data:favouriteBooks
   })
  } catch (error) {
    console.log("error in favourites",error)
     res.status(500).json({message:"internal server error"})
  }
})



module.exports =router;