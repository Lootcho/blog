const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require('cors');
const app = express();
const path = require("path");
const auth = require("./routes/auth")
const user = require("./routes/user")
const post = require("./routes/post.route")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")))
app.use(morgan("dev"))
app.use(cors())
app.use("/user",auth)
app.use("/",user)
app.use("/",post)


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
