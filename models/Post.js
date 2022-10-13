const mongoose  = require("mongoose");
const Schema = new mongoose.Schema({
    title:String,
    body:String,

})

const Post = mongoose.model("post",Schema);

module.exports = Post

