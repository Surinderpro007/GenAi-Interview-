const jwt = require('jsonwebtoken')
const tokenBlacklisted = require("../models/blacklist.model")


async function authUser(req, res,next){
    

    const token = req.cookies.token || 
                  req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Token not Provided" })
    }

    if(!token){
        return res.status(401).json({
            message: "Token not Provided"
        })
    }

    const istokenBlacklisted = await tokenBlacklisted.findOne({
        token
    })
    if(istokenBlacklisted){
        return res.status(401).json({
            message: "Token is Invalid"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}


module.exports={
    authUser
}