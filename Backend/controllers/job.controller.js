import asyncHandler from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { Job } from "../models/job.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import isEmployer from "../utils/isEmployer.js";


const postJob = asyncHandler(async (req, res) => {
    const {role} = req.user

    isEmployer(role)

    const {title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo} = req.body

    if([title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo].some((field) => field === "")){
        throw new apiError(305, "Please provide all details")
    }


    if((!salaryFrom || !salaryTo) && !fixedSalary ){
        throw new apiError(405, "Please provide either variable salary or fixed salary")
    }


    if((salaryFrom && salaryTo) && fixedSalary ){
        throw new apiError(405, "Please provide either variable salary or fixed salary")
    }

    const postedBy = req.user._id

    const job = await Job.create({
        title,
        description, 
        category, 
        country, 
        city, 
        location, 
        fixedSalary, 
        salaryFrom, 
        salaryTo,
        postedBy
    })

    return res.status(202).json(
        new apiResponse(202, job, "Job posted Successfully.")
    )

})


const getAllJobs = asyncHandler(async (req, res, next) => {

    const jobs = await Job.find({expired: false})

    // return new apiResponse(201, jobs, "All jobs fetched successfully.")
    return res.status(201).json(
        new apiResponse(202, jobs, "Jobs fetched Successfully.")
    )
})

const myJobs = asyncHandler(async (req, res) => {
    const user = req.user
    const {role} = req.cookies
    isEmployer(role)
    const myJobs = await Job.find({postedBy: user._id})

    return res.status(202).json(
        new apiResponse(202, myJobs, "My jobs fetched successfully")
    )
})

const updateJobs = asyncHandler(async (req, res) => {
    const {role} = req.cookies

    isEmployer(role)

    const {id} = req.params
    let job = await Job.findById(id)

    if(!job){
        throw new apiError(404, "Oops Job not found")
    }

    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    return res.status(202).json(
        new apiResponse(202, job, "Job details updated successfully.")
    )
})

const deleteJob = asyncHandler(async (req, res) => {
    const {role} = req.cookies

    isEmployer(role)

    const {id} = req.params
    const job = await Job.findById(id)

    if(!job){
        throw new apiError(404, "Job does not found")
    }

    await job.deleteOne()

    return res.status(202).json(
        new apiResponse(202,"", "Job deleted successfully.")
    )


})

const getSingeJob = asyncHandler(async (req, res) => {
    const {id} = req.params
    try {
        const job = await Job.findById(id)
        if(!job){
            throw new apiError(404, "Job does not found")
        }

        return res.status(202).json(
            new apiResponse(202, job, "Job found successfully.")
        )

    } catch (error) {
        throw new apiError(404, "Problem while fetching Job")
    }

})


export {getAllJobs, postJob, myJobs, updateJobs, deleteJob, getSingeJob}














