const mongoose = require("mongoose");
mongoose.set("strictQuery",true);
async function connectMongoDb(url){
    
   return mongoose.connect(url)
    .then(()=>console.log("mongodb connected"))
    .catch((err)=>console.log("Mongo error"));

}

module.exports = {
    connectMongoDb,
};