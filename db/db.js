const mongoose=require("mongoose");
url=process.env.MONGO_URL
module.exports=mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true })