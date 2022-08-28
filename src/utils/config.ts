require("dotenv").config();

export const port = process.env.PORT || 3000;
export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD || null;
export const MONGO_URI = process.env.MONGO_URI || null;
export const NODE_ENV = process.env.NODE_ENV || "development";
