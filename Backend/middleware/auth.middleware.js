const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config/config')

const authToken = (req,res,next) => {
   const token = req.headers.authorization?.split(' ')[1]
   if(!token){
       return res.status(401).json({
            success: false,
            message: 'unauthorized'
        })
   }

   jwt.verify(
       token,
       SECRET_KEY,
       (err,user)=>{
           if(err) return res.status(403).json({
            success: false,
            message: 'forbidden'
        })

           req.user = user
           next()
       }
   )
}

module.exports = authToken
