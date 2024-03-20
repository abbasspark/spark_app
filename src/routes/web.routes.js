"use strict";

const { Router } = require("express");
const router = Router();

const ads = require("../controllers/ads.controller");
const { authenticate } = require("../middlewares/authenticate.middleware");

router.get("/load", authenticate, (req, res) => {
  ads
    .load()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400));
});
router.get("/screenshot", authenticate, (req, res) => {
  ads
    .screenshot(res);
});
module.exports = router;