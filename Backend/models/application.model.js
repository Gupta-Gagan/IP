import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name must be required."],
        minLength: [3, "Name can contain atleast 3 characters."],
        maxLength: [18, "Name cannot be exceed 18 characters."]
    },
    email:{
        type: String,
        required: [true, "Email must be required"],
        
    },
    coverLetter: {
        type: String,
        
    },
    phoneNumber: {
        type: Number,
        required: [true, "Phone Number must be required"],
        minLength: 10,
        maxLength: 10,
    },
    address:{
        type: String,
        required: [true, "Address must be required."],
    },
    resume: {
        publicId:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    applicantId: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["Job Seeker"],
            required: true
        }
    },
    employerId: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["Employer"],
            required: true
        }
    },


})

export const Application = mongoose.model("Application", applicationSchema)