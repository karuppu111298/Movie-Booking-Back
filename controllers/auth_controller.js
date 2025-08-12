// controllers/authController.js
const authService = require('../services/auth_service');
const User = require('../models/user_model');

const login = async (req, res) => {
  const { user_name, password,role } = req.body;
  try {
    const login_details= await authService.loginUser(user_name, password,role);
    res.status(200).json({login_details});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  const { cleanRefreshToken } = req.body;
  console.log(cleanRefreshToken);
  const decoded = authService.validateRefreshToken(cleanRefreshToken);
  if (!decoded) return res.status(403).json({success:false, message: 'Invalid refresh token' });

  const newAccessToken = authService.generateAccessToken(decoded.userId);
  res.status(200).json({success:true, access_token: newAccessToken });
};


const verifyAccessToken = async (req, res) => {

  try {
    const { access_token } = req.body;
    const decoded = authService.validateAccessToken(access_token);

    if (!decoded) {
      return res.status(200).json({ success:false, message: 'Invalid access token' });
    }else{
      const userId = decoded.userId; 
      const user = await User.findOne({ _id:userId });
      return res.status(200).json({ success:true, user:user, message: 'Ok access token' });
    }
   } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  login,
  verifyAccessToken,
  refreshToken
};
