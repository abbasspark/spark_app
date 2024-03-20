"use strict";

const { Router } = require("express");
const router = Router();

const webRoutes = require("./web.routes");
const minerRoutes = require("./miner.routes");
const infoRoutes = require("./info.routes");

router.use('/web', webRoutes)
router.use('/miner', minerRoutes)
router.use('/info', infoRoutes)
module.exports = router;