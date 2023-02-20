const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentModel = Schema({
    message: {
        type: String
    },
    content: { type: Schema.Types.ObjectId, ref: "contents" },
    user: { type: Schema.Types.ObjectId, ref: "users" }

}, { timestamps: true })

module.exports = mongoose.model("comments", commentModel)