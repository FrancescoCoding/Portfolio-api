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
exports.isObjectIdValid = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../utils/config");
const httpException_1 = __importDefault(require("../utils/httpException"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!config_1.MONGO_URI) {
        console.log("Mongo URI is required");
        process.exit(1);
    }
    try {
        yield mongoose_1.default.connect(config_1.MONGO_URI);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
function isObjectIdValid(id) {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new httpException_1.default(`${id} is not a valid id`, 400);
    }
}
exports.isObjectIdValid = isObjectIdValid;
