const User =require("../models/User")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signUp = async (req,res)=>{
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ message: "email deja utilisé" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)
    const createUser = await new User({
      email,
      password: hashpassword
    })
    const saveUser = await createUser.save()
    return res.status(201).json({ message: "utlisateur créer", userId: saveUser._id })
}

exports.signIn = async (req,res)=>{
    const { email,password} = req.body
    const user =await User.findOne({ email:email})
    console.log(user)
    if (!user){
        return res.status(400).json({message:"email n'existe pas"})
    }
    const validatePassword = await bcrypt.compare(password,user.password)
    if(!validatePassword){
      return res.status(400).json({message:"le mot de passe est incorrect"})
    }
    const token = await jwt.sign({user},"my secret")
    return res.status(200).json({token,userId:user._id})
}