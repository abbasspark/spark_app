"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (message) => {
    console.log(`[${new Date().toISOString()}]: ${message}`);
};
exports.logger = logger;
