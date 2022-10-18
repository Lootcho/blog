const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const auth = require("./routes/auth")
const user = require("./routes/user")


app.use(express.json());
app.use(express.static(path.join(__dirname,"public")))

app.use("/user",auth)
app.use("/",user)


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
