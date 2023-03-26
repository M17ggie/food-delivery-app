const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
        minLenth: [8, "Password must be between 8 & 15 characters"],
        maxLenth: [15, "Password must be between 8 & 15 characters"],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timeStamps: {
        createdAt: true,
        updatedAt: false
    }
})

const User = mongoose.model('User', UserSchema)
export default User