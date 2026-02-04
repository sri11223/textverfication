const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const { createError } = require('../utils/errors');

const JWT_SECRET = process.env.JWT_SECRET || 'MY_SECRET_TOKEN';
const ACCESS_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = '7d';

const createTokens = (payload) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
  return { accessToken, refreshToken };
};

const setAuthCookies = (res, { accessToken, refreshToken }) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
};

const clearAuthCookies = (res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw createError(400, 'Email and password are required.');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, 'Invalid credentials.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createError(401, 'Invalid credentials.');
  }

  const payload = { id: user._id, email: user.email, username: user.username };
  const { accessToken, refreshToken } = createTokens(payload);

  return { accessToken, refreshToken, user };
};

const signup = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw createError(400, 'Username, email, and password are required.');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError(409, 'Email is already registered.');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ username, email, password: hashedPassword });

  const payload = { id: user._id, email: user.email, username: user.username };
  const { accessToken, refreshToken } = createTokens(payload);

  return { accessToken, refreshToken, user };
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw createError(401, 'Refresh token missing.');
  }

  try {
    const payload = jwt.verify(refreshToken, JWT_SECRET);
    const { accessToken, refreshToken: newRefreshToken } = createTokens({
      id: payload.id,
      email: payload.email,
      username: payload.username,
    });
    return { accessToken, newRefreshToken };
  } catch (error) {
    throw createError(401, 'Invalid refresh token.');
  }
};

module.exports = {
  login,
  signup,
  refresh,
  setAuthCookies,
  clearAuthCookies,
};
