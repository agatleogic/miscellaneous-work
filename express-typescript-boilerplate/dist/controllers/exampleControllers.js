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
exports.getExampleData = exports.getExample = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ExampleModel_1 = __importDefault(require("../models/ExampleModel"));
const getExample = (req, res, next) => {
    next();
    res.json({ message: "hello, i am exampleControllers" });
};
exports.getExample = getExample;
const getExampleData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, id } = req.body;
    try {
        const example = yield ExampleModel_1.default.findOne({ name });
        if (example)
            return next((0, http_errors_1.default)(406, "user already exists"));
        const newExamplle = new ExampleModel_1.default({ name, id });
        const result = yield newExamplle.save();
        res.json({ message: "user added successfully", result });
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
});
exports.getExampleData = getExampleData;
