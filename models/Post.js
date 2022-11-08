const mongoose  = require("mongoose");
const Schema = new mongoose.Schema({
    userId:String,
    title:String,
    body:String,
    image:{
        imageId:String,
        imageUrl:String,
    }
    ,
    likes:[String],
    dislikes:[String],
    comments: {
        type:
          [{
            commenterId: String,
            contenu: String,
            pseudo: String,
          }]
      },
},{timestamps:true})

const Post = mongoose.model("post",Schema);

module.exports = Post

