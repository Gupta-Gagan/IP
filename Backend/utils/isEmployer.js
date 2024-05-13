import { apiError } from "./apiError.js"

const isEmployer = async (role) => {
    if(role === "Job Seeker"){
        throw new apiError(402, "User not authorized")
    }
}

export default isEmployer