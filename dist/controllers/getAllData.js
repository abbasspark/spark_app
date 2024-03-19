"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllData = void 0;
const axios_1 = __importDefault(require("axios"));
const getAllData = async (jwt) => {
    try {
        const { data } = await axios_1.default.get('https://store.mc-amc.com/app-store/api/apps/getAll', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return data;
    }
    catch (error) {
        console.error('Error:', error);
    }
};
exports.getAllData = getAllData;
