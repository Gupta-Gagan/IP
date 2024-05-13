import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FaCheck } from 'react-icons/fa'
import {RxCross2} from 'react-icons/rx'
import { Context } from '../../main'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function MyJobs() {
  const [myJobs, setMyJobs] = useState([])
  const [editingMode, setEditingMode] = useState(null)

  const {isAuthorized, user} = useContext(Context)
  const navigateTo = useNavigate()

  useEffect(() => {

    const fetchJobs = async() => {
      try {

        const {data} = await axios.get('http://localhost:4000/api/v1/job/my-jobs', {withCredentials: true})
        setMyJobs(data.data)
        
      } catch (error) {
        toast.error(error.response.data.message)
        setMyJobs([])
      }
    }

    fetchJobs()

  }, [])

  
  if(!isAuthorized || user && user.role !== "Employer"){
    navigateTo('/')
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId)
  }

  const handleDisableEdit = (jobId) => {
    setEditingMode(jobId)
  }

  

  const handleUpdateJob = async(jobId) => {
    const updateJobs = myJobs.find(job => job._id === jobId)
    await axios.put(`http://localhost:4000/api/v1/job/update-job/${jobId}`, updateJobs, {withCredentials:true})
    .then((res) => {
      toast.success(res.data.message)
      setEditingMode(null)
    })
    .catch((error) => {
      toast.error(error.response.data.message)
    })
  }

  const handleDeleteJob = async(jobId) => {
    await axios.delete(`http://localhost:4000/api/v1/job/deleteJob/${jobId}`, {withCredentials:true})
    .then((res) => {
      toast.success(res.data.message)
      setMyJobs(prevJobs => prevJobs.filter(job => job._id !== jobId))
    })
    .catch((error) => {
      toast.error(error.response.data.message)
    })
  }

  // const handleInputChange2 = (jobId, field, value) => {
  //   setMyJobs((prevJobs) => {
  //     return prevJobs.map((job) => (job._id === jobId ? { ...job, [field]: value } : job));
  //   });
  // };
  

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) => prevJobs.map((job) => (job._id === jobId ? { ...job, [field] : value } : job ) ) )

  }





  return (
    <div className="container mx-auto mt-8">
      <h3 className="text-xl font-semibold mb-4">My Jobs</h3>
      {myJobs.length > 0 ? (
        <div className="banner2">
          {myJobs.map((job) => (
            <div className="card m-5 rounded-md" key={job._id}>
              <div className="content">
                <span>Title: </span>
                <input type="text" value={job.title} disabled={editingMode !== job._id? true: false} onChange={(e) => handleInputChange(job._id, "title", e.target.value)} className="disabled:bg-gray-100 w-full p-2 border border-gray-300 rounded-md mb-2" />
              </div>
              <div className="banner2">
                <span>Country: </span>
                <input type="text" value={job.country} disabled={editingMode !== job._id? true: false} onChange={(e) => handleInputChange(job._id, "country", e.target.value)} className="disabled:bg-gray-100 w-full p-2 border border-gray-300 rounded-md mb-2" />
              </div>
              <div className="banner2">
                <span>City: </span>
                <input type="text" value={job.city} disabled={editingMode !== job._id? true: false} onChange={(e) => handleInputChange(job._id, "city", e.target.value)} className="disabled:bg-gray-100 w-full p-2 border border-gray-300 rounded-md mb-2" />
              </div>
              <div>
                <span>Category: </span>
                <select value={job.category} disabled={editingMode !== job._id? true: false} onChange={(e) => handleInputChange(job._id, "category", e.target.value)} className="disabled:bg-gray-100 w-full p-2 border border-gray-300 rounded-md mb-2">
                <option value="">Select Category</option>
                <option value="FullStack">Full Stack</option>
                <option value="AndroidDevelopment">Android Development</option>
                <option value="ArtificialAndMachineLearning">Artificial and Machine Learning</option>
                <option value="SoftwareEngineering">Software Engineering</option>
                <option value="CloudComputing">Cloud Computing</option>
                </select>
              </div>
              <div>
                <span>Salary: </span>
                {job.fixedSalary ? (
                  <input type="number" value={job.fixedSalary} disabled={editingMode !== job._id? true: false} onChange={(e) => handleInputChange(job._id, "fixedSalary", e.target.value)} className="disabled:bg-gray-100 w-full p-2 border border-gray-300 rounded-md mb-2" />
                ) : (
                  <div>
                    <input type="number" value={job.salaryFrom} disabled={editingMode !== job._id? true: false} onChange={(e) => handleInputChange(job._id, "salaryFrom", e.target.value)} className="disabled:bg-gray-100 w-1/2 p-2 border border-gray-300 rounded-md mb-2 mr-2" />
                    <input type="number" value={job.salaryTo} disabled={editingMode !== job._id? true: false} onChange={(e) => handleInputChange(job._id, "salaryTo", e.target.value)} className="disabled:bg-gray-100 w-1/2 p-2 border border-gray-300 rounded-md mb-2 ml-2" />
                  </div>
                )}
              </div>
              <div>
                <span>Expired: </span>
                <select value={job.expired} disabled={editingMode !== job._id? true: false} onChange={(e) => handleInputChange(job._id, "expired", e.target.value)}  className="disabled:bg-gray-100 w-full p-2 border border-gray-300 rounded-md mb-2">
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div>
                <span>Description: </span>
                <textarea rows="5" value={job.description}  disabled={editingMode !== job._id? true: false} onChange={(e) => handleInputChange(job._id, "description", e.target.value)} className="disabled:bg-gray-100 w-full p-2 border border-gray-300 rounded-md mb-2"></textarea>
              </div>
              <div>
                <span>Location: </span>
                <input type="text" value={job.location}  disabled={editingMode !== job._id? true: false} onChange={(e) => handleInputChange(job._id, "location", e.target.value)} className="disabled:bg-gray-100 w-full p-2 border border-gray-300 rounded-md mb-2" />
              </div>
              <div className="wrapper">
                {editingMode === job._id ? (
                  <>
                    <button onClick={() => handleUpdateJob(job._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"><FaCheck/></button>
                    <button onClick={() => handleDisableEdit(job._id)} className="bg-red-500 text-white px-4 py-2 rounded-md"><RxCross2/></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEnableEdit(job._id)} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Edit</button>
                    <button onClick={() => handleDeleteJob(job._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  )
}

export default MyJobs