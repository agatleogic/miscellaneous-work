"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const db = () => mongoose_1.default.connect(config_1.DB).then(() => {
    console.log(`connect to DB`);
}).catch(() => {
    throw (0, http_errors_1.default)(501, "Unable to connect DB");
});
exports.db = db;
