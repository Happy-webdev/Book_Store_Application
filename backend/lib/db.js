const mongoose = require("mongoose")

const dbConn= async()=>{
  try{
   const conn= await mongoose.connect(process.env.DB_URL);
  console.log("database connected  to host :",conn.connection.host)
  }catch(error){
    console.log("there are some error in db :", error)
  }
}

dbConn()