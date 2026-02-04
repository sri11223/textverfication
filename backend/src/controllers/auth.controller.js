const authService = require('../services/auth.service');

const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, user } = await authService.login(req.body);
    authService.setAuthCookies(res, { accessToken, refreshToken });
    return res.status(200).json({ user, accessToken });
  } catch (error) {
    return next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, user } = await authService.signup(req.body);
    authService.setAuthCookies(res, { accessToken, refreshToken });
    return res.status(201).json({ user, accessToken });
  } catch (error) {
    return next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies || {};
    const { accessToken, newRefreshToken } = await authService.refresh(refreshToken);
    authService.setAuthCookies(res, { accessToken, refreshToken: newRefreshToken });
    return res.status(200).json({ accessToken });
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res) => {
  authService.clearAuthCookies(res);
  return res.status(204).send();
};

module.exports = {
  login,
  signup,
  refresh,
  logout,
};
