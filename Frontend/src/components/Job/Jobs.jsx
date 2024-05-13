import React, { useContext, useEffect, useState } from 'react'
import {Context} from '../../main'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


function Jobs() {
  const [jobs, setJobs] = useState([])
  const {isAuthorized, user} = useContext(Context)
  const navigateTo = useNavigate()

  useEffect(() => {
    try {

      axios.get('http://localhost:4000/api/v1/job/all-jobs', {withCredentials: true})
      .then((res) => {
        setJobs(res.data.data)
      })
      
      
    } catch (error) {
        console.log(error)
    }
  }, [])

  if(!isAuthorized){
    navigateTo('/login')
  }

  return (
    <div className="container  bg-gray-700 p-2 pt-3 mr-0 ">
      <h1 className="text-2xl font-bold mb-4 text-white text-center">Available Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        { jobs && jobs.map((job,index) => (
          <div key={job._id} className={` shadow-md p-4 rounded-md ${index%2 ? 'bg-gray-800' : 'bg-gray-800'}`}>
            <p className="text-lg font-semibold mb-2 text-gray-200">{job.title}</p>
            <p className="text-sm mb-1 text-gray-200">{job.category}</p>
            <p className="text-sm mb-1 texxt-gray-200">{job.country}</p>
            <Link to={`/job/${job._id}`} className="block text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Jobs