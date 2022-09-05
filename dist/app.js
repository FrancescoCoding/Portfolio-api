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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const db_1 = require("./database/db");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const db = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
});
exports.db = db;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use(errorMiddleware_1.errorHandler);
app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000, () => {
    var _a;
    console.log(`Server is running on port ${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000}`);
});
