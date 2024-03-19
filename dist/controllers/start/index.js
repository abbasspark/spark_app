"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startLoadingWebPages = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const generateRandomTime_1 = require("./generateRandomTime");
const login_1 = require("../login");
const getAllData_1 = require("../getAllData");
const loadWebPages_1 = require("../loadWebPages");
async function startLoadingWebPages() {
    const cronSchedule = (0, generateRandomTime_1.generateRandomTime)();
    node_cron_1.default.schedule(cronSchedule, async () => {
        try {
            const token = await (0, login_1.login)();
            if (!token) {
                console.error('Authentication failed');
                return;
            }
            const { data } = await (0, getAllData_1.getAllData)(token);
            for (const webpage of data.websites) {
                await (0, loadWebPages_1.loadWebPage)(webpage);
            }
        }
        catch (error) {
            console.error('Error during scheduled task:', error);
        }
    });
}
exports.startLoadingWebPages = startLoadingWebPages;
