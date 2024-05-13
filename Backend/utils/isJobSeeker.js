import { apiError } from "./apiError.js"

const isJobSeeker = async (role) => {
    if(role === "Employer"){
        throw new apiError(402, "User not authorized")
    }
}

export default isJobSeeker