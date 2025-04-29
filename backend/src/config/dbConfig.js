const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const connectDB = async ()=>{
    try {
        const conn=await mongoose.connect(MONGO_URI);
        console.log(`Mongo db bağlantısı başarılı  ${conn.connection.host}`);
    } catch (error) {
        console.log(`MongoDB bağlantısı başarısız ${error.message}`);
        process.exit(1);
    }
};
module.exports=connectDB;