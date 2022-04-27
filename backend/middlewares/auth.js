const { verifyToken } = require("../helpers/jwt");
const {User} = require("../models/User");

const authenticate = async(req, res, next)=>{
    try {
        if(!req.headers.access_token){
            return res.status(400).json({
                message: "U Have No Access Token !!!"
            }) 
        }

        let decoded = verifyToken(req.headers.access_token)

        let result = await User.findOne({
            where:{
                username: decoded.username
            }
        })

        if(result){
            req.user = result
            next()
        }else{
            return res.status(400).json({
                message: "Wrong Password or Username !!!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

module.exports = {
    authenticate
}