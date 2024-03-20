"use strict";

const { Router } = require("express");
const router = Router();

const miner = require("../controllers/miner.controller");
const { authenticate } = require("../middlewares/authenticate.middleware");

router.post("/start", authenticate, (req, res) => {
  miner
    .start()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400));
});
router.post("/stop", authenticate, (req, res) => {
  miner
    .stop()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400));
});
module.exports = router;