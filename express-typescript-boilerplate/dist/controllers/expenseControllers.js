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
exports.getExpenseData = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const getExpenseData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var result = new Map();
        let shortedArr = [...req.body];
        shortedArr = shortedArr.sort((a, b) => a.amount - b.amount);
        for (let i = shortedArr.length - 1; i > 0; i--) {
            const amount = shortedArr[i].amount / shortedArr.length;
            for (let j = 0; j < i; j++) {
                const amount1 = shortedArr[j].amount / shortedArr.length;
                if (amount - amount1 > 0) {
                    let transactions = [];
                    if (result.has(shortedArr[j].name)) {
                        transactions = result.get(shortedArr[j].name);
                    }
                    transactions.push({
                        name: shortedArr[i].name,
                        amount: amount - amount1,
                    });
                    result.set(shortedArr[j].name, transactions);
                }
            }
        }
        res.json([...result]);
    }
    catch (error) {
        console.log(error);
        return next(http_errors_1.default.InternalServerError);
    }
});
exports.getExpenseData = getExpenseData;
