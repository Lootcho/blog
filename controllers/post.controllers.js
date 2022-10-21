const Post = require("../models/Post.js")


exports.createPost = async (req,res)=>{

    const post = await new Post({
        title:req.body.title,
        body:req.body.body,
    })

    const savepost = await post.save()
    
    return res.json(savepost)
}

exports.getPost = async (req,res) => {

    const post = await Post.find({})
    return res.json(post)

};
exports.getPostId = async (req,res) => {
    console.log(req)
    const post = await Post.findById(req.params.id)
    return res.json(post)

};

exports.getPostUpdate = async (req,res) => {
    const post = await Post.findByIdAndUpdate(req.params.id,{
        $set:{
            title:req.body.title,
            body:req.body.body
        }

    },{
        new:true
    })
    return res.json({
        message:"post update",
        post:post
    })

};





exports.deletePost = async (req,res) => {
    console.log(req)
    const post = await Post.findByIdAndDelete(req.params.id)
    return res.json({
        message:"post supprimé",
        post:post._id
    })

};





