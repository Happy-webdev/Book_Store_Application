require("dotenv").config()
const express =require("express")
const dbConn=require("./lib/db")
const userRoutes=require("./routes/userRoutes") 
const bookRoutes=require("./routes/bookRoutes") 
const favouritesRoutes=require("./routes/favouritesRoutes") 
const cartRoutes=require("./routes/cartRoutes")
const app=express()

//
app.use(express.json());

// Routes
app.use("/api/user",userRoutes)
app.use("/api/user",bookRoutes)
app.use("/api/user",favouritesRoutes)
app.use("/api/user",cartRoutes)
// dbConn();
app.listen(process.env.PORT,()=>{
  console.log(`server is running on ${process.env.PORT}`);
})