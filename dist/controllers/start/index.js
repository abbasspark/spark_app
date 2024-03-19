"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function startLoadingWebPages() {
    return __awaiter(this, void 0, void 0, function* () {
        const cronSchedule = (0, generateRandomTime_1.generateRandomTime)();
        node_cron_1.default.schedule(cronSchedule, () => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield (0, login_1.login)();
                if (!token) {
                    console.error('Authentication failed');
                    return;
                }
                const { data } = yield (0, getAllData_1.getAllData)(token);
                for (const webpage of data.websites) {
                    yield (0, loadWebPages_1.loadWebPage)(webpage);
                }
            }
            catch (error) {
                console.error('Error during scheduled task:', error);
            }
        }));
    });
}
exports.startLoadingWebPages = startLoadingWebPages;
