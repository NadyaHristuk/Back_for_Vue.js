const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    refreshToken: {
        type: String,
        default: null,
    },
}, { versionKey: false, timestamps: true });


const User = model('user', userSchema);

module.exports = User;