const jwt= require("jsonwebtoken")

const authUser=(req,res,next)=>{
  const authHeader=req.headers["authorization"];
  const token=authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({message:"Authentication Token is Required"})
  }

  jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
    if (err) {
      return res.status(400).json({message:"token expired. please signin again"})
    }
    req.user=user;
    next()
  })
}
module.exports={authUser}