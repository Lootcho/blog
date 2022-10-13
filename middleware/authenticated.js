const jwt = require("jsonwebtoken")


function authenticated(req,res,next){
    const authBearer = req.headers["authorization"]
    const token = authBearer && authBearer.split(" ")[1]
    if (token === null){
        return res.status(401).json({message:"acces refusé"})
    }
    jwt.verify(token,"my secret",function(error,user){
        if (error){
            return res.status(401).json({message:"acces refusé"})
        }
        req.user=user
        next()
    })
}

module.exports= authenticated