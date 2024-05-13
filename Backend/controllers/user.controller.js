import asyncHandler from "../utils/asyncHandler.js"
import mongoose from "mongoose"
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";

const getToken = async (userId) => {
    try {
        const user = await User.findById(userId)
    
    //If user does not find throw error
    if(!user){
        throw new apiError(401, "Invalid Accesss || Tokens")
    }

    // console.log(`User is ${user}`)

    //Generate Token to send cookies
    const token = user.generateAccessToken()
   
    return token;
    } catch (error) {
        throw new apiError(302, "Something wrong while generating access token")
    }
}


const registerUser = asyncHandler(async (req, res) => {
    console.log(`Register started`)
    const {username, email, phoneNumber, password, role} = req.body;
  
    // if([username, email, phoneNumber, password, role].some((field) => field?.trim() === "")){
    //     throw new apiError(402, "All fields must be required")
    // }
    console.log(`Started Finding`)
    const existedUser = await User.findOne({email})

    if(existedUser){
        throw new apiError(304, "User already exist.")
    }
    
    const user = User.create({
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        role: role
    })
    
    

    //Option for configuration of cookie
    const option = {
        httpOnly: true,
        secure: true
    }

    return res.status(201)
    .json(
        new apiResponse(202, "User Successfully Registered.")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const {username, email, password, role} = req.body
    if(!email) {
        throw new apiError(304, "Invalid Credentials")
    }

    // const user = await User.findOne({
    //     $or:[{username}, {email}]
    // })
    const user = await User.findOne({email})
    

    //Checking if user is registered or not
    if(!user){
        throw new apiError(404, "User has not registered yet.")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new apiError(402, "Invalid Password")
    }

    if(user.role != role){
        throw new apiError(401, "User with this role does not found!!")
    }

    const loggedInUser = await User.findById(user._id).select("-password")

    const option = {
        httpOnly: true,
        secure: true
    }
    //Get token 
    const token = await getToken(user._id)
    // console.log(`Token is -> ${token}`)
    if(!token){
        throw new apiError(405, "Token does not found")
    }

    return res.status(202)
    .cookie("token", token, option)
    .cookie("role", role, option)
    .json(
        new apiResponse(201,{ user: loggedInUser}, "User Successfully Login.")
    )


})

const logoutUser = asyncHandler(async (req, res) => {
    const user = User.findById(req.user._id)
    if(!user){
        console.log(`Error While Logout because it does not able to get user`)
    }

    const option = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("token", option)
    .json(
        new apiResponse(202, {}, "User LoggedOut Successfully")
    )
})

const getUser = asyncHandler(async (req, res) => {

    const user = req.user
    console.log('RESULT',user)
    if(!user){
        throw new apiError(404, "User does not found")
    }


    return res.status(202).json(
        new apiResponse(202, user, "User fetched Successfully")
    )
})


export {registerUser, loginUser, logoutUser, getUser}