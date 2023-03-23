"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const db_1 = require("./database/db");
(0, db_1.db)();
const config_1 = require("./config");
const errorHandler_1 = require("./middleware/errorHandler");
const morgan_1 = __importDefault(require("morgan"));
const exampleRoutes_1 = __importDefault(require("./routes/exampleRoutes"));
const app = (0, express_1.default)();
var cors = require('cors');
app.use(cors());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use("/", exampleRoutes_1.default);
app.use(() => {
    throw (0, http_errors_1.default)(404, "Route Not Found");
});
app.use(errorHandler_1.errorHandler);
app.listen(config_1.PORT, () => {
    console.log(`server listen at port ${config_1.PORT}`);
});
// mongoose.connect(DB).then(() => {
//     console.log(`connect to DB`)
//     app.listen(PORT, () => {
//         console.log(`server listen at port ${PORT}`)
//     })
// }).catch(() => {
//     throw createHttpError(501, "Unable to connect DB")
// })
