import { NextFunction } from "connect";
import mongoose, { SchemaType } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export interface IRestaurant extends mongoose.Document {
    name: String,
    email: String,
    role: mongoose.Types.ObjectId[],
    getSignedJWTToken(): string,
    matchedPasswords(password: string): Boolean
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
    role: {
        type: [{ type: mongoose.Types.ObjectId }],
        default: ["642b07e10fe5426488d3b5c7"]
    },
    name: {
        type: String,
        required: [true, "Name field should not be empty"],
        trim: true,
        minLength: [3, "Name must be atleast 3 characters long"],
        maxLength: [20, "Name should not exceed 20 characters"]
    },
    isDetailsSubmitted: {
        type: Boolean,
        default: false
    },
    basicDetail: {
        restaurantName: String,
        restaurantAddress: String,
        restaurantPhoneNumber: Number,
        restaurantEmail: String,
        fssaiLicense: String,
        location: {
            latitude: Number,
            longitude: Number
        },
        ownerPhoneNumber: Number,
        ownerName: String,
        bankAccountNumber: Number,
        ifscCode: String,
        blankCheque: String
    },
    metaDetail: {
        food: {
            veg: Boolean,
            nonveg: Boolean
        },
        restaurant: {
            bakery: Boolean,
            beverageshop: Boolean,
            casualdining: Boolean,
            dhaba: Boolean,
            dessertparlour: Boolean,
            foodcourt: Boolean,
            quickbites: Boolean
        },
        cuisine: {
            beverages: Boolean,
            desserts: Boolean,
            biryani: Boolean,
            chinese: Boolean,
            continental: Boolean,
            malwani: Boolean,
            northindian: Boolean,
            pasta: Boolean,
            pizza: Boolean,
            rolls: Boolean,
            roastchicken: Boolean,
            sandwich: Boolean,
            seafood: Boolean,
            streetfood: Boolean,
            southindian: Boolean
        },
        daysOfWeek: {
            monday: Boolean,
            tuesday: Boolean,
            wednesday: Boolean,
            thursday: Boolean,
            friday: Boolean,
            saturday: Boolean,
            sunday: Boolean
        },
        slots: [
            {
                startTime: Date,
                endTime: Date
            }
        ]
    },
    foodDetail: [
        {
            id: Number,
            name: String,
            description: String,
            photo: {
                url: String,
                alt: String
            },
            price: String,
            foodType: String,
            dishType: String
        }
    ]
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