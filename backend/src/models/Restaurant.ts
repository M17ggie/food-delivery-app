import mongoose from "mongoose";

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
    resetPasswordExpire: Date
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

export default Restaurant