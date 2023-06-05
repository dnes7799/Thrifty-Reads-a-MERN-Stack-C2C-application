const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const adminAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization)
  
    if (!authorization) {
      return res.status(401).json({ error: 'Authorization token required' });
    }
  
    const token = authorization.split(' ')[1];
  
    try {
      const payload = jwt.verify(token, process.env.jwtSecret);
  
      const user = await User.findOne({ _id: payload.id }).select('_id');
      console.log(user.role)
  
      if (user.role === 'admin') {
        // If the user is an admin, allow access to the route.
        req.user = user;
        next();
      } else {
        return res.status(403).json({ error: "Forbidden" });
      }
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized Request' });
    }
  };


  module.exports = adminAuth;