import asyncHandler from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { Application } from "../models/application.model.js";
import isJobSeeker from "../utils/isJobSeeker.js";
import isEmployer from "../utils/isEmployer.js";
import { apiResponse } from "../utils/apiResponse.js";
import fileUploader from "../utils/cloudinary.js";
import { Job } from "../models/job.model.js";
import app from "../app.js";


const jobSeekerGetAllApplication = asyncHandler(async(req, res) => {
    const {role} = req.cookies
    console.log(`Role is ${role}\n`)
    isJobSeeker(role)

    const applications = await Application.find({'applicantId.user': req.user._id})

    if(!applications){
        throw new apiError(404, "Application not found")
    }

    return res.status(202).json(
        new apiResponse(202, applications, "My applications fetched Successfully")
    )

})


const employerGetAllApplication = asyncHandler(async(req, res) => {
    const {role} = req.cookies
    isEmployer(role)

    const {_id} = req.user
    const applications = await Application.find({'EmployerId.user':_id})

    if(!applications){
        throw new apiError(404, "Application not found")
    }

    console.log(`Employer controller runs successfully.\n`)
    return res.status(201).json(
        new apiResponse(202,applications, "My applications fetched Successfully")
    )

})

const jobSeekerDeleteApplication = asyncHandler(async(req, res) => {
    const {role} = req.cookies
    isJobSeeker(role)

    const {id} = req.params

    const application = Application.findById(id)

    if(!application){
        throw new apiError(404, "My application does not found")
    }

    await application.deleteOne()

    return res.status(202).json(
        new apiResponse(202, "", "Application deleted Successfully")
    )
})

const postApplication = asyncHandler(async(req, res) => {
    const {role} = req.cookies
    isJobSeeker(role)

    const resumePath = req.files?.resume[0].path

    if(!resumePath){
        throw new apiError(404, "Resume does not found")
    }

    // const allowedFormats = ["image/png", "image/jpg", "image/jpeg",]

    // if(!allowedFormats.includes(resume.mimetype)){
    //     throw new apiError(404, "Please send correct formats")
    // }
    console.log("Resume path ",resumePath)
    const resumeResponse = await fileUploader(resumePath)
    
    if(!resumeResponse){
        throw new apiError(500, "Problem on Uploading on cloudinary")
    }

    console.log(`Resume response is -> ${resumeResponse.secure_url}\n`)

    const {name, email, coverLetter, phoneNumber, address, jobId} = req.body

    // if([name, email, coverLetter, phoneNumber, address, jobId].some((field) => field.trim() === "")){
    //     console.log(`Please Provide all details`)
    //     throw new apiError(403, "Please fill all details")
    // }

    if(!jobId){
        throw new apiError(404, "Job not found")
    }

    const jobDetails = await Job.findById(jobId)

    if(!jobDetails){
        throw new apiError(404, "There is no job exist here")
    }

    const applicantId = {
        user: req.user._id,
        role: "Job Seeker"
    }

    const employerId = {
        user: jobDetails.postedBy,
        role: "Employer"
    }

    const application = await Application.create({
        name,
        email,
        coverLetter,
        phoneNumber,
        address,
        resume: {
            publicId: resumeResponse.public_id,
            url: resumeResponse.url
        },
        applicantId,
        employerId
    })

    return res.status(202).json(
        new apiResponse(202, application, "Application posted succesfully.")
    )
    
})


export {jobSeekerGetAllApplication, employerGetAllApplication, jobSeekerDeleteApplication, postApplication}