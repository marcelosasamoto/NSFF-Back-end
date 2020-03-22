const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    balance: {
        type: Number,
        default: 0
    },
    expense: {
        type: Number,
        default: 0
    }
});

const CardSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    number: {
        type: Number,
        default: 0
    },
    valid_until: {
        type: String,
        default: ''
    },
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: [ProfileSchema],
    card: [CardSchema],
    createAt: {
        type: Date,
        default: Date.now,
    }
});
const User = mongoose.model('User',UserSchema);
module.exports = User;