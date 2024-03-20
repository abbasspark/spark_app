"use strict";

const { Router } = require("express");
const router = Router();

const ads = require("../controllers/ads.controller");
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

router.get("/ads/start", authenticate, (req, res) => {
  ads
    .start()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400));
});
router.get("/ads/screenshot", authenticate, (req, res) => {
  ads
    .screenshot(res);
});
module.exports = router;