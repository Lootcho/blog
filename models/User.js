const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const User = new Schema({
    email:String,
    password:String,
},{timestamps:true})

const UserModel=mongoose.model("user",User)
module.exports=UserModel