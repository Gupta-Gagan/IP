import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: [22,  "Title must not be more than 22 characters"]
    },
    description: {
        type: String,
        required: true,
        minLenth: [7, "Description must have more than 7 characters"],
        maxLength: [100, "Description must not more than 100 characters" ]
    },
    category:{
        type: String,
        required: true,
        maxLength: [45, "Category must not have more than 45 characters"]
    },
    country:{
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    fixedSalary: {
        type: Number,
        minLength: [1200, "Salary must not less than 1200."],
        maxLength: [10000000, "Salary must be in under 1 Crore."]
    },
    salaryFrom: {
        type: Number,
        minLength: [1200, "Salary must not less than 1200."],
    },
    salaryTo: {
        type: Number,
        minLength: [10000000, "Salary must be in under 1 crore."],
    },
    expired:{
        type: Boolean,
        default: false
    },
    jobPostedOn: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    
})

export const Job = mongoose.model("Job", jobSchema)