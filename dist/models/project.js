"use strict";
const mongoose = require("mongoose");
const ProjectSchema = mongoose.Schema({
    name: {
        unique: true,
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
module.exports =
    mongoose.model.Project || mongoose.model("Project", ProjectSchema);
