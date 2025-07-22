// services/authService.js
const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const config = require('../config/config');

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });
};

const validateAccessToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, config.jwtRefreshSecret, {
    expiresIn: config.jwtRefreshExpiration,
  });
};

const validateRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.jwtRefreshSecret);
  } catch (error) {
    return null;
  }
};

// login code start

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  const now = new Date();

  if (!user) {
    return { status: 404, success: false, message: "User not found" };
  }

  // Check if blocked
  if (isUserBlocked(user)) {
    const wait = Math.ceil((user.lock_until - now) / 60000);
    return {
      status: 403,
      success: false,
      message: `Too many attempts. Try again in ${wait} minute(s).`,
    };
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return await handleFailedLogin(user);
  }

  // Login success
  await resetLoginAttempts(user);
  const { access_token, refresh_token } = generateTokens(user);

  return {
    status: 200,
    success: true,
    message: "Login successful",
    access_token,
    refresh_token,
  };
};
// 1. Find User by Email
const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// 2. Check if User is Blocked
const isUserBlocked = (user) => {
  const now = new Date();
  return user.lock_until && user.lock_until > now;
};
// 3. Handle Failed Login Attempt
const handleFailedLogin = async (user) => {
  const now = new Date();
  const newAttempts = (user.login_attempts || 0) + 1;

  if (newAttempts >= 3) {
    const lockUntil = new Date(now.getTime() + 1 * 60 * 1000); // block for 10 mins
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          login_attempts: 0,
          lock_until: lockUntil,
        },
      }
    );
    return {
      status: 403,
      success: false,
      message: "Too many failed attempts. Account is locked for 1 minutes.",
    };
  } else {
    await User.updateOne(
      { _id: user._id },
      {
        $set: { lock_until: null },
        $inc: { login_attempts: 1 },
      }
    );
    return {
      status: 401,
      success: false,
      message: "Invalid credentials",
    };
  }
};

// 4. Reset Login Attempts on Successful Login
const resetLoginAttempts = async (user) => {
  await User.updateOne(
    { _id: user._id },
    { $set: { login_attempts: 0, lock_until: null } }
  );
};

// 5. Generate Tokens
const generateTokens = (user) => {
  const access_token = generateAccessToken(user._id);
  const refresh_token = generateRefreshToken(user._id);
  return { access_token, refresh_token };
};

// login code end

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  validateAccessToken,
  validateRefreshToken,
  loginUser
};
