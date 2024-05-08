require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
  const token  = req.header('x-auth-token')
  if(!token) return res.status(401).send('<h2>Access Denied!. No token provided <br /> login or sign up if you have no account.</h2>')

    try {
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY)
      req.user = decoded
      next()
    }
    catch(ex) {
     res.status(400).send('Invalid token')
    }
}