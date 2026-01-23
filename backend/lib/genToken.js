// const jwt= require("jsonwebtoken")

// const genToken=(user,res)=>{
//   try {
//   const authClaims =[{name:user.username , role:user.role}]
//   const token =jwt.sign({authClaims},process.env.SECRET_KEY,{expiresIn:"7d"})
//   res.status(200).json({token:token})
//   } catch (error) {
//     res.status(500).json({message: " error in generating token"})
//   }

// }
// module.exports=genToken