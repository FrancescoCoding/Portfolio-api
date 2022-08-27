require("dotenv").config();

export const port = process.env.PORT || 3000;
export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD || "development";
export const MONGO_URI = process.env.MONGO_URI || null;
