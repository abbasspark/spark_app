"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const start_1 = require("../controllers/start");
exports.default = (app) => {
    const router = (0, express_1.Router)();
    router.get("/start", (req, res) => {
        try {
            (0, start_1.startLoadingWebPages)();
            res.sendStatus(200);
        }
        catch (error) {
            res.send(error);
        }
    });
    app.use("/engin", router);
};
