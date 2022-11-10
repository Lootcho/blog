const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const User = new Schema({
    email:String,
    password:String,
    pseudo:String,
    image:{
        public_id:String,
        secure_url:String,
    },
    followings:{
        type:[String]
    },
    followers:{
        type:[String]
    },
    
},{timestamps:true})

const UserModel=mongoose.model("user",User)
module.exports=UserModel