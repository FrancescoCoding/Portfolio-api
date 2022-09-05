"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRegex = exports.removeScriptTags = void 0;
const httpException_1 = __importDefault(require("../utils/httpException"));
function removeScriptTags(userInput) {
    if (userInput.includes('<script>')) {
        throw new httpException_1.default('User inputs cannot contain <script> tags 😡', 418);
    }
    if (userInput.includes('<') && userInput.includes('>')) {
        throw new httpException_1.default('User inputs cannot contain html tags 😡', 418);
    }
    return userInput.replace(/<[^>]*>/g, '').trim();
}
exports.removeScriptTags = removeScriptTags;
exports.emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
