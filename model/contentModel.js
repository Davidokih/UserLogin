const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentModel = Schema({
    title: {
        type: String
    },
    discription: {
        type: String
    },
    price: {
        type: String
    },
    quantity: {
        type: String
    },
    status: {
        type: Boolean
    },
    images: {
        type: String
    },
    imageID: {
        type: String
    },

    comment: [ { type: Schema.Types.ObjectId, ref: "comments" } ],
    user: { type: Schema.Types.ObjectId, ref: "users" }

}, { timestamps: true });

module.exports = mongoose.model("contents", contentModel);