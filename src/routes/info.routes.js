"use strict";

const { Router } = require("express");
const router = Router();

const info = require("../controllers/info.controller");

router.get("/", (req, res) => {
  info
    .checkInfo(res)
    .catch(() => res.sendStatus(500));
});

module.exports = router;