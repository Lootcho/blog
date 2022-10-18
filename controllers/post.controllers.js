const Post = require("./models/Post.js")
const authenticated = require("./middleware/authenticated")


app.post("/post",authenticated,async function(req,res){
    console.log(req)
    const post = await new Post({
        // title:"maison", en static
        //title:req.body.title, en dynamique
        title:req.body.title,
        body:req.body.body,
    })

    const savepost = await post.save()
    
    return res.json(savepost)
})


app.get("/post",async function(req,res){

    const post = await Post.find({})
    return res.json(post)

});
app.get("/post/:id",async function(req,res){
    console.log(req)
    const post = await Post.findById(req.params.id)
    return res.json(post)

});






