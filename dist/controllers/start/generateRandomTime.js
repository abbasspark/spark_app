"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomTime = void 0;
function generateRandomTime() {
    const hour = Math.floor(Math.random() * (23 - 8 + 1)) + 8; // Random hour between 8 and 23 (inclusive)
    const minute = Math.floor(Math.random() * 60); // Random minute between 0 and 59
    return `${minute} ${hour} * * *`; // Format for cron schedule: minute hour * * *
}
exports.generateRandomTime = generateRandomTime;
