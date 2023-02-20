const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const requireAuth = async (req, res, next) => {

    //verify authentication
    //const token = req.headers.authorization || req.cookies.authToken
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.jwtSecret)

        req.user = await User.findOne({_id: payload.id}).select('_id')
       

        //console.log(req.user)
        //goes to the next function in the router, eg: getBooks
        next()
        
    }catch(error){
        console.log(error)
        return res.status(401).json({error: "Unauthorized Request"})
    }

}
module.exports =  requireAuth;