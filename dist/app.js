"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const db_1 = require("./database/db");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/api/projects", projectRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use(errorMiddleware_1.errorHandler);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
