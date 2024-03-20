const { AuthService } = require("../services/auth.service");
const authService = new AuthService();
const authenticate = async (req, res, next) => {
  try {
    // Attempt to login
    await authService.login();
    // If login successful, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If login fails, send a 401 Unauthorized status
    res.sendStatus(401);
  }
};

module.exports = {
  authenticate
}