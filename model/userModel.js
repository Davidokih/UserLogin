const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = Schema({
    userName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    avatarID: {
        type: String
    },
    rating: [
        {
            type: Schema.Types.ObjectId,
            ref: "ratings"
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("users", userModel);