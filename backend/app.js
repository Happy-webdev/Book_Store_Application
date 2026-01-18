require("dotenv").config()
const express =require("express")
const dbConn=require("./lib/db")

const app=express()

app.get("/",(req,res)=>{
  res.send("server is running ")
})
// dbConn();
app.listen(process.env.PORT,()=>{
  console.log(`server is running on ${process.env.PORT}`);
})