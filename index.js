const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const auth = require("./routes/auth")
const authenticated = require("./middleware/authenticated")



app.use("/user",auth)

const Post = require("./models/Post.js")


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
mongoose.connect("mongodb+srv://loulou:Loulou31.@blog.jlbad.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(function () {
    return console.log("vous etes connecté a la base de donnée")
}
)
app.listen(3000,function () {
    console.log("vous etes connecté");
    
});
