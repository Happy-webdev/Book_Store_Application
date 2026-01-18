const mongoose=require("mongoose");

const orderSchema=mongoose.Schema({
  user:{
    type:mongoose.Types.ObjectId,
    ref:"user"
  },
   book:{
    type:mongoose.Types.ObjectId,
    ref:"book"
  },
  status:{
   type:String,
   default:"order placed",
   enum:["order placed","pending","delivered"]
  }
},{timestamps:true})

module.exports=mongoose.model("order",orderSchema)