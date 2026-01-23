const router =require("express").Router();
const bcrypt =require("bcryptjs")
const User =require("../models/user")
const jwt= require("jsonwebtoken");
const { authUser } = require("./userAuth");
// const {genToken}=require("../lib/genToken")
//sign up
router.post("/signup",async(req,res)=>{
  try {
    const {username,email,password,address}=req.body

    if(!username || !email || !password){
      return res.status(400).json({message:"all field are requires to fill"})
    }

    if (username<5) {
       return res.status(400).json({message:"username length should be grater than 5"})
    }

     if (username<8) {
       return res.status(400).json({message:"password length should be atlest 8"})
    }

    const emailExist=await User.findOne({email})
    if (emailExist) {
       return res.status(400).json({message:"user alredy exist"})
    }

    const userExist=await User.findOne({username:username})
    if (userExist) {
       return res.status(400).json({message:"user name is already taken "})
    }

    const salt = await bcrypt.genSalt(10)
    const hassPassword= await bcrypt.hash(password,salt);

    const newUser = new User({username,email,password : hassPassword,address})

    if(newUser){
      await newUser.save()
      res.status(201).json({ message:"signup successfully"})
    }


  } catch (error) {
    console.log("error",error.message)
    res.status(500).json({message:"internal server error"})
  }
})

router.post("/login",async(req,res)=>{
  try {
    const {username,password}=req.body

    const existingUser=await User.findOne({username})
    if (!existingUser) {
       return res.status(400).json({message:"invalid Credential"})
    }
 const passwordExist=await bcrypt.compare(password,existingUser.password,(err,data)=>{
  if (data) {
    const authClaims=[ {name:existingUser.username},
                        {role:existingUser.role}
    ]
    
    const token =jwt.sign({authClaims},process.env.SECRET_KEY,{expiresIn:"30d"})
    res.status(200).json({id:existingUser._id,role:existingUser.role,token:token})
  }else{
    res.status(400).json({message:"invalid Credential"})
  }
 })
} catch (error) {
    console.log("error",error.message)
    res.status(500).json({message:"internal server error"})
  }
})

router.get("get-user-informatiion",authUser, async (req,res)=>{
 try {
   const {id}=req.headers;
   const data=await User.findById(id).select("-password");
    return res.status(200).json(data)
  
 } catch (error) {
    console.log("error",error.message)
    res.status(500).json({message:"internal server error"})
 }
 
})

router.put("/update-address",authUser, async (req,res)=>{
  try {
   const {id}=req.headers;
   const {address}=req.body;
   await User.findByIdAndUpdate(id,{address:address})
   return res.status(200).json({message:"address updated successfully"})
    
  } catch (error) {
     console.log("error",error.message)
    res.status(500).json({message:"internal server error"})
  }
})
module.exports=router