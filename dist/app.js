"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const PORT = process.env.PORT || 3100;
const app = (0, express_1.default)();
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization");
    next();
});
// parse requests of content-type: application/json
app.use(body_parser_1.default.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, routes_1.default)(app);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
