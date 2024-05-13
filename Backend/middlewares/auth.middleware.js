import asyncHandler from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // console.log(req.cookies);
        const token = req.cookies.token;

        if(!token){
           return next(new apiError(404, "Authorization Failed."))
        }
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        if(!decodedToken){
            throw new apiError(404, "Decoded Token does not found")
        }

        // console.log(`Decoded Token -> ${decodedToken}`)

        const user = await User.findById(decodedToken._id)

        if(!user){
            throw new apiError(404, "Invalid User")
        }

        // console.log(`User is (token) ${user}\n`)
        req.user = user;

        next()
    } 
    catch (error) {
        throw new apiError(403, "Error while verify User.")
    }
})

export default verifyJWT