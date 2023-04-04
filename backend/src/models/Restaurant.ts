import { NextFunction } from "connect";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export interface IRestaurant extends mongoose.Document {
    name: String,
    email: String,
    getSignedJWTToken(): string
}

const RestaurantSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be between 8 & 15 characters"],
        maxLength: [15, "Password must be between 8 & 15 characters"],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    name: {
        type: String,
        required: [true, "Name field should not be empty"],
        trim: true,
        minLength: [3, "Name must be atleast 3 characters long"],
        maxLength: [20, "Name should not exceed 20 characters"]
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
});

//Encrypt password
RestaurantSchema.pre('save', async function (next: NextFunction) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//Match passwords
RestaurantSchema.methods.matchedPasswords = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Sign JWT and return
RestaurantSchema.methods.getSignedJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET!)
}

const Restaurant = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
export default Restaurant