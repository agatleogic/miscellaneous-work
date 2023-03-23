"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ExampleSchema = new mongoose_1.Schema({
    name: { type: String },
    id: { type: Number },
});
exports.default = (0, mongoose_1.model)("Example", ExampleSchema);
