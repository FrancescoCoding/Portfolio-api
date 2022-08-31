"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const utils_1 = require("../sanitizers/utils");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        min: [6, "Email must be at least 6 characters"],
        max: [50, "Email must be less than 255 characters"],
        match: [utils_1.emailRegex, "Email is invalid"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: [6, "Password must be at least 6 characters"],
        max: [50, "Password must be less than 255 characters"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, {
    timestamps: true,
});
exports.default = UserSchema;
