import { NextFunction } from "connect";
import mongoose from "mongoose";
const bcrypt = require('bcrypt');

interface IUser {
    name: String,
    email: String,
    role: mongoose.Types.ObjectId,
    password: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date
}

const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: [true, "Name field should not be empty"],
        trim: true,
        minLength: [3, "Name must be atleast 3 characters long"],
        maxLength: [20, "Name should not exceed 20 characters"]
    },
    email: {
        type: String,
        required: [true, 'Please enter valid email'],
        unique: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        default: '641f38be0407d772cae46867'
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be between 8 & 15 characters"],
        maxLength: [15, "Password must be between 8 & 15 characters"],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
})

//Encrypt password
UserSchema.pre('save', async function (next: NextFunction) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('User', UserSchema)
export default User