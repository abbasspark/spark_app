"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const os_1 = __importDefault(require("os"));
const axios_1 = __importDefault(require("axios"));
const crypto = __importStar(require("crypto"));
const login = async () => {
    try {
        const identifier = os_1.default.networkInterfaces()['en0'].find((x) => x.family === 'IPv4').mac || "02:00:00:00:00:10";
        try {
            const { data: { jwt } } = await axios_1.default.post('https://store.mc-amc.com/app-store/api/auth/local/device/login', {
                identifier
            });
            return jwt;
        }
        catch (_a) {
            const time = Date.now();
            const { data: { jwt } } = await axios_1.default.post('https://store.mc-amc.com/app-store/api/auth/local/device/register', {
                identifier,
                model: "Pulse",
                time,
                sign: crypto.createHash('md5').update(`${identifier.replace(/:/g, 'spr')}@${time}`).digest('hex')
            });
            return jwt;
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
};
exports.login = login;
