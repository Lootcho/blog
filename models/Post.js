const mongoose  = require("mongoose");
const Schema = new mongoose.Schema({
    title:String,
    body:String,
    image:{
        public_id:String,
        secure_url:String,
    }
    ,
},{timestamps:true})

const Post = mongoose.model("post",Schema);

module.exports = Post

