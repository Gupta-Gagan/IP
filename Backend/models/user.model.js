import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from "validator"


const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: [true, "Username must be unique"],
        minLength: [4, "Username must be contains atleast 4 characters"],
        maxLength: [13, "Username does not contains more than 13 characters"]
    },
    email:{
        type: String,
        required: [true, "Email must be required"],
        validate: [validator.isEmail, "Please provide correct Email address."],
        unique: [true, "Email must be unique"]
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must be atleast 8 characters"],
        maxLength: [32, "Password must be not more than 32 characters"]
    },
    role: {
        type: String,
        required: [true, "Please Provide a role"],
        enum: ["Job Seeker", "Employer"]
    }

}, {
    timestamps: true
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10 )
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}


export const User = mongoose.model("User", userSchema)
