const mongoose = require('mongoose');

const dbConnect = async()=>{
    try{
        const connection= await mongoose.connect('mongodb://127.0.0.1:27017/ktmconnect');
        if(connection) console.log("Successfully connected to Database")
    }catch(err){
        console.log(err)
        process.exit()
    }
}


module.exports = dbConnect