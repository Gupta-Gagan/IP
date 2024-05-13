import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Context } from '../../main'
import axios from 'axios'


function JobDetails() {
  const {id} = useParams()
  const [job, setJob] = useState({})

  const {isAuthorized, user} = useContext(Context)


  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/job/${id}`, {withCredentials: true})
    .then((res) => {
      console.log("job data is -> ",res.data)
      setJob(res.data.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },[])





  return (
    <div className="container mx-auto mt-8">
      <h3 className="text-xl font-semibold mb-4">Job Details</h3>
      <div className="bg-white shadow-md p-4 rounded-md">
        <p className="text-lg font-semibold mb-2"><span>{job.title}</span></p>
        <div className="mb-2">
          <p><span className="font-semibold">Category:</span> {job.category}</p>
          <p><span className="font-semibold">Country:</span> {job.country}</p>
          <p><span className="font-semibold">City:</span> {job.city}</p>
          <p><span className="font-semibold">Location:</span> {job.location}</p>
          <p><span className="font-semibold">Description:</span> {job.description}</p>
          <p><span className="font-semibold">Posted On:</span> {job.jobPostedOn}</p>
          {job.fixedSalary ? (
            <p><span className="font-semibold">Salary:</span> {job.fixedSalary}</p>
          ) : (
            <p><span className="font-semibold">Salary:</span> {job.salaryFrom} to {job.salaryTo}</p>
          )}
          {user && user.role !== 'Employer' ? (
            <Link to={`/application/${job._id}`} className="text-blue-500 hover:underline focus:outline-none">Apply Now</Link>
          ) : (
            <Link></Link> 
          )}
        </div>
      </div>
    </div>
  )
}

export default JobDetails