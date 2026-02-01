const mongoose = require('mongoose');
const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('database connection established')
        
    } catch (error) {
        console.log("database connection error");
        
    }
}
module.exports = connectDb;
