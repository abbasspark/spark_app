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
exports.loadWebPage = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs_1 = __importDefault(require("fs"));
const delay_1 = require("./start/delay");
const getRandomInt_1 = require("./start/getRandomInt");
const loadWebPage = (webpage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Launch Chromium browser
        const browser = yield puppeteer_1.default.launch({
            //executablePath: '/data/data/com.termux/files/usr/bin/chromium-browser', // Path to your Chromium executable
            headless: true // Run in headless mode
        });
        const page = yield browser.newPage();
        yield page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36');
        // Navigate to the provided URL
        yield page.goto(webpage.url, { timeout: 100000 }); // Wait until there are no more than 2 network connections for at least 500 ms
        const screenshot = yield page.screenshot({ fullPage: true });
        // Save screenshot to file
        fs_1.default.writeFileSync(`${webpage.name}.png`, screenshot);
        const minDelay = webpage.min * 1000; // Minimum delay in milliseconds (e.g., 2 seconds)
        const maxDelay = webpage.max * 1000; // Maximum delay in milliseconds (e.g., 5 seconds)
        const randomDelay = (0, getRandomInt_1.getRandomInt)(minDelay, maxDelay);
        yield (0, delay_1.delay)(randomDelay);
        yield browser.close();
    }
    catch (error) {
        console.error('Error:', error);
    }
});
exports.loadWebPage = loadWebPage;
