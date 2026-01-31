const express =require("express")
const app=express()
require("dotenv").config()
const dbConn=require("./lib/db")
const cors= require("cors")
const userRoutes=require("./routes/userRoutes") 
const bookRoutes=require("./routes/bookRoutes") 
const favouritesRoutes=require("./routes/favouritesRoutes") 
const cartRoutes=require("./routes/cartRoutes")
const orderRoutes=require("./routes/orderRoutes")
//
app.use(cors())
app.use(express.json());

// Routes

app.use("/api/v1",userRoutes)
app.use("/api/v1",bookRoutes)
app.use("/api/v1",favouritesRoutes)
app.use("/api/v1",cartRoutes)
app.use("/api/v1",orderRoutes)
// dbConn();
app.listen(process.env.PORT,()=>{
  console.log(`server is running on ${process.env.PORT}`);
})