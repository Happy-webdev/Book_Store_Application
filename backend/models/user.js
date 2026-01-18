const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
   email:{
    type:String,
    required:true,
    unique:true
  },
   password:{
    type:String,
    required:true,
  },
   avtar:{
    type:String,
    default:"https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  },
   role:{
    type:String,
     default:"user",
     enum:["user","admin"]
  },
  favorites:[{
   type:mongoose.type.ObjectId,
   ref:"books"
  },],
  orders:[{
   type:mongoose.type.ObjectId,
   ref:"order"
  },],
  cart:[{
   type:mongoose.type.ObjectId,
   ref:"books"
  },]
},
{timestamps:true})

module.exports=mongoose.model("user",userSchema)