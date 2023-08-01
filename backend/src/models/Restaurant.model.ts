import { NextFunction } from "connect";
import mongoose, { Document, Model } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export interface IRestaurant extends Document {
    name: String,
    email: String,
    role: mongoose.Types.ObjectId[],
    isDetailsSubmitted: Boolean,
    status: String,
    menuCard: String,
    basicDetail: { [key: string]: any },
    metaDetail: { [key: string]: any },
    foodDetail: { [key: string]: any },
    getSignedJWTToken(): string,
    matchedPasswords(password: string): Boolean
}

export interface IRestaurantModel extends Model<IRestaurant> {
    restaurantBasicDetail(email: string): Promise<IRestaurant | null>;
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
    status: {
        type: String,
        default: "pending"
    },
    menuCard: String,
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
            imageURL: String,
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

    const password = this.password as string;

    if (!password) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
    next();
})

//Match passwords
RestaurantSchema.methods.matchedPasswords = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Sign JWT and return
RestaurantSchema.methods.getSignedJWTToken = async function () {
    const user = await this.model("Restaurant")
        .findById(this._id)
        .populate("role")
        .exec();
    return jwt.sign(
        { id: this._id, role: user.role[0]._id.toString() },
        process.env.JWT_SECRET!
    );
}

//Find restaurant
RestaurantSchema.statics.restaurantBasicDetail = async function (email: string) {
    return await this.findOne({ email }).select("-password -__v -createdAt -role -metaDetail -foodDetail")
}

const Restaurant = mongoose.model<IRestaurant, IRestaurantModel>('Restaurant', RestaurantSchema);
export default Restaurant