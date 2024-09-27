import mongoose from "mongoose";
// import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phone : {
        type: Number,
    },
    imageURL: {
        type: String,
        required: false,
        default: "",
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

export default User;