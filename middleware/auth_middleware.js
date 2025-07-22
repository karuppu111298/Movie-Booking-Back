// middleware/authMiddleware.js
const authService = require('../services/auth_service');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
 
  if (!token){
      return res.status(401).json({status:false, message: 'No token provided' });
  }

  const decoded = authService.validateAccessToken(token);
  if (!decoded){
     return res.status(401).json({ status:401, success:false,message: 'Token is expired' });
  }

  req.user = decoded;
  next();
};

module.exports = authenticate;
