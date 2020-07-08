const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async(req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '')
     // console.log('token:', token)
      
      const decoded =  jwt.verify(token, 'thisismynewcourse')
      //console.log('decoded', decoded)
      const user = await User.findOne({'_id': decoded._id, 'tokens.token': token})
        console.log("user from midlle 12", user)
       // console.log('req.body', req)
     if(!user) {
          throw new Error()
      }

      req.token = token
      req.user = user  
        next()
    } catch(e) {
        console.log('err', e)
        res.status(401).send({error: 'Please authenticate'})
    }
    
}

module.exports = auth
