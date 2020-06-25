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
        required:true,
        default: ''
    },
    number: {
        type: Number,
        required:true,
        default: 0
    },
    valid_until: {
        type: String,
        required:true,
        default: ''
    },
    idbank:{
        type:String,
        required:true
    }
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
    idbank:{
        type:String,
        default:''
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