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
exports.protect = void 0;
const tokenService_1 = require("../services/tokenService");
const userService_1 = require("../services/userService");
const httpException_1 = __importDefault(require("../utils/httpException"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if ((_c = (_b = (_a = req.headers === null) !== null && _a !== void 0 ? _a : req.headers.authorization === null) !== null && _b !== void 0 ? _b : req.headers.authorization === undefined) !== null && _c !== void 0 ? _c : !req.headers.authorization.startsWith('Bearer ')) {
        throw new httpException_1.default('Unauthorized', 401);
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = yield (0, tokenService_1.verifyToken)(token);
    req.user = yield (0, userService_1.getUserById)(decoded._id);
    next();
}));
